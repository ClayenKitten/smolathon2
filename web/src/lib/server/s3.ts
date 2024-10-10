import { Client as Minio } from "minio";

export default async function createS3(): Promise<Minio> {
	return new Minio({
		endPoint: "minio",
		accessKey: process.env.S3_ACCESS_KEY,
		secretKey: process.env.S3_SECRET_KEY,
		port: 9000,
		useSSL: false
	});
}

export abstract class S3Repository {
	constructor(protected s3: Minio) {}

	protected get bucket() {
		return process.env.S3_BUCKET;
	}
}
