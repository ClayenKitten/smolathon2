import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("chat")
		.addColumn("id", "integer", c => c.generatedAlwaysAsIdentity().primaryKey())
		.addColumn("userId", "integer", c => c.notNull().references("user.id"))
		.addColumn("otherUserId", "integer", c => c.notNull().references("user.id"))
		.execute();
	await db.schema
		.createTable("message")
		.addColumn("id", "integer", c => c.generatedAlwaysAsIdentity().primaryKey())
		.addColumn("senderId", "integer", c => c.notNull().references("user.id"))
		.addColumn("recipientId", "integer", c => c.notNull().references("user.id"))
		.addColumn("content", "text", c => c.notNull())
		.addColumn("date", "timestamptz", c => c.notNull())
		.addColumn("chatId", "integer", c => c.notNull().references("chat.id"))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	const tables = ["message", "chat"];
	await Promise.all(
		tables.map(t => db.schema.dropTable(t).ifExists().execute())
	);
}
