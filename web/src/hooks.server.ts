import appRouter from "$lib/server/router";
import createContext from "$lib/server/context";
import { type Handle } from "@sveltejs/kit";
import { createTRPCHandle } from "trpc-sveltekit";
import { sequence } from "@sveltejs/kit/hooks";

export const handle: Handle = sequence(
	createTRPCHandle({
		router: appRouter,
		createContext
		// onError: err => {
		// 	console.log(err.error);
		// }
	})
);
