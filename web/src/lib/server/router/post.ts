import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "./trpc";
import { z } from "zod";
import { Code } from "$lib/models";

export default function getPostRouter() {
	return router({
		getUserPosts: protectedProcedure.query(async ({ ctx }) => {
			if (ctx.session.user.id === undefined)
				throw new TRPCError({ code: "UNAUTHORIZED" });
			return await ctx.services.post.getUserPosts(ctx.session.user);
		}),
		makePost: protectedProcedure
			.input(z.object({ header: z.string(), content: z.string() }))
			.query(async ({ ctx, input }) => {
				const date = new Date();
				return await ctx.services.post.makePost(
					input.header,
					input.content,
					ctx.session.user,
					date
				);
			})
	});
}
