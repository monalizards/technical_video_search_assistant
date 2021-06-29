# YoutubeCaption class
class YoutubeCaption:
    def __init__(self, caption):
        self.caption = caption
        self.sectionlist = self.format_sections()
        self.text = self.compile_sections()
        
    def __str__(self):
        # print and preview caption
        return f'<YoutubeCaption text="{self.text[:100]}... ">'
    
    def format_sections(self):
        # function to convert srt into a list of itmes in the format {"time": {time}, "subtitle": {subtitle}}
        sections = []
        caption = self.caption.split('\n')
        # Divide caption into sections (each sections is 4 lines each: 1. section number, 2. timestamps, 3. text, 4. newline)
        for index in range(len(caption) // 4):
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
        start_time, end_time = cls.timestamp_to_seconds(start_time), cls.timestamp_to_seconds(end_time)
        return f'{start_time}:{end_time}'
        
    @classmethod
    def timestamp_to_seconds(cls, timestamp):
        hh, mm, ss = timestamp.split(':')
        ss, ms = ss.split(',')
        seconds = int(hh) * 60 * 60 + int(mm) * 60 + int(ss) + int(ms) / 1000
        return seconds
        

# WatsonCaption class
class WatsonCaption:
    def __init__(self, result):
        self.result = result
        self.sectionlist = self.format_sections()
        self.text = self.compile_sections()
        
    # print and preview caption
    def __str__(self):
        return f'<WatsonCaption text="{self.text[:100]}... ">'

    # convert to srt-like format
    @staticmethod
    def format_section(section):
        subtitle = section['transcript']
        start_time = section['timestamps'][0][1]
        end_time = section['timestamps'][-1][2]
        return {'time': f"{start_time}:{end_time}", 'subtitle': subtitle}
    
    # format sections from result in format {'section', 'time', 'subtitle'}    
    def format_sections(self):
        sections = []
        for index, section in enumerate(self.result["results"]):
            s = {'section': index + 1}
            s = {**s, **self.format_section(section['alternatives'][0])}
            sections.append(s)
        return sections
    
    def compile_sections(self):
        text = " ".join([section["subtitle"] for section in self.sectionlist])
        return text
    
    def list_sections(self):
        return self.sectionlist
    
    def full_text(self):
        return self.text

   