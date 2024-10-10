<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import { z } from "zod";

	import { superForm, defaults } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";

	const signInSchema = z.object({
		password: z.string().min(1, "! Пароль должен содержать хотя бы 1 символ"),
		email: z
			.string()
			.email("! Неверный формат почты")
			.max(128, "! Слишком длинный адрес")
	});

	const { form, errors, enhance, validateForm } = superForm(
		defaults(zod(signInSchema)),
		{
			SPA: true,
			validators: zod(signInSchema),
			async onChange(event) {
				valid = (await validateForm()).valid;
			}
		}
	);

	async function submit() {
		let result = await api($page).user.session.login.mutate({
			email: $form.email,
			password: $form.password
		});
		if (result.ok) {
			goto("/");
		} else {
			error = "! Неверный логин или пароль";
		}
		valid = (await validateForm()).valid;
	}

	let error = "";
	let valid = false;
</script>

<main>
	<form use:enhance>
		<div class="header">
			<img src="/Enter.svg" alt="" />
		</div>
		<div class="form">
			<div class="inputs">
				<label class="input" for={undefined}>
					<Input
						type="email"
						placeholder="Почта"
						bind:value={$form.email}
						required
						invalid={$errors.email ? true : false}
					/>
					<div class="warning">
						{#if $errors.email}<span class="error">{$errors.email}</span>{/if}
					</div>
				</label>
				<label class="input" for={undefined}>
					<Input
						type="password"
						placeholder="Пароль"
						bind:value={$form.password}
						required
						invalid={$errors.password ? true : false}
					/>
					<div class="warning">
						{#if error}
							<span class="error">{error}</span>
						{/if}
					</div>
				</label>
			</div>
			<div class="submit">
				<Button
					text="Войти"
					kind="primary"
					on:click={submit}
					disabled={!valid}
				/>
				<div class="links">
					<a href="/auth/recovery">Забыли пароль?</a>
					<a href="/auth/sign_up">Зарегистрироваться</a>
				</div>
			</div>
		</div>
	</form>
</main>

<style lang="scss">
	main {
		display: flex;
		flex: 1;
		color: var(--black);
		background-color: var(--white);
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 170px;
		background-color: var(--white);
		padding: 0px 200px 0px 125px;
	}
	.form {
		display: flex;
		flex-direction: column;
		color: var(--text-note);
		gap: 46px;
		.error {
			color: var(--error);
			font: var(--A);
		}
		.submit {
			display: flex;
			flex-direction: column;
			text-align: center;
			gap: 20px;
			.links {
				display: flex;
				justify-content: space-between;
				a {
					color: var(--black);
					font: var(--B);
					&:hover {
						color: var(--primary-blue);
					}
					&:focus {
						color: var(--primary-blue);
					}
				}
			}
		}
	}
	.inputs {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.input {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: left;
		gap: 2px;
		span {
			font: var(--A);
			color: var(--black);
		}
		.warning {
			height: 24px;
		}
	}
</style>
