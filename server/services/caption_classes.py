class YoutubeCaption:
    # YoutubeCaption class
    def __init__(self, caption):
        self.caption = caption
        self.sectionlist = self.format_sections()
        self.text = self.compile_sections()

    def __str__(self):
        # print and preview caption
        return f'<YoutubeCaption text="{self.text[:100]}... ">'

    def format_sections(self):
        # function to convert srt into a list of items in the format {"time": {time}, "subtitle": {subtitle}}
        sections = []
        caption = self.caption.split('\n')
        # Divide caption into sections (each sections is 4 lines each: 1. section number, 2. timestamps, 3. text, 4. newline)
        for index in range(len(caption) // 4 + 1):
            base = index * 4
            # create new item in subtitle
            sections.append({
                "section": caption[base],
                "time_original": caption[base+1],
                "time": self.format_time(caption[base + 1]),
                "subtitle": caption[base + 2]
            })
        return sections

    def compile_sections(self):
        text = " ".join([section["subtitle"] for section in self.sectionlist])
        return text

    def list_sections(self):
        return self.sectionlist

    def full_text(self):
        return self.text

    @classmethod
    def format_time(cls, time):
        """return starttime:endtime in seconds from original format, e.g. '00:00:00,000 --> 00:00:07,000'"""
        start_time, end_time = time.split(' --> ')
        start_time, end_time = cls.timestamp_to_seconds(
            start_time), cls.timestamp_to_seconds(end_time)
        return f'{start_time}:{end_time}'

    @classmethod
    def timestamp_to_seconds(cls, timestamp):
        hh, mm, ss = timestamp.split(':')
        ss, ms = ss.split(',')
        seconds = int(hh) * 60 * 60 + int(mm) * 60 + int(ss) + int(ms) / 1000
        return seconds


class WatsonCaption:
    # WatsonCaption class
    def __init__(self, result):
        self.result = result
        self.sectionlist = self.format_sections()
        self.text = self.compile_sections()

    def __str__(self):
        #     print and preview caption
        return f'<WatsonCaption text="{self.text[:100]}... ">'

    # convert to srt-like format
    @staticmethod
    def format_section(section):
        subtitle = ' '.join([timestamp[0] for timestamp in section])
        start_time = section[0][1]
        end_time = section[-1][2]
        return {'time': f"{start_time}:{end_time}", 'subtitle': subtitle}

    def format_sections(self):
        # compile result into a list of word and timestamps
        timestamps = []
        interval = 4
        for result in self.result["results"]:
            timestamps.extend(result['alternatives'][0]['timestamps'])
        # put words in fixed time intervals
        t, end = 0, timestamps[-1][1]
        sections, section = [], []

        while t < end:
            t += interval
            timestamps = timestamps[len(section):]
            section = []
            for timestamp in timestamps:
                if timestamp[1] < t:
                    section.append(timestamp)
                else:
                    break
            sections.append(section)

        formatted_sections = []
        for index, section in enumerate(sections):
            s = {'section': index + 1}
            s = {**s, **self.format_section(section)}
            formatted_sections.append(s)

        return formatted_sections

    def compile_sections(self):
        text = " ".join([section["subtitle"] for section in self.sectionlist])
        return text

    def list_sections(self):
        return self.sectionlist

    def full_text(self):
        return self.text

    # format sections from result in format {'section', 'time', 'subtitle'}
    # (old) method 1. use pre-divided sections
    # def format_section(section):
    #     subtitle = section['transcript']
    #     start_time = section['timestamps'][0][1]
    #     end_time = section['timestamps'][-1][2]
    #
    # def format_sections(self):
    #     print(section[0][1])
    #     sections = []
    #     for index, section in enumerate(self.result["results"]):
    #         s = {'section': index + 1}
    #         s = {**s, **self.format_section(section['alternatives'][0])}
    #         sections.append(s)
    #     return sections
    # (current) method 2. divide result in fixed intervals:


class YoutubeApiCaption:
    # YoutubeApiCaption class (for youtube_transcription_api and youtube_dl)
    def __init__(self, caption):
        self.caption = caption
        self.sectionlist = self.format_sections()
        self.text = self.compile_sections()

    def __str__(self):
        # print and preview caption
        return f'<YoutubeApiCaption text="{self.text[:100]}... ">'

    def format_sections(self):
        sections = []

        for index, section in enumerate(self.caption, start=1):
            # create new item in subtitle
            sections.append({
                "section": str(index),
                "start": section['start'],
                "time": self.format_time(section['start'], section['duration']),
                "subtitle": self.format_subs(section['text'])
            })
        return sections


    def compile_sections(self):
        text = " ".join([section["subtitle"] for section in self.sectionlist])
        return text

    def list_sections(self):
        return self.sectionlist

    def full_text(self):
        return self.text

    @classmethod
    def format_subs(cls, text):
        """    
        replace &#39; with '
        """
        return text.replace("&#39;", "'")

    @classmethod
    def format_time(cls, start, duration):
        """return starttime:endtime in seconds from original format with start time and duration'"""
        return f'{start}:{start+duration}'
