import { protectedProcedure, publicProcedure, router } from "../trpc";
import * as m from "$lib/models";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export default function getProfileRouter() {
	return router({
		showProfileInfo: protectedProcedure.mutation(async ({ ctx }) => {
			var userId = ctx.session.user.id;
			return await ctx.services.user.showProfile(userId);
		})
		/*updateProfileInfo: protectedProcedure
			.input(z.object({ name: z.string(), no }))
			.mutation(async ({ ctx }) => {
				return await ctx.services.user.updateProfileInfo();
			}),*/
	});
}
