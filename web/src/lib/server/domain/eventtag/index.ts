import DbRepository from "../../db/repository";
import * as m from "$lib/models";
import type { Insertable, Selectable, Updateable } from "kysely";
import type { EventTag as EventTagTable } from "$lib/server/db/types";

export class EventTag {
	constructor(
		public id: number,
		public eventId: number,
		public tagId: number
	) {}

	public static create(id: number, record: Insertable<EventTagTable>) {
		let { eventId, tagId } = record;
		return new EventTag(id, eventId, tagId);
	}

	public static fromRecord(record: Selectable<EventTagTable>): EventTag {
		return new EventTag(record.id, record.eventId, record.tagId);
	}
}

export class EventTagRepository extends DbRepository {
	public async findById(id: number): Promise<EventTag> {
		let record = await this.db
			.selectFrom("eventTag")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();
		if (record === undefined) throw new Error("no event tag");
		return EventTag.fromRecord(record);
	}

	public async create(dto: Insertable<EventTagTable>): Promise<EventTag> {
		let id = await this.db
			.insertInto("eventTag")
			.values(dto)
			.returning("id")
			.executeTakeFirstOrThrow()
			.then(x => x.id);
		return EventTag.create(id, dto);
	}

	public async update(id: number, dto: Updateable<EventTagTable>) {
		delete dto.id;
		await this.db
			.updateTable("eventTag")
			.where("id", "=", id)
			.set(dto)
			.execute();
	}

	public async delete(id: number) {
		await this.db.deleteFrom("eventTag").where("id", "=", id).execute();
	}
}
