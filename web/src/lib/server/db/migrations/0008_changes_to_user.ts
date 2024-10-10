import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable("user")
		.dropColumn("profilePic")
		.addColumn("isCreator", "boolean", c => c.notNull().defaultTo(false))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable("user")
		.addColumn("profilePic", "text")
		.dropColumn("isCreator")
		.execute();
}
