import { z } from "zod";
import { publicProcedure, router } from "./trpc";

const appRouter = router({
	hello: publicProcedure
		.input(z.object({ name: z.string().min(1).max(32) }))
		.query(({ input }) => {
			return `Hello, ${input.name}!`;
		})
});

type AppRouter = typeof appRouter;

export { appRouter as default, type AppRouter };
