from pytube import YouTube, Caption
from services.caption_classes import YoutubeCaption, WatsonCaption

# Original method a.en: English (auto-generated), en: English (US), en-GB: English (UK)
# Failed case: <Caption lang="English - jamake" code="en.FmoQciUtYSc"> (https://en.jamake.io/)

def yt_find_id(yt):
    """
    return videoID for a given Pytube's Youtube object
    """
    return yt.initial_data["currentVideoEndpoint"]["watchEndpoint"]["videoId"]


def find_en_caption(yt):
    """
    returns English caption for a given Pytube's Youtube object
    """
    for c in yt.caption_tracks:
        if 'en' in c.code:
            return c
    return None

# Download and extract audio
def download_audio(yt):
    if 'AudioFileClip' not in dir():
        from moviepy.editor import AudioFileClip
    videoId = yt_find_id(yt)
    path = yt.streams.first().download(output_path=f"download/{videoId}", filename=f"{videoId}")

    audioclip = AudioFileClip(path)
    audio_filename = f"download/{videoId}/{videoId}.mp3"
    audioclip.write_audiofile(audio_filename)
    return audio_filename

def setup_watson():
    if 'speech_to_text' in dir():
        return speech_to_text
    else:
        from ibm_watson import SpeechToTextV1
        from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

        apikey = 'PvFDc759NRCbfBhRgKlqi87QsDl7kpNvQYkJZTaEfGCA'
        url = 'https://api.eu-gb.speech-to-text.watson.cloud.ibm.com/instances/33ecdf1d-e4a5-4521-83e6-d3c3c574d9b0'

        # authentication
        authenticator = IAMAuthenticator(apikey)
        speech_to_text = SpeechToTextV1(authenticator=authenticator)
        speech_to_text.set_service_url(url)
    return speech_to_text

def stt(file, sttmodel):
    with open(file, 'rb') as audio_file:
        result = sttmodel.recognize(
            audio=audio_file,
            content_type="audio/mp3",
            model='en-US_NarrowbandModel',
            timestamps=True
        ).get_result()
    return result

def generate_watson_caption(yt):
    speech_to_text = setup_watson()
    audio_filename = download_audio(yt)
    speech_recognition_result = stt(audio_filename, speech_to_text)
    return speech_recognition_result