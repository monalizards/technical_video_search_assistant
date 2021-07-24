"""
Helper file for youtube_transcript_api
"""

from youtube_transcript_api import YouTubeTranscriptApi


def find_lang_caption(videoId, languages=['en']):
    """
    A function for finding caption information from a given id in the specified language (default: en)
    """
    try:
        transcript_list = YouTubeTranscriptApi.list_transcripts(videoId)
        transcript = transcript_list.find_transcript(languages).fetch()
        return transcript
    except Exception as e:
        return None


if __name__ == "__main__":
    print("Example transcript: ")
    videoId = 'bQI5uDxrFfA'
    transcript = find_lang_caption(videoId)
    print(transcript)
