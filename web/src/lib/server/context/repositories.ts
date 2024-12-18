import type { Kysely } from "kysely";
import type { DB } from "$lib/server/db/types";
import { UserRepository } from "../domain/user";
import { SessionRepository } from "../domain/user/session";
import { PendingRegistrationRepository } from "../domain/user/pendingRegistration";
import { PasswordRecoveryRepository } from "../domain/user/passwordRecovery";
import { EmailChangeRepository } from "../domain/user/emailChange";
import { Client as Minio } from "minio";

import { ChatRepository } from "../domain/chat";
import { MessageRepository } from "../domain/message";
import { PostRepository } from "../domain/post";
import { SubscriptionRepository } from "../domain/subscription";
import { PostTagRepository } from "../domain/posttag";
import { EventTagRepository } from "../domain/eventtag";
import { EventRepository } from "../domain/event";

export default function createRepositories(db: Kysely<DB>, s3: Minio) {
	return {
		user: new UserRepository(db),
		session: new SessionRepository(db),
		pendingRegistration: new PendingRegistrationRepository(db),
		passwordRecovery: new PasswordRecoveryRepository(db),
		emailChange: new EmailChangeRepository(db),
		chat: new ChatRepository(db),
		message: new MessageRepository(db),
		post: new PostRepository(db),
		posttag: new PostTagRepository(db),
		subscription: new SubscriptionRepository(db),
		eventTag: new EventTagRepository(db),
		event: new EventRepository(db)
	};
}
export type Repositories = ReturnType<typeof createRepositories>;
