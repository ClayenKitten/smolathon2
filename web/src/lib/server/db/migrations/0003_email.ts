import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("emailChangeRequest")
		.addColumn("code", "text", c => c.unique().notNull())
		.addColumn("expires", "timestamp", c => c.notNull())
		.addColumn("newEmail", "text", c => c.notNull())
		.addColumn("userId", "integer", c => c.primaryKey().references("user.id"))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("emailChangeRequest").ifExists().execute();
}
