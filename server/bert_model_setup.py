# used with docker to download models
from transformers import BertTokenizer, BertForQuestionAnswering
from transformers import LongformerTokenizer, LongformerForQuestionAnswering

print('Loading bert tokenizer')
tokenizer = BertTokenizer.from_pretrained(
    'deepset/bert-large-uncased-whole-word-masking-squad2')
print('Loading bert for question answering')
model = BertForQuestionAnswering.from_pretrained(
    'deepset/bert-large-uncased-whole-word-masking-squad2')
print('Loading longformer tokenizer')
tokenizer = LongformerTokenizer.from_pretrained(
    "allenai/longformer-large-4096-finetuned-triviaqa")
print('Loading longformer for question answering')
model = LongformerForQuestionAnswering.from_pretrained(
    "allenai/longformer-large-4096-finetuned-triviaqa")
