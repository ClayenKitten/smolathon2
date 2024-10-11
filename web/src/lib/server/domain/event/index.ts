import DbRepository from "../../db/repository";
import * as m from "$lib/models";
import type { Insertable, Selectable, Updateable } from "kysely";
import type { Event as EventTable } from "$lib/server/db/types";
import type { User } from "../user";
import { EventPreview } from "$lib/models/event";

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
		private repos: { Event: EventRepository; Eventtag: EventRepository }
	) {}
}

export class EventRepository extends DbRepository {
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
