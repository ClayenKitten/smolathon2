import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("postTag")
		.addColumn("id", "integer", c => c.generatedAlwaysAsIdentity().primaryKey())
		.addColumn("postId", "integer", c => c.notNull().references("post.id"))
		.addColumn("tagId", "integer", c => c.notNull().references("tag.id"))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	const tables = ["postTag"];
	await Promise.all(
		tables.map(t => db.schema.dropTable(t).ifExists().execute())
	);
}
