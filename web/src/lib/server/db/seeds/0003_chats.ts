import { type Kysely } from "kysely";
import type { DB } from "../types";

export async function seed(db: Kysely<DB>): Promise<void> {
	await db
		.insertInto("chat")
		.values([
			{
				userId: 1,
				otherUserId: 2
			},
			{
				userId: 2,
				otherUserId: 1
			}
		])
		.execute();

	await db
		.insertInto("message")
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
