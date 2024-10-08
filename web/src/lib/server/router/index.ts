import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import getUserRouter from "./user/index";
import getProductRouter from "./product";

const appRouter = router({
	user: getUserRouter(),
	product: getProductRouter()
});

type AppRouter = typeof appRouter;

export { appRouter as default, type AppRouter };
