import { type Kysely } from "kysely";
import type { DB } from "../types";
import { resetSequence } from "../utils";
import argon2 from "argon2";

export async function seed(db: Kysely<DB>): Promise<void> {
	await db
		.insertInto("chats")
		.values([
			{
				userId: 1,
				otherId: 2
			},
			{
				userId: 2,
				otherId: 1
			}
		])
		.execute();

	await db
		.insertInto("messages")
		.values([
			{
				senderId: 1,
				recipientId: 2,
				content: "Здравствуйте, хотелось уточнить...",
				date: "2024-09-20 20:01:01.05",
				chatId: 1
			},
			{
				senderId: 1,
				recipientId: 2,
				content: "Здравствуйте, хотелось уточнить...",
				date: "2024-09-20 20:01:01.05",
				chatId: 2
			},
			{
				senderId: 2,
				recipientId: 1,
				content: "Что уточнить?",
				date: "2024-09-20 20:01:02.06",
				chatId: 1
			},
			{
				senderId: 2,
				recipientId: 1,
				content: "Что уточнить?",
				date: "2024-09-20 20:01:02.06",
				chatId: 2
			}
		])
		.execute();
}
