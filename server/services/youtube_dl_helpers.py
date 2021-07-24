import sys
import os
from io import StringIO
from youtube_dl import YoutubeDL
import json
import requests
from bs4 import BeautifulSoup
from moviepy.editor import AudioFileClip

from caption_classes import YoutubeApiCaption
from caption_helpers import video_to_audio, setup_watson, stt

# from services.caption_classes import YoutubeApiCaption

# Ref: https://github.com/ytdl-org/


def get_video_base(url, skip_download=True):
    """
    return video name for url with no extensions
    if skip_download is false, this function with download a video file
    """
    ydl_opts = {
        'quiet': True,
        'skip_download': skip_download,
        'forcefilename': True,
        'writeinfojson': skip_download,
        'noplaylist': True,
    }

    old_stdout = sys.stdout
    new_stdout = StringIO()
    sys.stdout = new_stdout

    try:
        with YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        output = new_stdout.getvalue()
        sys.stdout = old_stdout
        video_base = output.strip('.mp4\n')

        # move all related files to temp folder
        move_files(video_base)

        return video_base

    except:
        sys.stdout = old_stdout
        return None


def get_info_file_name(video_base):
    return os.path.join(get_tmp_path_name(), f'{video_base}.info.json')


def get_video_file_name(video_base):
    return os.path.join(get_tmp_path_name(), f'{video_base}.mp4')


def load_info_file(info_file):
    with open(info_file, 'r') as f:
        info = f.readlines()
        info = json.loads(info[0])
    return info


def get_key_info(info_json):
    return {
        "id": info_json["id"],
        "title": info_json["title"],
        "duration": info_json["duration"],
    }


def find_caption_url(info, lang='en'):
    """
    return url for caption in specified language with srv1 format
    return None if none found
    """
    if lang in info['automatic_captions']:
        for index, caption in enumerate(info['automatic_captions'][lang]):
            if caption['ext'] == 'srv1':
                caption_url = info['automatic_captions']['en'][index]['url']
                return caption_url
    else:
        return None


def get_caption_json(caption_url):
    """
    Parse caption from url with text, duration, and start time in each section
    """
    page = requests.get(caption_url)
    soup = BeautifulSoup(page.content, "lxml-xml")
    text_sections = soup.find_all('text')
    sections = [{'text': s.string, 'duration': s["dur"],
                 'start': s['start']} for s in text_sections]
    return sections


def format_caption(caption_json):
    """
    Return a YouTubeApiCaption model
    """
    return YoutubeApiCaption(caption_json)


def delete_info_file(video_base):
    """
    delete info file for a given video_base
    """
    info_file = get_info_file_name(video_base)
    if os.path.exists(info_file):
        os.remove(info_file)


def delete_file(filename):
    """
    delete file from path
    """
    if os.path.exists(filename):
        os.remove(filename)


def get_tmp_path_name():
    """
    return the path name to tmp download folder
    """
    return os.path.join(os.getcwd(), 'tmp')


def move_files(video_base):
    """move_files to tmp folder"""
    path = get_tmp_path_name()
    if not os.path.isdir('tmp'):
        os.mkdir('tmp')
    related_files = [f for f in os.listdir(
    ) if video_base in f and os.path.isfile(f)]
    for f in related_files:
        try:
            os.rename(f, os.path.join(path, f))
        except Exception as e:
            print(e)


if __name__ == "__main__":
    url = "https://www.youtube.com/watch?v=LKVHFHJsiO0&list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n"

    base = get_video_base(url)

    # # get info
    # info_file = get_info_file_name(base)
    # info_json = load_info_file(info_file)
    # key_info = get_key_info(info_json)

    # # get caption
    # caption_url = find_caption_url(info_json)
    # caption = get_caption_json(caption_url)
    # caption_model = YoutubeApiCaption(caption)

    delete_info_file(base)

    # # download video
    video_filename = get_video_base(url, False)

    delete_file(video_filename)
