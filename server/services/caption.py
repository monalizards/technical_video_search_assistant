import json

# from pytube import YouTube
# from services.youtube_transcript_api_helpers import find_lang_caption
# from services.caption_helpers import *
from caption_classes import *
from video_info import get_video_info
# from services.caption_classes import *
from youtube_dl_helpers import get_caption_json, format_caption

# Transcription pipeline
"""
24 July Remove pytube dependency
"""
# Create Youtube object with a link
# def pipeline(url):
#     # Generate youtube object
#     try:
#         yt = YouTube(url)
#         info = yt_info_summary(yt)
#         videoId, title = info["id"], info["title"]

#     except:
#         # TODO: stretch goals: deal with playlist/ video or audio from other sources
#         return {'status': 400, 'message': 'Unable to load Youtube object'}

#     # Generate caption
#     try:
#         #     Use youtube caption
#         try:
#             # Code for pytube is temporarily unavailable
#             c = find_en_caption(yt)
#             if c:
#                 caption = YoutubeCaption(c.generate_srt_captions())
#                 print("YoutubeCaption created")
#         except:
#             c = find_lang_caption(videoId)
#             if c:
#                 caption = YoutubeApiCaption(c)
#                 print("YoutubeApiCaption created")

#         else:
#             return
#             #     use Watson API
#             speech_recognition_result = generate_watson_caption(yt)

#             caption = WatsonCaption(speech_recognition_result)
#             print("WatsonCaption created")

#         return {'status': 200,
#                 'videoId': videoId,
#                 # 'videoTitle': yt.title,
#                 # 'videoLength': yt.length,
#                 'caption_sections': json.dumps(caption.list_sections()),
#                 'caption_fulltext': caption.full_text()}
#     except Exception as e:
#         # print(id, yt.title, yt.length)
#         return {'status': 400, 'message': f'Unable to generate captions. {e}'}


def pipeline(url):
    """pipeline for getting captions for the video"""

    video_info = get_video_info(url)
    print(video_info)

    # return error if no video info is found
    if 'videoInfo' not in video_info:
        return {'status': 400, 'message': 'Video not found'}

    caption_url = video_info['videoInfo']['caption_url']

    if caption_url:
        # fetch caption from youtube if available
        try:
            caption = get_caption_json(caption_url)
            caption = format_caption(caption)
            return {'status': 200, 'caption': caption}
        except Exception as e:
            print(e)
            print("Attemping to generate transcript from Watson")

    else:
        # generate caption from watson if needed
        try:
            # print('1')
            # pass
            print('no caption for video? :( ', url)
        except Exception as e:
            return {'status': 400, 'message': 'Failed to fetch and generate transcript'}


if __name__ == "__main__":
    print(pipeline("https://www.youtube.com/watch?v=dsTXcSeAZq8"))
