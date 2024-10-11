import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { CreatePost } from "$lib/models";
import { User } from "../domain/user";

export default function getPostRouter() {
	return router({
		getTags: publicProcedure.query(async ({ ctx }) => {
			return await ctx.services.post.getTags();
		}),
		getPosts: publicProcedure
			.input(
				z.object({
					userId: z.number().optional(),
					tags: z.array(z.number()).optional(),
					subscribed: z.boolean().optional()
				})
			)
			.query(async ({ ctx, input }) => {
				return await ctx.services.post.getFilteredPosts(
					input.userId,
					input.tags,
					input.subscribed,
					ctx.session?.user
				);
			}),
		getUserPosts: publicProcedure
			.input(z.object({ userId: z.number() }))
			.query(async ({ ctx, input }) => {
				var user = await ctx.repositories.user.findById(input.userId);
				return await ctx.services.post.getUserPosts(user);
			}),
		makePost: protectedProcedure
			.input(CreatePost)
			.mutation(async ({ ctx, input }) => {
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
