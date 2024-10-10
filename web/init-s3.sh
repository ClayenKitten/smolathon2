bash +o history
mc alias set smolathon2 http://minio:9000 $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD
bash -o history

mc admin info smolathon2
mc ls smolathon2
mc mb smolathon2/$S3_BUCKET || true
mc admin user add smolathon2 $S3_ACCESS_KEY $S3_SECRET_KEY || true
mc admin policy attach smolathon2 readwrite --user $S3_ACCESS_KEY || true
