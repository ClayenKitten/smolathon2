import Template from "$lib/server/util/template";
import { EmailTemplate } from "..";

import register from "./register.hbs?raw";
export const registerTemplate = new EmailTemplate(
	"Регистрация",
	new Template<{ code: string }>(register)
);

import registerAlreadyExists from "./registerAlreadyExists.hbs?raw";
export const alreadyRegisteredTemplate = new EmailTemplate(
	"Попытка повторной регистрации",
	new Template(registerAlreadyExists)
);

import recoverPassword from "./recoverPassword.hbs?raw";
export const recoverPasswordTemplate = new EmailTemplate(
	"Восстановление аккаунта",
	new Template<{ code: string }>(recoverPassword)
);

import emailChange from "./emailChange.hbs?raw";
export const emailChangeTemplate = new EmailTemplate(
	"Смена почты",
	new Template<{ code: string }>(emailChange)
);

import emailChangeAlreadyExists from "./emailChangeAlreadyExists.hbs?raw";
export const emailChangeAlreadyExistsTemplate = new EmailTemplate(
	"Смена почты",
	new Template(emailChangeAlreadyExists)
);
