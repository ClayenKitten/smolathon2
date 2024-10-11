import getUserRouter from "./user/index";
import getChatRouter from "./chat";
import { router } from "./trpc";
import getS3Router from "./s3";
import getPostRouter from "./post";
import getEventRouter from "./event";

const appRouter = router({
	user: getUserRouter(),
	chat: getChatRouter(),
	s3: getS3Router(),
	post: getPostRouter(),
	event: getEventRouter()
});

type AppRouter = typeof appRouter;

export { appRouter as default, type AppRouter };
