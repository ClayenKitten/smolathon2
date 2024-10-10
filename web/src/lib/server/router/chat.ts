import { ChatMessage } from "$lib/models";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "./trpc";
import { z } from "zod";
import type { Chat } from "../domain/chat";

export default function getChatRouter() {
	return router({
		/* Gets chats of current user with the specified user */
		getUserChatWith: protectedProcedure.query(async ({ ctx }) => {
			return await ctx.services.chat.getUserChatWith(ctx.session.user);
		}),
		getChatMessages: protectedProcedure
			.input(z.object({ userId: z.number() }))
			.query(async ({ ctx, input }) => {
				if (ctx.session.user === undefined)
					throw new TRPCError({ code: "UNAUTHORIZED" });
				var recipient = await ctx.repositories.user.findById(input.userId);
				const chat = await ctx.repositories.chat.findChatByRecipient(
					ctx.session.user,
					recipient
				);
				return await ctx.services.chat.getChatMessages(chat);
			}),
		sendMessage: protectedProcedure
			.input(z.object({ userId: z.number(), content: ChatMessage }))
			.query(async ({ ctx, input }) => {
				const date = new Date();
				let chatOne: Chat;
				let chatTwo: Chat;
				let recipient = await ctx.repositories.user.findById(input.userId);
				try {
					chatOne = await ctx.repositories.chat.findChatByRecipient(
						ctx.session.user,
						recipient
					);
					chatTwo = await ctx.repositories.chat.findChatByRecipient(
						recipient,
						ctx.session.user
					);
				} catch {
					chatOne = await ctx.services.chat.createNewChat(
						ctx.session.user,
						recipient
					);
					chatTwo = await ctx.repositories.chat.findChatByRecipient(
						recipient,
						ctx.session.user
					);
				}

				if (chatOne.userId !== ctx.session.user.id)
					throw new TRPCError({ code: "UNAUTHORIZED" });
				return await ctx.services.chat.sendMessage(
					input.content,
					chatOne,
					chatTwo,
					date
				);
			})
	});
}
