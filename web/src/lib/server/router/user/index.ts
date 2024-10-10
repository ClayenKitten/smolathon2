import { router } from "../trpc";
import getSessionRouter from "./session";
import getAccountRouter from "./account";
import getProfileRouter from "./profile";
import getSubscriptionRouter from "./subscriptions";

export default function getUserRouter() {
	return router({
		/** Account management. */
		account: getAccountRouter(),
		/** Session management. */
		session: getSessionRouter(),
		/** Profile management. */
		profile: getProfileRouter(),
		/** Subscription management. */
		subscription: getSubscriptionRouter()
	});
}
