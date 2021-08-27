FROM python:3

WORKDIR /app

COPY ./requirements.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY ./bert_model_setup.py .
RUN python -m nltk.downloader -q all
RUN python -m spacy download en_core_web_md
RUN python bert_model_setup.py

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]

# docker push
# # import from docker hub to azure container registry
# az acr import \\n--name technicalvideosearchassistant \\n--source docker.io/scchung10/technical-video-search-assistant \\n--image technicalvideosearchassistant:latest
# # tag from local image and push
# docker tag docker.io/scchung10/technical-video-search-assistant:latest technicalvideosearchassistant.azurecr.io/technicalvideosearchassistant
# docker login technicalvideosearchassistant.azurecr.io
# docker push technicalvideosearchassistant.azurecr.io/technicalvideosearchassistant