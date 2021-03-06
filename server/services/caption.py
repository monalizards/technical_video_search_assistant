import json
# from pytube import YouTube
from services.youtube_transcript_api_helpers import find_lang_caption

from services.video_info import get_video_info
from services.caption_classes import *
from services.caption_helpers import *
from services.youtube_dl_helpers import *

# Transcription pipeline
"""
24 July Remove pytube dependency
pipeline_pytube_transcriptapi is depreciated, please use pipeline_youtubedl
"""
# Create Youtube object with a link


def pipeline_pytube_transcriptapi(url):
    # !!! legacy function only, do not use
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

        # else:
        #     return
            #     use Watson API
            # speech_recognition_result = generate_watson_caption(yt)

            # caption = WatsonCaption(speech_recognition_result)
            # print("WatsonCaption created")

        return {'status': 200,
                'videoId': videoId,
                # 'videoTitle': yt.title,
                # 'videoLength': yt.length,
                'caption_sections': json.dumps(caption.list_sections()),
                'caption_fulltext': caption.full_text()}
    except Exception as e:
        # print(id, yt.title, yt.length)
        return {'status': 400, 'message': f'Unable to generate captions. {e}'}


def fetch_caption(caption_url):
    """
    fetch caption from caption url, return the formatted caption model
    """
    caption = get_caption_json(caption_url)
    caption = format_caption(caption)
    return caption


def generate_caption(url):
    """
    generate caption from video url: download video file, convert video to audio, set up watson api, get speech to text results, delete audiofile
    return the formatted caption model
    """
    # download video
    video_base = get_video_base(url, False)
    video_file = get_video_file_name(video_base)
    # convert video to audio
    audio_file = video_to_audio(video_file)
    try:
        # set up watson
        sttmodel = setup_watson()
        # generate caption with Speech to Text API
        stt_results = stt(audio_file, sttmodel)
        caption = format_watson_caption(stt_results)
        delete_file(audio_file)
        return caption
    except Exception as e:
        delete_file(audio_file)
        return None


"""
Caption pipeline to support youtubedl
"""


def pipeline_youtubedl(url):
    """pipeline for getting captions for the video"""

    video_info = get_video_info(url)

    # return error if no video info is found
    if 'videoInfo' not in video_info:
        return {'status': 400, 'message': 'Video not found'}

    caption_url = video_info['videoInfo']['caption_url']

    if caption_url != None:
        # fetch caption from youtube if available
        try:
            caption = fetch_caption(caption_url)
            return {'status': 200, 'caption': caption.list_sections()}
        except Exception as e:
            # print(e)
            print("Attemping to generate transcript from Watson")

    # generate caption from watson if needed
    try:
        caption = generate_caption(url)
        return {'status': 200, 'caption': caption.list_sections()}
    except Exception as e:
        print(e)
        return {'status': 400, 'message': 'Failed to fetch and generate transcript'}


if __name__ == "__main__":
    print("testing generation of caption with watson")
    from datetime import datetime
    start = datetime.now()
    print(pipeline("https://www.youtube.com/watch?v=dsTXcSeAZq8"))
    end = datetime.now()
    print('Time taken:', end - start)
