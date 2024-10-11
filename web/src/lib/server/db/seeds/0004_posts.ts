import { type Kysely } from "kysely";
import type { DB } from "../types";

export async function seed(db: Kysely<DB>): Promise<void> {
	await db
		.insertInto("post")
		.values([
			{
				header: "Мона Лиза",
				content: "многие слышали о...",
				date: "2024-09-20 20:01:02.06",
				userId: 1,
				attachments: JSON.stringify([{ id: "abc.jpg", type: "image" }])
			},
			{
				header: "Новые работы",
				date: "2024-10-20 20:01:02.06",
				userId: 1
			},
			{
				header: "Старые работы",
				date: "2024-10-20 20:01:02.06",
				userId: 2
			}
		])
		.execute();
}
