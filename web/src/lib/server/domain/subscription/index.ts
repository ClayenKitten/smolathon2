import DbRepository from "../../db/repository";
import type { Insertable, Selectable, Updateable } from "kysely";
import type { Subscription as SubscriptionTable } from "$lib/server/db/types";
import type { User } from "../user";

export class Subscription {
	constructor(
		public id: number,
		public userId: number,
		public subId: number
	) {}

	public static create(id: number, record: Insertable<SubscriptionTable>) {
		let { userId, subId } = record;
		return new Subscription(id, userId, subId);
	}

	public static fromRecord(
		record: Selectable<SubscriptionTable>
	): Subscription {
		return new Subscription(record.id, record.userId, record.subId);
	}
}

export class SubscriptionRepository extends DbRepository {
	public async subscribe(user: User, subUser: User) {
		let check = await this.db
			.selectFrom("subscription")
			.where("userId", "=", user.id)
			.where("subId", "=", subUser.id)
			.execute();
		if (check.entries.length > 0) throw new Error("already subscribed");
		let dto: Insertable<SubscriptionTable> = {
			userId: user.id,
			subId: subUser.id
		};
		this.create(dto);
	}
	public async unsubscribe(user: User, subUser: User) {
		await this.db
			.deleteFrom("subscription")
			.where("userId", "=", user.id)
			.where("subId", "=", subUser.id)
			.execute();
	}

	public async getUserSubscriptions(user: User): Promise<Subscription[]> {
		return this.db
			.selectFrom("subscription")
			.where("userId", "=", user.id)
			.selectAll()
			.execute()
			.then(r => Promise.all(r.map(Subscription.fromRecord)));
	}

	public async findById(id: number): Promise<Subscription | undefined> {
		let record = await this.db
			.selectFrom("subscription")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();
		if (record === undefined) return undefined;
		return Subscription.fromRecord(record);
	}

	public async create(
		dto: Insertable<SubscriptionTable>
	): Promise<Subscription> {
		let id = await this.db
			.insertInto("subscription")
			.values(dto)
			.returning("id")
			.executeTakeFirstOrThrow()
			.then(x => x.id);
		return Subscription.create(id, dto);
	}

	public async update(id: number, dto: Updateable<SubscriptionTable>) {
		delete dto.id;
		await this.db
			.updateTable("subscription")
			.where("id", "=", id)
			.set(dto)
			.execute();
	}

	public async delete(id: number) {
		await this.db.deleteFrom("subscription").where("id", "=", id).execute();
	}
}
