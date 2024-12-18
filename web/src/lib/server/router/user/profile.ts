import { protectedProcedure, publicProcedure, router } from "../trpc";
import * as m from "$lib/models";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export default function getProfileRouter() {
	return router({
		showProfileInfo: publicProcedure
			.input(z.object({ userId: z.number().optional() }))
			.query(async ({ ctx, input }) => {
				let id = input.userId ?? ctx.session?.user.id;
				if (id === undefined) throw new TRPCError({ code: "UNAUTHORIZED" });
				let user = await ctx.repositories.user.findById(id);
				return await ctx.services.user.showProfile(user);
			}),
		updateProfileInfo: protectedProcedure
			.input(z.object({ profile: m.ProfileInfo.partial().omit({ id: true }) }))
			.mutation(async ({ ctx, input }) => {
				return await ctx.services.user.updateProfileInfo(
					input.profile.email,
					input.profile.info,
					input.profile.name,
					input.profile.personalSite,
					input.profile.phone,
					input.profile.isCreator,
					input.profile.surname,
					input.profile.telegram,
					input.profile.vk,
					input.profile.workplace,
					ctx.session.user
				);
			})
	});
}
