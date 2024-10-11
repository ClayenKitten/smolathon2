import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("event")
		.addColumn("id", "integer", c => c.generatedAlwaysAsIdentity().primaryKey())
		.addColumn("header", "text", c => c.notNull())
		.addColumn("content", "text")
		.addColumn("date", "text")
		.addColumn("address", "text")
		.addColumn("userId", "integer", c => c.notNull())
		.addColumn("attachments", "jsonb", c => c.notNull().defaultTo("[]"))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	const tables = ["event"];
	await Promise.all(
		tables.map(t => db.schema.dropTable(t).ifExists().execute())
	);
}
