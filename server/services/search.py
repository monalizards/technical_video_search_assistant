# imports
import json
from nltk.corpus import stopwords, wordnet
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import re
import spacy
from spacy.lang.en import English
from spellchecker import SpellChecker

from services.caption import pipeline_pytube_transcriptapi
import time
import pickle

# helper functions
# clean query term


def process_search_term(query):
    # remove leading and trailing space and punctuation
    # query = query.strip()
    query = re.sub(r'^\W*(.*?)\W*$', r'\1', query)
    # return alphanumeric tokens
    tokens = re.findall(r'(\w+)', query)
    return tokens

# search section
# process sections


def process_sections(sections):
    sections = json.loads(sections)
    # create cumulative index column for each section
    sections[0]['cid'] = len(sections[0]['subtitle'])
    # cid: space offset + previous section's cid + number of characters in the previous section's subtitle
    for index, section in enumerate(sections[1:]):
        section['cid'] = 1 + sections[index]['cid'] + \
            len(sections[index]['subtitle'])
    return sections

# loop through sections to find where the term starts


def find_section(startid, sections):
    sections = process_sections(sections)
    for section in sections:
        if startid < int(section['cid']):
            return int(section['section'])
    return -1

# adding specialised word to spellchecker


def process_text(text):
    # Word tokenize
    tokens = word_tokenize(text)
    # Lemmatize
    wnl = WordNetLemmatizer()
    lemmatized = [wnl.lemmatize(w) for w in tokens]
    # Stop word removal
    sw = stopwords.words("English")
    content = [w for w in tokens if w.lower() not in sw]
    return content


def spellchecker_load(text):
    # load spell checked
    spell = SpellChecker()
    # process text
    tokens = process_text(text)
    # add text to word frequency list
    spell.word_frequency.load_words(tokens)
    # return model
    return spell

# get set of synonyms


def get_synonyms(word):
    synonyms = set()
    for syn in wordnet.synsets(word):
        for l in syn.lemmas():
            synonyms.add(l.name())
    return synonyms

# filter unique matches


def filter_matches(matches):
    unique = set()
    filtered = []
    for match in matches:
        if match["match"] not in unique:
            unique.add(match["match"])
            filtered.append(match)
    return filtered

# return word matches in text


def word_matching(word, text):
    matches = []
    # tokenize text
    tokens = word_tokenize(text)
    # set up lemmatizer
    wnl = WordNetLemmatizer()
    # get synonyms
    synonyms = get_synonyms('good')
    # load spacy
    nlp = English()
    nlp = spacy.load('en_core_web_lg')
    # loop through tokens
    for token in tokens:
        # calculate similarity score
        doc1, doc2 = nlp(word), nlp(token)
        similarity = doc1.similarity(doc2)

        # match exact
        if token == word:
            matches.append({'match': token, 'type': 'exact'})
        # match synonyms
        elif wnl.lemmatize(token) in get_synonyms(word):
            matches.append({'match': token, 'type': 'synonym'})
        # match high similarity words
        elif similarity > 0.8:
            matches.append(
                {'match': token, 'type': 'similarity', 'score': similarity})
    return filter_matches(matches)

# return (unique) word matches in text and check for mispelled query


def match_word(word, text):
    matches = word_matching(word, text)
    results = {'matches': []}
    # check for misspelled query word if no results are found
    if matches == []:
        # load spell checker
        spell = spellchecker_load(text)
        correction = spell.correction(word)
        if correction != word:
            results = {'correction': correction,
                       'matches': word_matching(correction, text)}
    else:
        results = {'matches': matches}
    return results

# return (unique) phases marches in text


def match_phase(wordtokens, text):
    phase = r'.{0,3}'.join(wordtokens)
    matches = re.findall(phase, text)
    matches = set([match for match in matches])
    matches = [{'match': match} for match in matches]
    results = {'matches': matches}
    return results


def format_match(match, text, sections):
    match_type = match.get('type', 'exact')
    matches = re.finditer(match['match'], text)
    matches = [{'start': m.start(), 'end': m.end(), 'match': m.group(
        0), 'type': match_type} for m in matches]
    for match in matches:
        match["section"] = find_section(match["start"], sections)
    return matches

# helper function to compile caption text
def caption_sections_to_text(sections):
    sections = json.loads(sections)
    text = " ".join([section['subtitle'] for section in sections])
    return text


# main function: search pipeline
def search_caption(query, captions):
    # # Process caption and search term
    # text = caption['caption_fulltext']
    text = caption_sections_to_text(captions)

    query_tokens = process_search_term(query)
    res = {}

    # Check length of query tokens
    if len(query_tokens) == 0:
        res = {'status': 400, 'message': "No search term parsed"}
        return res
    # Single word search
    if len(query_tokens) == 1:
        matches = match_word(query_tokens[0], text)
    # Phase search
    else:
        matches = match_phase(query_tokens, text)

    results = []
    for match in matches["matches"]:
        results.extend(format_match(match, text, captions))

    res = {'status': 200, 'correction': matches.get(
        'correction', None), 'results': results}
    return res


if __name__ == "__main__":
    # # example (Angular video)
    url = 'https://www.youtube.com/watch?v=Ata9cSC2WpM'
    caption = pipeline(url)
    # # example (react hook video)
    # with open('reacthook_watson.pickle', 'rb') as f:
    #     caption = pickle.load(f)

    # Process caption and search term
    text = caption['caption_fulltext']
    sections = caption['caption_sections']

    for query in ['typescript', 'typescpt', 'typescript-based', 'make', 'student', 'student id']:
        print(f"Search result for '{query}':",
              search_caption(query, text, sections))
    # for query in ['typescript', 'typescpt', 'hooks', 'react', 'react-firebase', 'java script']:
    #     print(f"Search result for '{query}':", search_caption(query, text, sections))
