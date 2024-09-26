import type { Repositories } from "./repositories";

export default function createServices(repos: Repositories) {
	let s = {};
	// Example on how to add services:
	// addProp(s, "password", new Argon2PasswordService() as PasswordService);
	return s;
}
export type Services = ReturnType<typeof createServices>;
