import { ChatMessage } from "$lib/models";
import { defaultTransformer } from "@trpc/server";
import { protectedProcedure, router } from "./trpc";
import { z } from "zod";

export default function getChatRouter() {
	return router({
		/* Gets chats of current user with the specified user */
		getUserChatWith: protectedProcedure.query(async ({ ctx }) => {
			return await ctx.services.chat.getUserChatWith(ctx.session.user);
		}),
		getChatMessages: protectedProcedure
			.input(z.object({ chatId: z.number() }))
			.query(async ({ ctx, input }) => {
				const chat = await ctx.repositories.chat.findById(input.chatId);
				if (chat.userId !== ctx.session.user.id)
					throw new Error("UNAUTHORIZED");
				return await ctx.services.chat.getChatMessages(chat);
			}),
		sendMessage: protectedProcedure
			.input(z.object({ userId: z.number(), content: ChatMessage })) //тут userId, не chatId
			.query(async ({ ctx, input }) => {
				const date = new Date();
				var recipient = await ctx.repositories.user.findById(input.userId);
				//TODO функция найти чат по получателю
				try {
					var chatOne = await ctx.repositories.chat.findChatByRecipient(
						ctx.session.user,
						recipient
					);
					var chatTwo = await ctx.repositories.chat.findChatByRecipient(
						recipient,
						ctx.session.user
					);
				} catch {
					var chatOne = await ctx.services.chat.createNewChat(
						ctx.session.user,
						recipient
					);
					var chatTwo = await ctx.repositories.chat.findChatByRecipient(
						recipient,
						ctx.session.user
					);
				}

				if (chatOne.userId !== ctx.session.user.id)
					throw new Error("UNAUTHORIZED");
				return await ctx.services.chat.sendMessage(
					input.content,
					chatOne,
					chatTwo,
					date
				);
			})
	});
}
