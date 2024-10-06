import type { Kysely } from "kysely";
import type { DB } from "$lib/server/db/types";
import { UserRepository } from "../domain/user";
import { SessionRepository } from "../domain/user/session";
import { PendingRegistrationRepository } from "../domain/user/pendingRegistration";
import { PasswordRecoveryRepository } from "../domain/user/passwordRecovery";
import { EmailChangeRepository } from "../domain/user/emailChange";
import { Client as Minio } from "minio";
import { ProductRepository } from "../domain/product";

export default function createRepositories(db: Kysely<DB>, s3: Minio) {
	return {
		user: new UserRepository(db),
		session: new SessionRepository(db),
		pendingRegistration: new PendingRegistrationRepository(db),
		passwordRecovery: new PasswordRecoveryRepository(db),
		emailChange: new EmailChangeRepository(db),

		product: new ProductRepository(db)
	};
}
export type Repositories = ReturnType<typeof createRepositories>;
