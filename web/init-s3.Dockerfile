FROM minio/mc

WORKDIR /app

COPY ./init-s3.sh ./script.sh 

ENTRYPOINT ["bash", "./script.sh"]
