# COMP0073 MSc CS Summer Project

## Report Content:

- Abstact (1)
- Acknowledgements (1)

1. Introduction (2-4)
1. Context (8-10)
1. Requirements and analysis (5-6)
1. Design and Implementation (>10)
1. Testing, results evaluation (2-4)
1. Conclusions & Project evaluation (2-4)
1. List of references, bibliography

- Appendices

## Source code:

### Server

- python fastAPI for:
  - fetching video information from Youtube
  - fetching caption from Youtube videos
  - generate transcript using Watson speech-to-text API
  - searching for keywords
  - question and answering system using BERT
- Libraries used:
  - fastAPI
    - pydantic
    - uvicorn
  - pytube
  - moviepy
  - ibm-watson
  - ibm-cloud-sdk-core
  - nltk
  - spacy
  - pyspellchecker
  - torch
  - transformers[torch]

### Client

- React Frontend for:
  - displaying data
  - getting user inputs
  - fetching data from server
- Libraries used:
  - Material-UI
    - @material-ui/core
    - @material-ui/icons
  - axios
  - date-fns
  - react
