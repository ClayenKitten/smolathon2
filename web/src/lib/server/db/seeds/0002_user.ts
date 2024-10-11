import { type Kysely } from "kysely";
import type { DB } from "../types";
import argon2 from "argon2";

export async function seed(db: Kysely<DB>): Promise<void> {
	await db
		.insertInto("user")
		.values([
			{
				email: "user1@smolcollab.ru",
				name: "Котофей",
				passwordHash: await argon2.hash("password")
			},
			{
				email: "user2@smolcollab.ru",
				name: "Котолог",
				surname: "Капибарович",
				workplace: "ГДО",
				phone: "+98761092385",
				telegram: "https://t.me/muse",
				vk: "id2145131",
				info: "Я художник, я так вижу. Я художник, я так вижу. Я художник, я так вижу. Я художник, я так вижу. Я художник, я так вижу. Я художник, я так вижу. Я художник, я так вижу. ",
				personalSite: "Kapibara.com",
				isCreator: true,
				passwordHash: await argon2.hash("password")
			},
			{
				email: "user3@smolcollab.ru",
				name: "Котомор",
				surname: "Лысков",
				workplace: "ЭФСШ",
				phone: "+18761242383",
				telegram: "https://t.me/grabProfessionalism",
				vk: "id2342",
				personalSite: "gegIndie.com",
				isCreator: false,
				passwordHash: await argon2.hash("password")
			}
		])
		.execute();
}
