import DbRepository from "../../db/repository";
import type Result from "../../util/result";
import * as m from "$lib/models";
import type { Insertable, Selectable, Updateable } from "kysely";
import type {
	Chats as ChatsTable,
	Messages,
	Timestamp
} from "$lib/server/db/types";
import type { User } from "../user";
import { TRPCError } from "@trpc/server";
import type { Message, MessageRepository } from "../message";

export class Chat {
	constructor(
		public id: number,
		public userId: number,
		public otherId: number
	) {}

	public static create(id: number, record: Insertable<ChatsTable>) {
		let { userId, otherId } = record;
		return new Chat(id, userId, otherId);
	}

	public static fromRecord(record: Selectable<ChatsTable>): Chat {
		return new Chat(record.id, record.userId, record.otherId);
	}
}

export class ChatService {
	constructor(
		private repos: { chat: ChatRepository; message: MessageRepository }
	) {}

	public async getUserChatWith(user: User): Promise<Chat[]> {
		return this.repos.chat.getUserChatWith(user);
	}
	public async getChatMessages(chat: Chat): Promise<Message[]> {
		return this.repos.message.getChatMessages(chat);
	}
}

export class ChatRepository extends DbRepository {
	public async getUserChatWith(user: User): Promise<Chat[]> {
		return this.db
			.selectFrom("chats")
			.where("userId", "=", user.id)
			.selectAll()
			.execute()
			.then(r => Promise.all(r.map(Chat.fromRecord)));
	}

	public async findById(id: number): Promise<Chat> {
		let record = await this.db
			.selectFrom("chats")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();
		if (record === undefined) throw new Error("chat id not found");
		return Chat.fromRecord(record);
	}

	public async create(dto: Insertable<ChatsTable>): Promise<Chat> {
		let id = await this.db
			.insertInto("chats")
			.values(dto)
			.returning("id")
			.executeTakeFirstOrThrow()
			.then(x => x.id);
		return Chat.create(id, dto);
	}

	public async update(id: number, dto: Updateable<ChatsTable>) {
		delete dto.id;
		await this.db.updateTable("chats").where("id", "=", id).set(dto).execute();
	}

	public async delete(id: number) {
		await this.db.deleteFrom("chats").where("id", "=", id).execute();
	}
}
