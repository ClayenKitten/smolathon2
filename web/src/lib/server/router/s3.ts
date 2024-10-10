import { publicProcedure, router } from "./trpc";
import { z } from "zod";

/** File assets management. */
export default function getS3Router() {
	return router({
		/** Checks if provided S3 object can be fetched or updated. */
		authorize: publicProcedure
			.input(
				z.object({
					method: z.union([z.literal("GET"), z.literal("PUT")]),
					prefix: z.string(),
					id: z.string()
				})
			)
			.query(({ ctx, input }) => {
				// At the moment, S3 only includes publically available files, but private ones may occur later.
				if (input.method === "GET") return true;
				if (input.method === "PUT") {
					if (!ctx.session) return false;
					// TODO: check that avatar id matches user id
					if (input.prefix === "avatar") return false;
					// TODO: check that attacment id matches user id
					if (input.prefix === "attachment") return false;
					return false;
				}
				return true;
			})
	});
}
