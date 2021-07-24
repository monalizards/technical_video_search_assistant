from youtube_transcript_api import YouTubeTranscriptApi

"""
Fetch caption from youtube transcript api
"""


def find_lang_caption(videoId, languages=['en']):
    try:
        transcript_list = YouTubeTranscriptApi.list_transcripts(videoId)
        transcript = transcript_list.find_transcript(languages).fetch()
        return transcript
    except Exception as e:
        print(e)
        print("No transcription found.")
        return None


if __name__ == "__main__":
    print("Example transcript: ")
    videoId = 'bQI5uDxrFfA'
    transcript = find_lang_caption(videoId)
    print(transcript)
