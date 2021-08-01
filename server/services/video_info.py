"""
Get key info from video url
"""

from services.youtube_dl_helpers import get_video_base, get_info_file_name, load_info_file, get_key_info, delete_info_file

def get_video_info(url):
    try:
        base = get_video_base(url)
        if not base:
            return {'status': 400, 'message': 'Video not found'}
        else:
            info = load_info_file(get_info_file_name(base))
            info = get_key_info(info)
            delete_info_file(base)
            return {'status': 200, 'videoInfo': info}

    except Exception as e:
        print(e)
        return {'status': 400, 'message': e}


if __name__ == "__main__":
    print(get_video_info('https://www.youtube.com/watch?v=_SW7I5SBRhs'))
