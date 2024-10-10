import { protectedProcedure, publicProcedure, router } from "../trpc";
import * as m from "$lib/models";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export default function getProfileRouter() {
	return router({
		showProfileInfo: publicProcedure
			.input(z.object({ userId: z.number() }))
			.mutation(async ({ ctx, input }) => {
				let user = await ctx.repositories.user.findById(input.userId);
				return await ctx.services.user.showProfile(user);
			})
		/*updateProfileInfo: protectedProcedure
			.input(z.object({ name: z.string(), no }))
			.mutation(async ({ ctx }) => {
				return await ctx.services.user.updateProfileInfo();
			}),*/
	});
}
