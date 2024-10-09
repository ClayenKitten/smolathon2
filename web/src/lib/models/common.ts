import { z, type TypeOf } from "zod";

// Общие модели. Встроенные органичения на почту, пароль и т.п.

/** Email provided by user. */
export const Email = z.string().email().max(254);
export type Email = TypeOf<typeof Email>;

/** Password of user account. */
export const Password = z.string().min(8).max(128);
export type Password = TypeOf<typeof Password>;

/** First or last name of the user. */
export const Name = z.string().min(1).max(128);
export type Name = TypeOf<typeof Name>;

/** Code or token generated by server. */
export const Code = z.string().min(1);
export type Code = TypeOf<typeof Code>;

/** Url string. */
export const Url = z.string().url();
export type Url = TypeOf<typeof Url>;

/** Numerical id. */
export const Id = z.number().int().nonnegative();
export type Id = TypeOf<typeof Id>;

/** Text message model */
export const ChatMessage = z.string().min(1).max(8192);
export type ChatMessage = TypeOf<typeof ChatMessage>;