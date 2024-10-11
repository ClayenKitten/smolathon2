import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { Attachment, Code } from "$lib/models";
import { User } from "../domain/user";

export default function getPostRouter() {
	return router({
		getPosts: publicProcedure
			.input(
				z.object({
					userId: z.number().optional(),
					tags: z.array(z.number()).optional(),
					subscribed: z.boolean().optional()
				})
			)
			.query(async ({ ctx, input }) => {
				const currUser = ctx.session?.user;
				if (currUser === undefined)
					throw new TRPCError({ code: "UNAUTHORIZED" });
				return await ctx.services.post.getFilteredPosts(
					input.userId,
					input.tags,
					input.subscribed,
					currUser
				);
			}),
		getUserPosts: publicProcedure
			.input(z.object({ userId: z.number() }))
			.query(async ({ ctx, input }) => {
				var user = await ctx.repositories.user.findById(input.userId);
				return await ctx.services.post.getUserPosts(user);
			}),
		makePost: protectedProcedure
			.input(
				z.object({
					header: z.string(),
					content: z.string(),
					attachments: Attachment,
					tags: z.array(z.number())
				})
			)
			.query(async ({ ctx, input }) => {
				const date = new Date();
				return await ctx.services.post.makePost(
					input.header,
					input.content,
					ctx.session.user,
					date,
					input.attachments,
					input.tags
				);
			})
	});
}
