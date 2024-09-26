import type { RequestEvent } from "@sveltejs/kit";
import { createInnerContext, type InnerContext } from "./inner";

/** Creates global context for backend, e. g. database connection. */
export default async function createContext(request: RequestEvent) {
	if (innerContext === null) {
		innerContext = await createInnerContext({ fetch: request.fetch });
	}

	return {
		...innerContext,
		request
	};
}
export type Context = Awaited<ReturnType<typeof createContext>>;

let innerContext: InnerContext | null = null;
