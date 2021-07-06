from typing import Optional

from fastapi import FastAPI, Request
from urllib.parse import urlparse, urlencode

from services.caption import pipeline
from services.search import search_caption
from services.bertQA import qa

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/caption/")
def get_caption(url: Request):
    # url = f'{url}{urllib.parse.urlencode({'v': v})}'
    return {'url': url}


# uvicorn main:app --reload