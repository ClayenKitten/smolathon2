import DbRepository from "../../db/repository";
import * as m from "$lib/models";
import type { Insertable, Selectable, Updateable } from "kysely";
import type { PostTag as PostTagTable } from "$lib/server/db/types";

export class PostTag {
	constructor(
		public id: number,
		public postId: number,
		public tagId: number
	) {}

	public static create(id: number, record: Insertable<PostTagTable>) {
		let { postId, tagId } = record;
		return new PostTag(id, postId, tagId);
	}

	public static fromRecord(record: Selectable<PostTagTable>): PostTag {
		return new PostTag(record.id, record.postId, record.tagId);
	}
}

export class PostTagRepository extends DbRepository {
	public async findById(id: number): Promise<PostTag> {
		let record = await this.db
			.selectFrom("postTag")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();
		if (record === undefined) throw new Error("no posttag");
		return PostTag.fromRecord(record);
	}

	public async create(dto: Insertable<PostTagTable>): Promise<PostTag> {
		let id = await this.db
			.insertInto("postTag")
			.values(dto)
			.returning("id")
			.executeTakeFirstOrThrow()
			.then(x => x.id);
		return PostTag.create(id, dto);
	}

	public async update(id: number, dto: Updateable<PostTagTable>) {
		delete dto.id;
		await this.db
			.updateTable("postTag")
			.where("id", "=", id)
			.set(dto)
			.execute();
	}

	public async delete(id: number) {
		await this.db.deleteFrom("postTag").where("id", "=", id).execute();
	}
}
