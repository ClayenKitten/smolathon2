import api from "$lib/api";
import createS3 from "$lib/server/s3";
import { S3Error } from "minio";
import { Readable } from "stream";

export async function GET(e) {
	if (e.params.path === "") return new Response("Not Found", { status: 404 });
	let s3 = await createS3();
	try {
		let authorized = await api(e).s3.authorize.query({
			method: "GET",
			path: e.params.path
		});
		if (!authorized) return new Response("FORBIDDEN", { status: 403 });

		let obj = await s3.getObject(process.env.S3_BUCKET, e.params.path);
		return new Response(Readable.toWeb(obj) as BodyInit, { status: 200 });
	} catch (err) {
		if (err instanceof S3Error && err.code === "NoSuchKey") {
			return new Response("Not Found", { status: 404 });
		}
		console.log(`Unexpected server error: ${err}`);
		return new Response("Server Error", { status: 500 });
	}
}
