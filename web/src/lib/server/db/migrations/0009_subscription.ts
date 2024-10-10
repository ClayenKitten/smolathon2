import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("subscription")
		.addColumn("id", "integer", c => c.generatedAlwaysAsIdentity().primaryKey())
		.addColumn("userId", "integer", c => c.notNull().references("user.id"))
		.addColumn("subId", "integer", c => c.notNull().references("user.id"))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	const tables = ["subscription"];
	await Promise.all(
		tables.map(t => db.schema.dropTable(t).ifExists().execute())
	);
}
