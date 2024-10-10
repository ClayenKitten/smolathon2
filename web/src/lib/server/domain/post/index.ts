import DbRepository from "../../db/repository";
import type Result from "../../util/result";
import * as m from "$lib/models";
import type { Insertable, Selectable, Updateable } from "kysely";
import type { Post as PostTable } from "$lib/server/db/types";
import type { User, UserRepository } from "../user";
import { PostPreview } from "$lib/models/post";

export class Post {
	constructor(
		public id: number,
		public header: string,
		public content: string | null | undefined,
		public date: Date | string,
		public userId: number,
		public attachments: m.Attachment[]
	) {}

	public static create(id: number, record: Insertable<PostTable>) {
		let { header, content, date, userId, attachments } = record;
		return new Post(
			id,
			header,
			content,
			date,
			userId,
			attachments as m.Attachment[]
		);
	}

	public static fromRecord(record: Selectable<PostTable>): Post {
		return new Post(
			record.id,
			record.header,
			record.content,
			record.date,
			record.userId,
			record.attachments as m.Attachment[]
		);
	}
}

export class PostService {
	constructor(private repos: { post: PostRepository }) {}

	public async getUserPosts(user: User): Promise<PostPreview[]> {
		return this.repos.post.getUserPosts(user);
	}

	public async makePost(
		header: string,
		content: string | null,
		user: User,
		date: Date | string
	) {
		var userId = user.id;
		var dto: Insertable<PostTable> = {
			header,
			content,
			userId,
			date
		};
		return this.repos.post.create(dto);
	}
}

export class PostRepository extends DbRepository {
	public async makePost(
		header: string,
		content: string | null,
		user: User,
		date: Date | string
	) {}
	public async getUserPosts(user: User): Promise<PostPreview[]> {
		return this.db
			.selectFrom("post")
			.where("userId", "=", user.id)
			.innerJoin("user", "user.id", "post.userId")
			.select([
				"post.header",
				"post.date",
				"post.userId",
				"user.name as userName",
				"post.attachments"
			])
			.execute();
	}

	public async findById(id: number): Promise<Post> {
		let record = await this.db
			.selectFrom("post")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();
		if (record === undefined) throw new Error("no post");
		return Post.fromRecord(record);
	}

	public async create(dto: Insertable<PostTable>): Promise<Post> {
		let id = await this.db
			.insertInto("post")
			.values(dto)
			.returning("id")
			.executeTakeFirstOrThrow()
			.then(x => x.id);
		return Post.create(id, dto);
	}

	public async update(id: number, dto: Updateable<PostTable>) {
		delete dto.id;
		await this.db.updateTable("post").where("id", "=", id).set(dto).execute();
	}

	public async delete(id: number) {
		await this.db.deleteFrom("post").where("id", "=", id).execute();
	}
}
