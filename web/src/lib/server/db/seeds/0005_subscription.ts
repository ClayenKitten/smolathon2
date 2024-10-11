import { type Kysely } from "kysely";
import type { DB } from "../types";

export async function seed(db: Kysely<DB>): Promise<void> {
	await db
		.insertInto("subscription")
		.values([
			{
				userId: 1,
				subId: 2
			},
			{
				userId: 1,
				subId: 3
			}
		])
		.execute();
}
