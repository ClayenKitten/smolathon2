import { type Kysely } from "kysely";
import type { DB } from "../types";
import { resetSequence } from "../utils";
import argon2 from "argon2";

export async function seed(db: Kysely<DB>): Promise<void> {
	const tables = [
		"messages",
		"chats",
		"productOwnership",
		"product",
		"passwordRecovery",
		"emailChangeRequest",
		"pendingRegistration",
		"session",
		"user"
	] as const;
	for (const table of tables) {
		await db.deleteFrom(table).execute();
		await resetSequence(db, table);
	}

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
