import { z, type TypeOf } from "zod";

export const PostPreview = z.object({
	header: z.string(),
	date: z.date(),
	userId: z.number(),
	userName: z.string()
});
export type PostPreview = TypeOf<typeof PostPreview>;

export const Attachment = z.object({
	id: z.string(),
	type: z.union([z.literal("image"), z.literal("video"), z.literal("audio")])
});
export type Attachment = TypeOf<typeof Attachment>;
