import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("eventTag")
		.addColumn("id", "integer", c => c.generatedAlwaysAsIdentity().primaryKey())
		.addColumn("eventId", "integer", c => c.notNull().references("event.id"))
		.addColumn("tagId", "integer", c => c.notNull().references("tag.id"))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	const tables = ["eventTag"];
	await Promise.all(
		tables.map(t => db.schema.dropTable(t).ifExists().execute())
	);
}
