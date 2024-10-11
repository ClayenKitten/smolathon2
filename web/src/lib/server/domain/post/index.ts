import DbRepository from "../../db/repository";
import * as m from "$lib/models";
import type { Insertable, Selectable, Updateable } from "kysely";
import type {
	Post as PostTable,
	PostTag as PostTagTable
} from "$lib/server/db/types";
import type { User } from "../user";
import { PostPreview } from "$lib/models/post";
import type { PostTagRepository } from "../posttag";
import type { Z } from "vitest/dist/reporters-yx5ZTtEV.js";

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
	constructor(
		private repos: { post: PostRepository; posttag: PostTagRepository }
	) {}

	public async getUserPosts(user: User): Promise<PostPreview[]> {
		return this.repos.post.getUserPosts(user);
	}

	public async makePost(
		header: string,
		content: string | null,
		user: User,
		date: Date | string,
		attachments: m.Attachment,
		tags: number[]
	) {
		let userId = user.id;
		let dto: Insertable<PostTable> = {
			header,
			content,
			userId,
			date,
			attachments
		};
		let newPost = await this.repos.post.create(dto);
		tags.forEach(async tagId => {
			let dto1: Insertable<PostTagTable> = {
				postId: newPost.id,
				tagId: tagId
			};
			await this.repos.posttag.create(dto1);
		});

		return this.repos.post.create(dto);
	}
	public async getFilteredPosts(
		userId: number | undefined,
		tags: number[] | undefined,
		subscribed: boolean | undefined,
		currUser: User | undefined
	): Promise<PostPreview[]> {
		return this.repos.post.getFilteredPosts(userId, tags, subscribed, currUser);
	}
	public async getTags(): Promise<m.Tag[]> {
		return this.repos.post.getTags();
	}
}

export class PostRepository extends DbRepository {
	public async getTags(): Promise<m.Tag[]> {
		return (await this.db.selectFrom("tag").selectAll().execute()) as m.Tag[];
	}
	public async getFilteredPosts(
		userId: number | undefined,
		tags: number[] | undefined,
		subscribed: boolean | undefined,
		currUser: User | undefined
	): Promise<PostPreview[]> {
		let posts = await this.db
			.selectFrom("post")
			.leftJoin("subscription", "post.userId", "subscription.subId")
			.leftJoin("postTag", "post.id", "postTag.postId")
			.leftJoin("user", "post.userId", "user.id")
			.selectAll()
			.execute();
		if (userId !== undefined) {
			posts = posts.filter(post => post.userId === userId);
		} else {
			if (subscribed === true && currUser !== undefined) {
				posts = posts.filter(post => post.userId === currUser.id);
			}
			if (tags?.length !== 0 && tags !== undefined) {
				tags.forEach(async tagId => {
					posts = posts.filter(post => post.tagId === tagId);
				});
			}
		}
		const postPreviews = posts.map(post => ({
			header: post.header,
			date: post.date,
			userId: post.userId,
			userName: post.name,
			attachments: post.attachments
		}));

		return postPreviews as PostPreview[];
	}

	public async makePost(
		header: string,
		content: string | null,
		user: User,
		date: Date | string,
		attachments: m.Attachment
	) {}
	public async getUserPosts(user: User): Promise<PostPreview[]> {
		return (await this.db
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
			.execute()) as PostPreview[];
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
