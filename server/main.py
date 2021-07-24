"""
FastAPI server that return caption, search and Q&A results
To run: uvicorn main:app --reload
"""


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl

from services.caption import pipeline_pytube_transcriptapi, pipeline_youtubedl
from services.video_info import get_video_info
from services.search import search_caption
from services.bertQA import qa


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up request models


class Url(BaseModel):
    url: HttpUrl


class Search(BaseModel):
    query: str
    text: str
    sections: str


class QA(BaseModel):
    question: str
    text: str


@app.get("/caption")
# Test if app is working
async def read_root() -> dict:
    return {"Hello": "World"}


@app.get("/caption/vidinfo")
async def get_vid_info(url: Url) -> dict:
    # get video from url using post
    url = url.url
    return {"url": url, "results": get_video_info(url)}


@app.post("/caption/youtubedl")
async def get_caption(url: Url) -> dict:
    # get caption from url using post (youtubedl pipeline)
    url = url.url
    return {"url": url, "results": pipeline_youtubedl(url)}


@app.post("/caption")
async def get_caption(url: Url) -> dict:
    # get caption from url using post (pytube and youtube_transcript_api pipeline)
    url = url.url
    return {"url": url, "results": pipeline_pytube_transcriptapi(url)}


@app.post("/caption/search")
# request a text query result
async def caption_search(search: Search) -> dict:
    results = search_caption(search.query, search.text, search.sections)
    return {"results": results}


@app.post("/caption/qa")
# request a question and answer query result
async def caption_qa(qa_query: QA) -> dict:
    results = qa(qa_query.question, qa_query.text)
    return {"status": 200, "results": results}
