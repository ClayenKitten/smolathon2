import DbRepository from "../../db/repository";
import * as m from "$lib/models";
import type { Insertable, Selectable, Updateable } from "kysely";
import type { Message as MessageTable } from "$lib/server/db/types";
import type { Chat } from "../chat";

export class Message {
	constructor(
		public id: number,
		public senderId: number,
		public recipientId: number,
		public content: m.ChatMessage,
		public date: Date | string,
		public chatId: number
	) {}

	public static create(id: number, record: Insertable<MessageTable>) {
		let { senderId, recipientId, content, date, chatId } = record;
		return new Message(id, senderId, recipientId, content, date, chatId);
	}

	public static fromRecord(record: Selectable<MessageTable>): Message {
		return new Message(
			record.id,
			record.senderId,
			record.recipientId,
			record.content,
			record.date,
			record.chatId
		);
	}
}

export class MessageRepository extends DbRepository {
	public async sendMessage(
		content: string,
		chatOne: Chat,
		chatTwo: Chat,
		date: Date | string
	): Promise<Message> {
		var senderId = chatOne.userId;
		var recipientId = chatOne.otherUserId;
		var chatId = chatOne.id;
		var dto: Insertable<MessageTable> = {
			senderId,
			recipientId,
			chatId,
			content,
			date
		};
		let message = await this.create(dto);
		var chatId = chatTwo.id;
		var dto: Insertable<MessageTable> = {
			senderId,
			recipientId,
			chatId,
			content,
			date
		};
		await this.create(dto);
		return message;
	}

	public async getChatMessages(chat: Chat): Promise<Message[]> {
		return this.db
			.selectFrom("message")
			.selectAll()
			.where("chatId", "=", chat.id)
			.execute()
			.then(r => Promise.all(r.map(Message.fromRecord)));
	}

	public async findById(id: number): Promise<Message | undefined> {
		let record = await this.db
			.selectFrom("message")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();
		if (record === undefined) throw new Error("message id not found");
		return Message.fromRecord(record);
	}

	private async create(dto: Insertable<MessageTable>): Promise<Message> {
		let id = await this.db
			.insertInto("message")
			.values(dto)
			.returning("id")
			.executeTakeFirstOrThrow()
			.then(x => x.id);
		return Message.create(id, dto);
	}

	public async update(id: number, dto: Updateable<MessageTable>) {
		delete dto.id;
		await this.db
			.updateTable("message")
			.where("id", "=", id)
			.set(dto)
			.execute();
	}

	public async delete(id: number) {
		await this.db.deleteFrom("message").where("id", "=", id).execute();
	}
}
