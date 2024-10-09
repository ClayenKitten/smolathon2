import { protectedProcedure, router } from "./trpc";
import { z } from "zod";

export default function getProductRouter() {
	return router({
		/** Gets list of all products owned by the user. */
		getOwnedProducts: protectedProcedure
			.input(z.object({ userId: z.number() }))
			.query(async ({ ctx }) => {
				return await ctx.services.product.getOwnedProducts(ctx.session.user);
			})
	});
}
