import DbRepository from "../../db/repository";
import type EmailService from "../../email";
import {
	alreadyRegisteredTemplate,
	emailChangeAlreadyExistsTemplate,
	emailChangeTemplate,
	registerTemplate
} from "../../email/templates";
import type PasswordService from "./password";
import {
	PendingRegistration,
	type PendingRegistrationRepository
} from "./pendingRegistration";
import type Result from "../../util/result";
import * as m from "$lib/models";
import type { Insertable, Selectable, Updateable } from "kysely";
import type { User as UserTable } from "$lib/server/db/types";
import { EmailChangeRequest, type EmailChangeRepository } from "./emailChange";

export class User {
	private constructor(
		public id: number,
		public email: string,
		public passwordHash: string,
		public name: string,
		public surname: string | null | undefined,
		public city: string | null | undefined,
		public phone: string | null | undefined,
		public workplace: string | null | undefined,
		public info: string | null | undefined,
		public telegram: string | null | undefined,
		public vk: string | null | undefined,
		public dprofile: string | null | undefined,
		public behance: string | null | undefined,
		public dribble: string | null | undefined,
		public unsplash: string | null | undefined,
		public ozenkaMusic: string | null | undefined,
		public vkMusic: string | null | undefined,
		public personalSite: string | null | undefined
	) {}

	public static create(id: number, record: Insertable<UserTable>) {
		let {
			email,
			passwordHash,
			name,
			surname,
			city,
			phone,
			workplace,
			info,
			telegram,
			vk,
			dprofile,
			behance,
			dribble,
			unsplash,
			ozenkaMusic,
			vkMusic,
			personalSite
		} = record;
		return new User(
			id,
			email,
			passwordHash,
			name,
			surname,
			city,
			phone,
			workplace,
			info,
			telegram,
			vk,
			dprofile,
			behance,
			dribble,
			unsplash,
			ozenkaMusic,
			vkMusic,
			personalSite
		);
	}

	public static fromRecord(record: Selectable<UserTable>): User {
		return new User(
			record.id,
			record.email,
			record.passwordHash,
			record.name,
			record.surname,
			record.city,
			record.phone,
			record.workplace,
			record.info,
			record.telegram,
			record.vk,
			record.dprofile,
			record.behance,
			record.dribble,
			record.unsplash,
			record.ozenkaMusic,
			record.vkMusic,
			record.personalSite
		);
	}
}

export class UserService {
	constructor(
		private deps: { email: EmailService; password: PasswordService },
		private repos: {
			user: UserRepository;
			pendingRegistration: PendingRegistrationRepository;
			emailChange: EmailChangeRepository;
		}
	) {}
	public async updateProfile() {
		//TODO fix user profile
	}
	public async showProfile(userId: number) {
		//TODO fix user profile
		let user = await this.repos.user.findById(userId);
		return user;
	}

	public async register(dto: m.Registration) {
		let user = await this.repos.user.findByEmail(dto.email);
		if (user !== undefined) {
			this.onAlreadyRegistered(dto.email);
			return;
		}
		let passwordHash = await this.deps.password.hash(dto.password);
		let pending = new PendingRegistration(dto.email, dto.name, passwordHash);
		await this.repos.pendingRegistration.create(pending);
		await this.deps.email.sendTemplate(dto.email, registerTemplate, {
			code: pending.code
		});
	}

	private async onAlreadyRegistered(email: string) {
		await this.deps.email.sendTemplate(email, alreadyRegisteredTemplate, {});
	}

	public async confirmRegistration(
		code: string
	): Promise<Result<{ user: User }, "NOT_FOUND" | "EXPIRED">> {
		let pending = await this.repos.pendingRegistration.findByCode(code);
		if (pending === undefined) return { ok: false, error: "NOT_FOUND" };
		if (pending.expired) return { ok: false, error: "EXPIRED" };
		const userData = {
			email: pending.email,
			name: pending.name,
			passwordHash: pending.passwordHash
		};
		let user = await this.repos.user.create(userData);
		await this.repos.pendingRegistration.delete(code);
		return { ok: true, value: { user } };
	}

	public async requestEmailChange(
		user: User,
		newEmail: string
	): Promise<Result<void, "SAME_EMAIL" | "TAKEN">> {
		if (user.email === newEmail) return { ok: false, error: "SAME_EMAIL" };
		if ((await this.repos.user.findByEmail(newEmail)) !== undefined) {
			this.deps.email.sendTemplate(
				newEmail,
				emailChangeAlreadyExistsTemplate,
				{}
			);
			return { ok: false, error: "TAKEN" };
		}
		let request = new EmailChangeRequest(user, newEmail);
		await this.repos.emailChange.create(request);
		await this.deps.email.sendTemplate(newEmail, emailChangeTemplate, {
			code: request.code
		});
		return { ok: true };
	}

	public async confirmEmailChange(
		user: User,
		code: string
	): Promise<Result<void, "NOT_FOUND" | "EXPIRED">> {
		let request = await this.repos.emailChange.get(user, code);
		if (request === undefined) return { ok: false, error: "NOT_FOUND" };
		if (request.expired) return { ok: false, error: "EXPIRED" };
		await this.repos.emailChange.delete(user);
		await this.repos.user.update(user.id, { email: request.newEmail });
		return { ok: true };
	}

	public async changePassword(
		user: User,
		oldPassword: string,
		newPassword: string
	): Promise<Result<void, "MISMATCH">> {
		let match = await this.deps.password.verify(oldPassword, user.passwordHash);
		if (!match) return { ok: false, error: "MISMATCH" };
		let newPasswordHash = await this.deps.password.hash(newPassword);
		this.repos.user.update(user.id, { passwordHash: newPasswordHash });
		return { ok: true };
	}
}

export class UserRepository extends DbRepository {
	public async UpdateProfile(id: number, dto: Insertable<UserTable>) {
		//TODO fix profile
		delete dto.id;
		await this.db.updateTable("user").where("id", "=", id).set(dto).execute();
	}

	public async findById(id: number): Promise<User> {
		let record = await this.db
			.selectFrom("user")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();
		if (record === undefined) throw new Error("user id not found");
		return User.fromRecord(record);
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		let record = await this.db
			.selectFrom("user")
			.selectAll()
			.where("email", "=", email)
			.executeTakeFirst();
		if (record === undefined) return undefined;
		return User.fromRecord(record);
	}

	public async create(dto: Insertable<UserTable>): Promise<User> {
		let id = await this.db
			.insertInto("user")
			.values(dto)
			.returning("id")
			.executeTakeFirstOrThrow()
			.then(x => x.id);
		return User.create(id, dto);
	}

	public async update(id: number, dto: Updateable<UserTable>) {
		delete dto.id;
		await this.db.updateTable("user").where("id", "=", id).set(dto).execute();
	}
}
