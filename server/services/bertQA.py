# load BERT model
from transformers import BertTokenizer, BertForQuestionAnswering
from transformers import LongformerTokenizer, LongformerForQuestionAnswering
import torch
import json


def qa_short(question, text):
    """
    return an answer to a question using text as a reference
    """
    tokenizer = BertTokenizer.from_pretrained(
        'deepset/bert-large-uncased-whole-word-masking-squad2')
    model = BertForQuestionAnswering.from_pretrained(
        'deepset/bert-large-uncased-whole-word-masking-squad2')

    input_dict = tokenizer(question, text, return_tensors='pt')
    outputs = model(**input_dict)
    start_logits = outputs.start_logits
    end_logits = outputs.end_logits

    all_tokens = tokenizer.convert_ids_to_tokens(
        input_dict["input_ids"].numpy()[0])
    answer = ' '.join(all_tokens[torch.argmax(start_logits, 1)[
                      0]: torch.argmax(end_logits, 1)[0]+1])
    # remove unknown token
    answer = answer.replace(' ##', '')
    return answer


def qa_long(question, text):
    """code from https://huggingface.co/transformers/model_doc/longformer.html#tflongformerforquestionanswering"""
    tokenizer = LongformerTokenizer.from_pretrained(
        "allenai/longformer-large-4096-finetuned-triviaqa")
    model = LongformerForQuestionAnswering.from_pretrained(
        "allenai/longformer-large-4096-finetuned-triviaqa")

    encoding = tokenizer(question, text, return_tensors="pt")
    input_ids = encoding["input_ids"]

    # default is local attention everywhere
    # the forward method will automatically set global attention on question tokens
    attention_mask = encoding["attention_mask"]

    outputs = model(input_ids, attention_mask=attention_mask)
    start_logits = outputs.start_logits
    end_logits = outputs.end_logits
    all_tokens = tokenizer.convert_ids_to_tokens(input_ids[0].tolist())

#     tokenizer.decode kills kernel
#     answer_tokens = all_tokens[torch.argmax(start_logits) :torch.argmax(end_logits)+1]
#     answer = tokenizer.decode(tokenizer.convert_tokens_to_ids(answer_tokens)) # remove space prepending space token
    answer = ' '.join(all_tokens[torch.argmax(start_logits, 1)[
                      0]: torch.argmax(end_logits, 1)[0]+1])
    answer = answer.replace('Ġ', '')
    return answer

# helper function to compile caption text
def caption_sections_to_text(sections):
    sections = json.loads(sections)
    text = " ".join([section['subtitle'] for section in sections])
    return text


def qa(question, captions):
    """
    return an answer to a question with a JSON with list of caption sections
    """
    text = caption_sections_to_text(captions)
    
    tokenizer = BertTokenizer.from_pretrained(
        'deepset/bert-large-uncased-whole-word-masking-squad2')

    encoding = tokenizer(question, text, return_tensors="pt")

    if len(encoding['input_ids'][0]) < 512:
        model = BertForQuestionAnswering.from_pretrained(
            'deepset/bert-large-uncased-whole-word-masking-squad2')
        print('Using BERT original')
    else:
        tokenizer = LongformerTokenizer.from_pretrained(
            "allenai/longformer-large-4096-finetuned-triviaqa")
        model = LongformerForQuestionAnswering.from_pretrained(
            "allenai/longformer-large-4096-finetuned-triviaqa")
        print('Using Longformer')

    input_ids = encoding["input_ids"]
    input_dict = tokenizer(question, text, return_tensors='pt')
    outputs = model(**input_dict)
    start_logits = outputs.start_logits
    end_logits = outputs.end_logits

    all_tokens = tokenizer.convert_ids_to_tokens(
        input_dict["input_ids"].numpy()[0])
    answer_tokens = all_tokens[torch.argmax(
        start_logits):torch.argmax(end_logits)+1]
    answer = tokenizer.decode(tokenizer.convert_tokens_to_ids(answer_tokens))

    if len(answer) == 0 or answer == '[CLS]':
        return 'No answer found.'
    return answer


if __name__ == "__main__":
    question, text = """Who was Jim Henson?""", """Jim Henson was a nice puppet"""
    print(qa_short(question, text))
