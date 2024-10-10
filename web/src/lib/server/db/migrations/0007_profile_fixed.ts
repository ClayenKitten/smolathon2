import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable("user")
		.dropColumn("city")
		.dropColumn("dprofile")
		.dropColumn("behance")
		.dropColumn("dribble")
		.dropColumn("unsplash")
		.dropColumn("ozenkaMusic")
		.dropColumn("vkMusic")
		.addColumn("profilePic", "text")
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema
		.alterTable("user")
		.addColumn("city", "text")
		.addColumn("dprofile", "text")
		.addColumn("behance", "text")
		.addColumn("dribble", "text")
		.addColumn("unsplash", "text")
		.addColumn("ozenkaMusic", "text")
		.addColumn("vkMusic", "text")
		.dropColumn("profilePic")
		.execute();
}
