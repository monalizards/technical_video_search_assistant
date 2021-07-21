"""
FastAPI server that return caption, search and Q&A results
To run: uvicorn main:app --reload
"""


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl

from services.caption import pipeline
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


# Test if app is working


@app.get("/caption")
async def read_root() -> dict:
    return {"Hello": "World"}

# get caption from url using post


@app.post("/caption")
async def get_caption(url: Url) -> dict:
    url = url.url
    return {"url": url, "results": pipeline(url)}

# request a text query result


@app.post("/caption/search")
async def caption_search(search: Search) -> dict:
    results = search_caption(search.query, search.text, search.sections)
    return {"results": results}

# request a question and answer query result


@app.post("/caption/qa")
async def caption_qa(qa_query: QA) -> dict:
    results = qa(qa_query.question, qa_query.text)
    return {"status": 200, "results": results}
