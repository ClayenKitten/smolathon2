import { z, type TypeOf } from "zod";
import { Email, Name, Password, Code, Url } from "./common";

// Типы связанные с User. Определение их структуры через константы

export const Registration = z.object({
	email: Email,
	name: Name,
	surname: Name.nullable(),
	password: Password
});
export type Registration = TypeOf<typeof Registration>;

export const RegistrationConfirmation = z.object({ code: Code });
export type RegistrationConfirmation = TypeOf<typeof RegistrationConfirmation>;

export const Login = z.object({
	email: Email,
	// Don't check minimal password length when logging in.
	password: z.string().min(1).max(128)
});
export type Login = TypeOf<typeof Login>;

export const Recovery = z.object({ email: Email });
export type Recovery = TypeOf<typeof Recovery>;

export const RecoveryConfirmation = z.object({
	code: Code,
	newPassword: Password
});
export type RecoveryConfirmation = TypeOf<typeof RecoveryConfirmation>;

// по профилю. Нужно ли вообще пока - вопрос
export const ProfileInfo = z.object({
	email: z.string(),
	info: z.string().nullable(),
	name: z.string(),
	personalSite: z.string().nullable(),
	phone: z.string().nullable(),
	profilePic: z.string().nullable(),
	surname: z.string().nullable(),
	telegram: z.string().nullable(),
	vk: z.string().nullable(),
	workplace: z.string().nullable()
});
export type ProfileInfo = TypeOf<typeof ProfileInfo>;

export const ChangeProfileInfo = z
	.object({
		name: Name
	})
	.partial();
export type ChangeProfileInfo = TypeOf<typeof ChangeProfileInfo>;
