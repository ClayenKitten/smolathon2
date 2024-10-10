import { sql, type Kysely } from "kysely";
import type { DB } from "../types";

export async function seed(db: Kysely<DB>): Promise<void> {
	const tables = [
		"post",
		"message",
		"chat",
		"productOwnership",
		"product",
		"passwordRecovery",
		"emailChangeRequest",
		"pendingRegistration",
		"session",
		"user"
	] as const;
	for (const table of tables) {
		await db.deleteFrom(table).execute();
		await resetSequence(db, table);
	}
}

export async function resetSequence(
	db: Kysely<DB>,
	table: string,
	col: string = "id"
) {
	sql<void>`ALTER SEQUENCE IF EXISTS ${sql.id(`${table}_${col}_seq`)} RESTART WITH 1`.execute(
		db
	);
}
