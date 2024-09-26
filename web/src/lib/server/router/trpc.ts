import { initTRPC } from "@trpc/server";
import type { Context } from "../context";

const {
	router,
	procedure: publicProcedure,
	createCallerFactory
} = initTRPC.context<Context>().create();

export { router, publicProcedure, createCallerFactory };
