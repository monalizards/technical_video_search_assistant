import os
import youtube_dl
from pytube import YouTube, Caption
from ibm_watson import SpeechToTextV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

from services.caption_classes import *


# Original method a.en: English (auto-generated), en: English (US), en-GB: English (UK)
# Failed case: <Caption lang="English - jamake" code="en.FmoQciUtYSc"> (https://en.jamake.io/)

# from pytube import YouTube, Caption
# from caption_classes import YoutubeCaption, WatsonCaption, YoutubeApiCaption
# from services.caption_classes import *
from moviepy.editor import AudioFileClip

"""
First section relies on Pytube which is currently unavailable.
Switching to youtube_dl: see youtube_dl_helpers
"""


def yt_find_id(yt):
    """
    return videoID for a given Pytube's Youtube object
    """
    videoId = None
    try:
        videoId = yt.video_id
    except:
        videoId = yt.initial_data["currentVideoEndpoint"]["watchEndpoint"]["videoId"]
    return videoId


def yt_find_title(yt):
    """
    return video title for a given Pytube's Youtube object
    """
    title = None
    try:
        title = yt.title
    except:
        title = yt.initial_data["contents"]["twoColumnWatchNextResults"]["results"][
            "results"]['contents'][0]['videoPrimaryInfoRenderer']['title']['runs'][0]['text']
    return title


def yt_find_length(yt):
    """
    return video length for a given Pytube's Youtube object
    """
    try:
        length = yt.length
        return length
    except:
        return None


def yt_info_summary(yt):
    info = {
        'id': yt_find_id(yt),
        'title': yt_find_title(yt),
    }
    # 'length': yt_find_length(yt)
    return info


def find_en_caption(yt):
    """
    returns English caption for a given Pytube's Youtube object
    Original method a.en: English (auto-generated), en: English (US), en-GB: English (UK)
    Failed case: <Caption lang="English - jamake" code="en.FmoQciUtYSc"> (https://en.jamake.io/)
    Search for the first 2 characters in the language code or auto-generated caption
    """
    for c in yt.caption_tracks:
        if c.code == "a.en" or c.code[:2] == "en":
            return c
    return None


# Download and extract audio
# def download_audio(yt):
#     videoId = yt_find_id(yt)
#     path = yt.streams.first().download(
#         output_path=f"download/{videoId}", filename=f"{videoId}")

#     audioclip = AudioFileClip(path)
#     audio_filename = f"download/{videoId}/{videoId}.mp3"
#     audioclip.write_audiofile(audio_filename)
#     # remove video file
#     os.remove(path)
#     return audio_filename

# def generate_watson_caption(yt):
#     speech_to_text = setup_watson()
#     audio_filename = download_audio(yt)
#     speech_recognition_result = stt(audio_filename, speech_to_text)
#     # remove folder from download
#     videoId = yt_find_id(yt)
#     os.remove(audio_filename)
#     os.rmdir(f"download/{videoId}")
#     return speech_recognition_result

"""
Watson API
"""


def setup_watson():
    """
    run watson api setup
    """

    apikey = 'PvFDc759NRCbfBhRgKlqi87QsDl7kpNvQYkJZTaEfGCA'
    url = 'https://api.eu-gb.speech-to-text.watson.cloud.ibm.com/instances/33ecdf1d-e4a5-4521-83e6-d3c3c574d9b0'

    # authentication
    authenticator = IAMAuthenticator(apikey)
    speech_to_text = SpeechToTextV1(authenticator=authenticator)
    speech_to_text.set_service_url(url)
    print('Watson API model ready')
    return speech_to_text


def stt(file, sttmodel):
    """
    Get results from speech-to-text API 
    """
    with open(file, 'rb') as audio_file:
        result = sttmodel.recognize(
            audio=audio_file,
            content_type="audio/mp3",
            model='en-US_NarrowbandModel',
            timestamps=True
        ).get_result()
    return result


def format_watson_caption(stt_results):
    return WatsonCaption(stt_results)


"""
General methods:
"""


def video_to_audio(video_file):
    """
    converts a .mp4 file to .mp3 file
    """
    if not os.path.exists(video_file):
        print("Video not found")
        return None

    audioclip = AudioFileClip(video_file)
    audio_filename = video_file.replace('.mp4', '.mp3')

    audioclip.write_audiofile(audio_filename)

    # remove video file
    os.remove(video_file)

    return audio_filename
