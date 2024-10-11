import { z, type TypeOf } from "zod";
import { Attachment } from "./post";

export const EventPreview = z.object({
	header: z.string(),
	date: z.string().nullable(),
	userId: z.number(),
	userName: z.string(),
	attachments: z.array(Attachment),
	address: z.string().nullable()
});
export type EventPreview = TypeOf<typeof EventPreview>;
