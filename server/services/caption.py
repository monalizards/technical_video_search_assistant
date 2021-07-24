import json

from pytube import YouTube
# from caption_helpers import yt_info_summary
# from caption_classes import *
# from youtube_caption_helper import *
from services.caption_helpers import *
from services.youtube_transcript_api_helpers import find_lang_caption

# Transcription pipeline
# Create Youtube object with a link


def pipeline(url):
    # Generate youtube object
    try:
        yt = YouTube(url)
        info = yt_info_summary(yt)
        videoId, title = info["id"], info["title"]

    except:
        # TODO: stretch goals: deal with playlist/ video or audio from other sources
        return {'status': 400, 'message': 'Unable to load Youtube object'}

    # Generate caption
    try:
        #     Use youtube caption
        try:
            # Code for pytube is temporarily unavailable
            c = find_en_caption(yt)
            if c:
                caption = YoutubeCaption(c.generate_srt_captions())
                print("YoutubeCaption created")
        except:
            c = find_lang_caption(videoId)
            if c:
                caption = YoutubeApiCaption(c)
                print("YoutubeApiCaption created")

        else:
            return
            #     use Watson API
            speech_recognition_result = generate_watson_caption(yt)

            caption = WatsonCaption(speech_recognition_result)
            print("WatsonCaption created")

        return {'status': 200,
                'videoId': videoId,
                # 'videoTitle': yt.title,
                # 'videoLength': yt.length,
                'caption_sections': json.dumps(caption.list_sections()),
                'caption_fulltext': caption.full_text()}
    except Exception as e:
        # print(id, yt.title, yt.length)
        return {'status': 400, 'message': f'Unable to generate captions. {e}'}


if __name__ == "__main__":
    print(pipeline("https://www.youtube.com/watch?v=ahCwqrYpIuM"))
