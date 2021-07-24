import os
# from services.youtube_dl_helpers import format_caption
# from services.caption_classes import YoutubeApiCaption
from youtube_dl_helpers import get_video_base, get_info_file_name, load_info_file, get_key_info, find_caption_url, get_caption_json, delete_info_file, format_caption, get_video_file_name
from caption_classes import YoutubeApiCaption

url = 'https://www.youtube.com/watch?v=_SW7I5SBRhs'
base = get_video_base(url)
info_file = get_info_file_name(base)
info_json = load_info_file(info_file)
key_info = get_key_info(info_json)
caption_url = find_caption_url(info_json)
caption_json = get_caption_json(caption_url)


def _get_video_base(url, video_base):
    return get_video_base(url) == video_base


def test_get_video_base():
    """
    get_video_base test 1/3: empty string input
    get_video_base test 2/3: incorrect string input
    get_video_base test 3/3: correct file base from a valid youtube url input
    """
    assert _get_video_base('', None)
    assert _get_video_base('https://www.youtube.com/watch?v=_SW7I', None)
    assert _get_video_base('https://www.youtube.com/watch?v=_SW7I5SBRhs', base)
    assert os.path.exists(f'tmp/{base}.info.json')


def test_get_info_file_name():
    """
    get_info_json test 1/1: correct info.json file name from a video name
    """
    assert '.info.json' in get_info_file_name(
        'Stephen Hawking discusses Baby Universes, UC Berkeley 1988-_SW7I5SBRhs')


def test_get_video_file_name():
    """
    get_video test 1/1: correct video file name from a video name
    """
    assert ".mp4" in get_video_file_name(
        'Stephen Hawking discusses Baby Universes, UC Berkeley 1988-_SW7I5SBRhs')


def test_load_info():
    """
    loads_info_file test 1/1: check if a dictionary is returned from loading an info file
    """
    assert type(load_info_file(info_file)) == dict


def test_get_key_info():
    """
    get_key_file test 1/1: check if key info contains correct info, with a video id, title and duration
    """
    for field in ["id", "title", "duration", "caption_url"]:
        assert field in key_info
    assert key_info["id"] == '_SW7I5SBRhs'
    assert key_info["title"] == 'Stephen Hawking discusses Baby Universes, UC Berkeley 1988'
    assert key_info["duration"] == 3979


def test_find_caption_url():
    """
    find_caption_url 1/1: find caption url should return a url string if available
    """
    assert "https://www.youtube.com/api/timedtext?" in find_caption_url(
        info_json)


def test_get_caption_json():
    """
    get_caption_json test 1/1: turn xml given by caption url in the format with text, duration and start
    """
    caption_sections = get_caption_json(caption_url)
    assert type(caption_sections) == list
    for section in caption_sections:
        assert type(section) == dict
        assert 'text' in section
        assert 'duration' in section
        assert 'start' in section


def test_format_caption():
    """
    format_caption test 1/1: caption should be a YouTubeApiCaption object
    """
    assert type(format_caption(caption_json)) == YoutubeApiCaption


def test_delete_info_file():
    """
    delete_info_file test 1/1: delete info.json from the video base name if it exists
    """
    assert os.path.exists(f'tmp/{base}.info.json')

    delete_info_file(
        'Stephen Hawking discusses Baby Universes, UC Berkeley 1988-_SW7I5SBRhs')

    assert not os.path.exists(f'tmp/{base}.info.json')
