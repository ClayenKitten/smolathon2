import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable("user")
		.addColumn("surname", "text")
		.addColumn("city", "text")
		.addColumn("phone", "text")
		.addColumn("workplace", "text")
		.addColumn("info", "text")
		.addColumn("telegram", "text")
		.addColumn("vk", "text")
		.addColumn("dprofile", "text")
		.addColumn("behance", "text")
		.addColumn("dribble", "text")
		.addColumn("unsplash", "text")
		.addColumn("ozenkaMusic", "text")
		.addColumn("vkMusic", "text")
		.addColumn("personalSite", "text")
		.execute();

	await db.schema
		.createTable("post")
		.addColumn("id", "integer", c => c.generatedAlwaysAsIdentity().primaryKey())
		.addColumn("header", "text", c => c.notNull())
		.addColumn("content", "text")
		.addColumn("date", "timestamptz", c => c.notNull())
		.addColumn("userId", "integer", c => c.notNull())
		.addColumn("attachments", "jsonb", c => c.notNull().defaultTo("[]"))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable("user")
		.dropColumn("surname")
		.dropColumn("city")
		.dropColumn("phone")
		.dropColumn("workplace")
		.dropColumn("info")
		.dropColumn("telegram")
		.dropColumn("vk")
		.dropColumn("dprofile")
		.dropColumn("behance")
		.dropColumn("dribble")
		.dropColumn("unsplash")
		.dropColumn("ozenkaMusic")
		.dropColumn("vkMusic")
		.dropColumn("personalSite")
		.execute();
	const tables = ["post"];
	await Promise.all(
		tables.map(t => db.schema.dropTable(t).ifExists().execute())
	);
}
//TODO null, undefined, string для ручку обновления инфы профиля на поле surname. На underfined ничего не обновляем в БД
