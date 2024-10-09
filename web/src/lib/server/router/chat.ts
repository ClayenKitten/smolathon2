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
			})
	});
}
