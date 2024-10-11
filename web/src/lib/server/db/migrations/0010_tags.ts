import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("tag")
		.addColumn("id", "integer", c => c.generatedAlwaysAsIdentity().primaryKey())
		.addColumn("name", "text", c => c.notNull())
		.execute();
	await db
		.insertInto("tag")
		.values([
			{
				name: "Графический дизайн"
			},
			{
				name: "Фотосъёмка"
			},
			{
				name: "Хэндмейд"
			},
			{
				name: "UI/UX дизайн"
			},
			{
				name: "Творчество"
			},
			{
				name: "Sound - дизайн"
			},
			{
				name: "Видеосъёмка"
			},
			{
				name: "Иллюстрация"
			},
			{
				name: "Motion - дизайн"
			}
		])
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	const tables = ["tag"];
	await Promise.all(
		tables.map(t => db.schema.dropTable(t).ifExists().execute())
	);
}
