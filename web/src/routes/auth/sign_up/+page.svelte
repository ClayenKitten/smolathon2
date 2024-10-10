<script lang="ts">
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import { z } from "zod";

	import { superForm, defaults } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";

	const signUpSchema = z.object({
		firstName: z
			.string()
			.min(1, "! Это поле не должно быть пустым")
			.max(128, "! Слишком длинное имя"),
		lastName: z
			.string()
			.min(1, "! Это поле не должно быть пустым")
			.max(128, "! Слишком длинное имя"),
		email: z
			.string()
			.email("! Неверный формат почты")
			.max(128, "! Слишком длинный адрес"),
		password: z
			.string()
			.min(8, "! Пароль должен содержать хотя бы 8 символов")
			.max(128, "! Слишком длинный пароль"),
		repeat_password: z.string()
	});

	const { form, errors, enhance, validateForm } = superForm(
		defaults(zod(signUpSchema)),
		{
			SPA: true,
			validators: zod(signUpSchema),
			async onChange(event) {
				valid =
					(await validateForm()).valid &&
					$form.password === $form.repeat_password;
			}
		}
	);

	async function create() {
		await api($page).user.account.register.mutate({
			email: $form.email,
			firstName: $form.firstName,
			lastName: $form.lastName,
			password: $form.password
		});
		submitted = true;
	}

	function returning() {
		submitted = false;
	}

	let submitted = false;
	let valid = false;
</script>

<main>
	<div class="header">
		<img src="/Register.svg" alt="" />
	</div>
	{#if submitted === false}
		<form use:enhance>
			<div class="inputs">
				<label class="input" for={undefined}>
					<Input
						type="text"
						placeholder="Имя*"
						bind:value={$form.firstName}
						required
						invalid={$errors.firstName ? true : false}
					/>
					<div class="warning">
						{#if $errors.firstName}<span class="error">{$errors.firstName}</span
							>{/if}
					</div>
				</label>
				<label class="input" for={undefined}>
					<Input
						type="text"
						placeholder="Фамилия"
						bind:value={$form.lastName}
						invalid={$errors.lastName ? true : false}
					/>
					<div class="warning">
						{#if $errors.lastName}<span class="error">{$errors.lastName}</span
							>{/if}
					</div>
				</label>
				<label class="input" for={undefined}>
					<Input
						type="email"
						placeholder="Почта*"
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
						placeholder="Пароль*"
						bind:value={$form.password}
						required
						invalid={$errors.password ? true : false}
					/>
					<div class="warning">
						{#if $errors.password}<span class="error">{$errors.password}</span
							>{/if}
					</div>
				</label>
				<label class="input" for={undefined}>
					<Input
						type="password"
						placeholder="Повторите пароль*"
						bind:value={$form.repeat_password}
						required
						invalid={$form.password !== $form.repeat_password ||
						$errors.password
							? true
							: false}
					/>
					<div class="warning">
						{#if $form.password !== $form.repeat_password}<span class="error"
								>Пароли не совпадают</span
							>{/if}
					</div>
				</label>
			</div>
			<div class="submit">
				<Button
					text="Зарегистрироваться"
					kind="primary"
					on:click={create}
					disabled={!valid}
				/>
				<div class="links">
					<a href="/auth/sign_in" class="button">Войти</a>
				</div>
			</div>
		</form>
	{:else}
		<div class="submitted">
			<span>Регистрация пока не подтверждена</span>
			<div class="info">
				<img src="/Unconfirmed.svg" alt="" />
				<span
					>На вашу почту была отправленна ссылка, перейдите по ней, чтобы
					подтвердить регистрацию.</span
				>
			</div>
			<Button
				text="Сменить адрес электронной почты"
				kind="link"
				on:click={returning}
			/>
		</div>
	{/if}
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		gap: 52px;
		color: var(--black);
		background-color: var(--white);
		padding: 60px 200px 0px 125px;
	}
	form {
		display: flex;
		flex-direction: column;
		color: var(--text-note);
		gap: 8px;
		.submit {
			display: flex;
			flex-direction: column;
			text-align: center;
			gap: 20px;
			.links {
				align-items: center;
			}
		}
	}
	.inputs {
		display: flex;
		flex-direction: column;
		gap: 8px;
		.error {
			color: var(--error);
			font: var(--A);
		}
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
	.submitted {
		display: flex;
		flex-direction: column;
		gap: 20px;
		text-align: center;
		font: var(--T-bold);
		color: var(--black);
		width: 402px;
		img {
			height: 116px;
		}
		.info {
			display: flex;
			flex-direction: column;
			gap: 32px;
			font: var(--T);
		}
	}
</style>
