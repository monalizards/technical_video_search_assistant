import json
from caption_helpers import *
# Transcription pipeline
# Create Youtube object with a link

url = "https://www.youtube.com/watch?v=DjdECYIfGgY"
yt = YouTube(url)

def pipeline():
    try:
    #     Use youtube caption
        c = find_en_caption(yt)
        if c:
            caption = YoutubeCaption(c.generate_srt_captions())
            print("YoutubeCaption created")
        else:
    #     use Watson API
            speech_recognition_result = generate_watson_caption(yt)
            
            caption = WatsonCaption(speech_recognition_result)
            print("WatsonCaption created")
        return {'status': 200,
                'caption_sections': json.dumps(caption.list_sections()),
                'caption_fulltext': caption.full_text()}
    except:
        return {'status': 400}

if __name__ == "__main__":
    print(pipeline())