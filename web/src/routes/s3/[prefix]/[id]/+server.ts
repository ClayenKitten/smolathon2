import api from "$lib/api";
import createS3 from "$lib/server/s3";
import { S3Error } from "minio";
import { Readable } from "stream";

export async function GET(e) {
	let s3 = await createS3();
	try {
		let authorized = await api(e).s3.authorize.query({
			method: "GET",
			prefix: e.params.prefix,
			id: e.params.id
		});
		if (!authorized) return new Response("Forbidden", { status: 403 });

		let obj = await s3.getObject(
			process.env.S3_BUCKET,
			`${e.params.prefix}/${e.params.id}`
		);
		return new Response(Readable.toWeb(obj) as BodyInit, { status: 200 });
	} catch (err) {
		if (err instanceof S3Error && err.code === "NoSuchKey") {
			return new Response("Not Found", { status: 404 });
		}
		console.log(`Unexpected server error: ${err}`);
		return new Response("Server Error", { status: 500 });
	}
}

export async function PUT(e) {
	let s3 = await createS3();
	try {
		let authorized = await api(e).s3.authorize.query({
			method: "PUT",
			prefix: e.params.prefix,
			id: e.params.id
		});
		if (!authorized) return new Response("Forbidden", { status: 403 });
		if (e.request.body === null)
			return new Response("Unprocessable Content", { status: 422 });

		await s3.putObject(
			process.env.S3_BUCKET,
			`${e.params.prefix}/${e.params.id}`,
			Readable.fromWeb(e.request.body as any)
		);
		return new Response("Ok", { status: 200 });
	} catch (err) {
		console.log(`Unexpected server error: ${err}`);
		return new Response("Server Error", { status: 500 });
	}
}
