import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable("user")
		.addColumn("name", "text", c => c.notNull().defaultTo(""))
		.addColumn("avatarUrl", "text")
		.execute();
	await db.schema
		.alterTable("user")
		.alterColumn("name", c => c.dropDefault())
		.execute();

	await db.schema
		.alterTable("pendingRegistration")
		.addColumn("name", "text", c => c.notNull().defaultTo(""))
		.execute();
	await db.schema
		.alterTable("pendingRegistration")
		.alterColumn("name", c => c.dropDefault())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable("user")
		.dropColumn("name")
		.dropColumn("avatarUrl")
		.execute();
	await db.schema
		.alterTable("pendingRegistration")
		.dropColumn("name")
		.execute();
}
