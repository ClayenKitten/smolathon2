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
	id: z.number().min(1),
	email: z.string().min(1),
	info: z.string().min(1).nullable(),
	name: z.string().min(1),
	personalSite: z.string().min(1).nullable(),
	phone: z.string().min(1).nullable(),
	surname: z.string().min(1).nullable(),
	telegram: z.string().min(1).nullable(),
	vk: z.string().min(1).nullable(),
	workplace: z.string().min(1).nullable(),
	isCreator: z.boolean()
});
export type ProfileInfo = TypeOf<typeof ProfileInfo>;
