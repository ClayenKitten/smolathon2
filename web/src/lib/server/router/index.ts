import getUserRouter from "./user/index";
import getProductRouter from "./product";
import getChatRouter from "./chat";
import { router } from "./trpc";

const appRouter = router({
	user: getUserRouter(),
	product: getProductRouter(),
	chat: getChatRouter()
});

type AppRouter = typeof appRouter;

export { appRouter as default, type AppRouter };
