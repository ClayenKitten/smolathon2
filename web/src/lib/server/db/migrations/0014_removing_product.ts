import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	const tables = ["productOwnership", "products"];
	await Promise.all(
		tables.map(t => db.schema.dropTable(t).ifExists().execute())
	);
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("product")
		.addColumn("id", "integer", c => c.generatedAlwaysAsIdentity().primaryKey())
		.addColumn("title", "text", c => c.notNull())
		.addColumn("author", "text", c => c.notNull())
		.addColumn("price", "integer", c => c.notNull())
		.addColumn("description", "text")
		.execute();

	await db.schema
		.createTable("productOwnership")
		.addColumn("userId", "integer", c => c.notNull().references("user.id"))
		.addColumn("productId", "integer", c =>
			c.notNull().references("product.id")
		)
		.execute();
}
