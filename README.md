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
  - generating transcript using Watson speech-to-text API
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
  - youtube-dl
  - youtube_transcript_api
  - beautifulsoup4
  - lxml

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
  - react-spinners
  - react-virtualized

## V1 (Completed on 21 July 2021)

- User can search for a video using a link to the Youtube video
- Display a video player
- Display the transcription in a table
- Search for keywords/ phases in the transcription
  - User can click on the match to go to the specific point in the video
    - Note: the timing is only an estimate due to overlaps in time in youtube caption sections and the timing of an individual word is not provided
    - Overcome with other speech to text APIs but they can take much longer and reformatting needed
- Search for answers
- Handle errors

## V2 (Completed on 2 August 2021):

- Switch to youtube-dl for getting video information and parse captions on site
- Decouple initial video search request: get basic video information and player before transcription/captions
  - especially useful if no caption is directly available from youtube
- Show load progress for requests
- Show keyword/phrase matches in context with some text before and after each match
- Change body font family for better clarity
- Add options for light/dark mode
