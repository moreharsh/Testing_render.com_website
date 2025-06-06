# python 3.13.4 version used
FROM python:3.13.4

COPY . ./Application_backend

WORKDIR /Application_backend

RUN pip install -r requirements.txt

CMD ["python", "server.py"]