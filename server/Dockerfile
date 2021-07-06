FROM python:3

WORKDIR /app

# # Install rustup
# # ref: https://github.com/rust-embedded/cross/issues/273
# ENV RUSTUP_HOME=/opt/rustup
# ENV CARGO_HOME=/opt/cargo
# RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
# ENV PATH="${PATH}:/opt/cargo/bin"

COPY ./requirements.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN python -m nltk.downloader -q all
COPY ./en_core_web_lg-3.0.0.tar.gz .
RUN pip install en_core_web_lg-3.0.0.tar.gz

COPY . .

CMD [ "python", "main.py" ]