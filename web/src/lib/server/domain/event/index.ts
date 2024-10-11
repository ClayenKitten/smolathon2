import DbRepository from "../../db/repository";
import * as m from "$lib/models";
import type { Insertable, Selectable, Updateable } from "kysely";
import type {
	Event as EventTable,
	EventTag as EventTagTable
} from "$lib/server/db/types";
import type { User } from "../user";
import { EventPreview } from "$lib/models/event";
import type { EventTagRepository } from "../eventtag";

export class Event {
	constructor(
		public id: number,
		public header: string,
		public content: string | null | undefined,
		public date: null | string | undefined,
		public userId: number,
		public address: string | null | undefined,
		public attachments: m.Attachment[]
	) {}

	public static create(id: number, record: Insertable<EventTable>) {
		let { header, content, date, address, userId, attachments } = record;
		return new Event(
			id,
			header,
			content,
			date,
			userId,
			address,
			attachments as m.Attachment[]
		);
	}

	public static fromRecord(record: Selectable<EventTable>): Event {
		return new Event(
			record.id,
			record.header,
			record.content,
			record.date,
			record.userId,
			record.address,
			record.attachments as m.Attachment[]
		);
	}
}

export class EventService {
	constructor(
		private repos: { event: EventRepository; eventTag: EventTagRepository }
	) {}

	public async getUserEvents(user: User): Promise<EventPreview[]> {
		return this.repos.event.getUserEvents(user);
	}

	public async makeEvent(
		header: string,
		content: string | null,
		user: User,
		date: string | null | undefined,
		address: string | null | undefined,
		attachments: m.Attachment,
		tags: number[]
	) {
		let userId = user.id;
		let dto: Insertable<EventTable> = {
			header,
			content,
			userId,
			date,
			address,
			attachments
		};
		let newPost = await this.repos.event.create(dto);
		tags.forEach(async tagId => {
			let dto1: Insertable<EventTagTable> = {
				eventId: newPost.id,
				tagId: tagId
			};
			await this.repos.eventTag.create(dto1);
		});

		return this.repos.event.create(dto);
	}
}

export class EventRepository extends DbRepository {
	public async makeEvent(
		header: string,
		content: string | null,
		user: User,
		date: string | null | undefined,
		address: string | null | undefined,
		attachments: m.Attachment
	) {}
	public async getUserEvents(user: User): Promise<EventPreview[]> {
		return (await this.db
			.selectFrom("event")
			.where("userId", "=", user.id)
			.innerJoin("user", "user.id", "event.userId")
			.select([
				"event.header",
				"event.date",
				"event.userId",
				"user.name as userName",
				"event.attachments",
				"event.address"
			])
			.execute()) as EventPreview[];
	}

	public async findById(id: number): Promise<Event> {
		let record = await this.db
			.selectFrom("event")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();
		if (record === undefined) throw new Error("no event");
		return Event.fromRecord(record);
	}

	public async create(dto: Insertable<EventTable>): Promise<Event> {
		let id = await this.db
			.insertInto("event")
			.values(dto)
			.returning("id")
			.executeTakeFirstOrThrow()
			.then(x => x.id);
		return Event.create(id, dto);
	}

	public async update(id: number, dto: Updateable<EventTable>) {
		delete dto.id;
		await this.db.updateTable("event").where("id", "=", id).set(dto).execute();
	}

	public async delete(id: number) {
		await this.db.deleteFrom("event").where("id", "=", id).execute();
	}
}
