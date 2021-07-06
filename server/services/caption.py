import json
from services.caption_helpers import *
# Transcription pipeline
# Create Youtube object with a link

def pipeline(url):
    # Generate youtube object
    try:
        yt = YouTube(url)
    except:
        # TODO: try to find audio/video in website
        return {'status': 400, 'message': 'Unable to load Youtube object'}

    # Generate caption
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
                'videoId': yt_find_id(yt),
                'videoTitle': yt.title,
                'videoLength': yt.length,
                'caption_sections': json.dumps(caption.list_sections()),
                'caption_fulltext': caption.full_text()}
    except:
        return {'status': 400, 'message': 'Unable to generate captions'}

if __name__ == "__main__":
    print(pipeline('https://www.youtube.com/watch?v=bAB_nNf8-a0'))