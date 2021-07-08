FROM python:3

WORKDIR /app

COPY ./requirements.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN python -m nltk.downloader -q all
RUN python -m spacy download en_core_web_lg

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]

# docker build -t technicalvideosearchassistant.azurecr.io/fastapi-server:latest .
# docker run -d -p 8080:8000 technicalvideoserachassistant.azurecr.io/fastapi-server
# docker login technicalvideoserachassistant.azurecr.io
# docker push