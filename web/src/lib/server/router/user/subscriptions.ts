import { protectedProcedure, publicProcedure, router } from "../trpc";
import * as m from "$lib/models";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import type { subscribe } from "diagnostics_channel";

export default function getSubscriptionRouter() {
	return router({
		getUserSubscriptions: publicProcedure
			.input(z.object({ userId: z.number() }))
			.query(async ({ ctx, input }) => {
				let user = await ctx.repositories.user.findById(input.userId);
				return await ctx.services.user.getUserSubscriptions(user);
			}),
		subscribe: protectedProcedure
			.input(z.object({ subId: z.number() }))
			.query(async ({ ctx, input }) => {
				let user = await ctx.repositories.user.findById(ctx.session.user.id);
				let subUser = await ctx.repositories.user.findById(input.subId);
				return await ctx.services.user.subscribe(user, subUser);
			}),
		unsubscribe: protectedProcedure
			.input(z.object({ subId: z.number() }))
			.query(async ({ ctx, input }) => {
				let user = await ctx.repositories.user.findById(ctx.session.user.id);
				let subUser = await ctx.repositories.user.findById(input.subId);
				return await ctx.services.user.unsubscribe(user, subUser);
			}),
		getUserSubscribers: publicProcedure
			.input(z.object({ userId: z.number() }))
			.query(async ({ ctx, input }) => {
				let user = await ctx.repositories.user.findById(input.userId);
				return await ctx.services.user.getUserSubscribers(user);
			})
	});
}
