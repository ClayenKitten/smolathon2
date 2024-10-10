import { publicProcedure, router } from "./trpc";
import { z } from "zod";

/** File assets management. */
export default function getS3Router() {
	return router({
		/** Checks if provided S3 object can be fetched or updated. */
		authorize: publicProcedure
			.input(
				z.object({
					path: z.string(),
					method: z.union([z.literal("GET"), z.literal("PUT")])
				})
			)
			.query(({ ctx, input }) => {
				// TODO: validation
				return true;
			})
	});
}
