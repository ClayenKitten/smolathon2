import { router } from "../trpc";
import getSessionRouter from "./session";
import getAccountRouter from "./account";

export default function getUserRouter() {
	return router({
		/** Account management. */
		account: getAccountRouter(),
		/** Session management. */
		session: getSessionRouter()
	});
}
