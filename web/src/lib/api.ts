import { browser } from "$app/environment";
import type { AppRouter } from "$lib/server";
import { createTRPCClient, type TRPCClientInit } from "trpc-sveltekit";
import superjson from "superjson";

let browserClient: ReturnType<typeof createTRPCClient<AppRouter>>;

export default function api(init?: TRPCClientInit) {
	if (browser && browserClient) return browserClient;
	const client = createTRPCClient<AppRouter>({ init, transformer: superjson });
	if (browser) browserClient = client;
	return client;
}

export const tokenCookieName = "smolathonToken";
