import { z, type TypeOf } from "zod";

export const Attachment = z.object({
	id: z.string(),
	type: z.union([z.literal("image"), z.literal("video"), z.literal("audio")])
});
export type Attachment = TypeOf<typeof Attachment>;

export const PostPreview = z.object({
	header: z.string(),
	date: z.date(),
	userId: z.number(),
	userName: z.string(),
	attachments: z.array(Attachment)
});
export type PostPreview = TypeOf<typeof PostPreview>;

export const CreatePost = z.object({
	header: z.string(),
	content: z.string(),
	attachments: Attachment,
	tags: z.array(z.number())
});
export type CreatePost = TypeOf<typeof CreatePost>;

export const Tag = z.object({
	id: z.number(),
	name: z.string()
});
export type Tag = TypeOf<typeof Tag>;
