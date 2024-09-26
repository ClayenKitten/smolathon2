import type { Kysely } from "kysely";
import type { DB } from "$lib/server/db/types";
import { Client as Minio } from "minio";

export default function createRepositories(db: Kysely<DB>, s3: Minio) {
	return {};
}
export type Repositories = ReturnType<typeof createRepositories>;
