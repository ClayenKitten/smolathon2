import DbRepository from "../../db/repository";
import type { Insertable, Selectable, Updateable } from "kysely";
import type { Chat as ChatsTable } from "$lib/server/db/types";
import type { User } from "../user";
import type { Message, MessageRepository } from "../message";

export class Chat {
	constructor(
		public id: number,
		public userId: number,
		public otherUserId: number
	) {}

	public static create(id: number, record: Insertable<ChatsTable>) {
		let { userId, otherUserId } = record;
		return new Chat(id, userId, otherUserId);
	}

	public static fromRecord(record: Selectable<ChatsTable>): Chat {
		return new Chat(record.id, record.userId, record.otherUserId);
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
			.selectFrom("chat")
			.where("userId", "=", user.id)
			.selectAll()
			.execute()
			.then(r => Promise.all(r.map(Chat.fromRecord)));
	}

	public async findById(id: number): Promise<Chat> {
		let record = await this.db
			.selectFrom("chat")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();
		if (record === undefined) throw new Error("chat id not found");
		return Chat.fromRecord(record);
	}

	public async create(dto: Insertable<ChatsTable>): Promise<Chat> {
		let id = await this.db
			.insertInto("chat")
			.values(dto)
			.returning("id")
			.executeTakeFirstOrThrow()
			.then(x => x.id);
		return Chat.create(id, dto);
	}

	public async update(id: number, dto: Updateable<ChatsTable>) {
		delete dto.id;
		await this.db.updateTable("chat").where("id", "=", id).set(dto).execute();
	}

	public async delete(id: number) {
		await this.db.deleteFrom("chat").where("id", "=", id).execute();
	}
}
