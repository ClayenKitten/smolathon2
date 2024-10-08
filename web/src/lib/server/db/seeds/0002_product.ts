import { sql, type Kysely } from "kysely";
import type { DB } from "../types";
import { resetSequence } from "../utils";

export async function seed(db: Kysely<DB>): Promise<void> {
	const tables = [
		"productOwnership",
		"product"
	] as const;
	for (const table of tables) {
		await db.deleteFrom(table).execute();
		await resetSequence(db, table);
	}

	await db
		.insertInto("product")
		.values([
			{ 
				title: "Продукт 1",
				price: 1000,
				author: "Котобар",
				description: "Это пример описания продукта 1"
			},
			{ 
				title: "Продукт 2",
				price: 2000,
				author: "Котофон",
				description: "Это другой пример описания продукта 2"
			}
		])
		.execute();
	await db
		.insertInto("productOwnership")
		.values([
			{
				productId: 1,
				userId: 1
			},
			{
				productId: 2,
				userId: 1
			}
			
		])
		.execute();

};
	

