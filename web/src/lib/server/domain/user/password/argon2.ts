import type PasswordService from "./index";
import argon2 from "argon2"; // алгоритм для хэширования

export default class Argon2PasswordService implements PasswordService {
	async hash(password: string): Promise<string> {
		return await argon2.hash(password);
	}

	async verify(password: string, hash: string): Promise<boolean> {
		return await argon2.verify(hash, password);
	}
}
