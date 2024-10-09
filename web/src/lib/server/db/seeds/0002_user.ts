import { type Kysely } from "kysely";
import type { DB } from "../types";
import argon2 from "argon2";

export async function seed(db: Kysely<DB>): Promise<void> {
	await db
		.insertInto("user")
		.values([
			{
				email: "user1@smolathon.clayenkitten.ru",
				name: "Котофей",
				passwordHash: await argon2.hash("password")
			},
			{
				email: "user2@smolathon.clayenkitten.ru",
				name: "Котолог",
				passwordHash: await argon2.hash("password")
			}
		])
		.execute();
}
