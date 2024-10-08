import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("user")
		.addColumn("id", "integer", c => c.generatedAlwaysAsIdentity().primaryKey())
		.addColumn("email", "text", c => c.unique().notNull())
		.addColumn("passwordHash", "text", c => c.notNull())
		.execute();

	await db.schema
		.createTable("session")
		.addColumn("expires", "timestamp", c => c.notNull())
		.addColumn("token", "text", c => c.notNull())
		.addColumn("userId", "integer", c => c.references("user.id").notNull())
		.execute();

	await db.schema
		.createTable("pendingRegistration")
		.addColumn("code", "text", c => c.unique().notNull())
		.addColumn("email", "text", c => c.primaryKey())
		// no name cause that's added later
		.addColumn("expires", "timestamp", c => c.notNull())
		.addColumn("passwordHash", "text", c => c.notNull())
		.execute();

	await db.schema
		.createTable("passwordRecovery")
		.addColumn("code", "text", c => c.primaryKey())
		.addColumn("email", "text", c =>
			c.unique().notNull().references("user.email")
		)
		.addColumn("expires", "timestamp", c => c.notNull())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	const tables = ["pendingRegistration", "passwordRecovery", "session", "user"];
	await Promise.all(
		tables.map(t => db.schema.dropTable(t).ifExists().execute())
	);
}
