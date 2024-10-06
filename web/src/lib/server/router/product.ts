import * as m from "$lib/models";
import { User } from "../domain/user";
import type Result from "../util/result";
import { protectedProcedure, router } from "./trpc";
import { z } from "zod";

export default function getProductRouter() {
	return router({
		/** Gets list of all cources the user is enrolled to. */
		getOwnedProducts: protectedProcedure
			.input(z.object({ userId: z.number() }))
			.query(async ({ ctx }) => {
				return await ctx.services.product.getOwnedProducts(ctx.session.user);
			})
	});
}
