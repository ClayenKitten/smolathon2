<script lang="ts">
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import { z } from "zod";
	import { superForm, defaults } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";

	const recoverySchema = z.object({
		email: z
			.string()
			.email("! Неверный формат почты")
			.max(128, "! Слишком длинный адрес")
	});

	const { form, errors, enhance, validateForm } = superForm(
		defaults(zod(recoverySchema)),
		{
			SPA: true,
			validators: zod(recoverySchema),
			async onChange(event) {
				valid = (await validateForm()).valid;
			}
		}
	);

	async function submit() {
		await api($page).user.account.recover.mutate({ email: $form.email });
		confirmed = true;
	}

	let confirmed = false;
	let valid = false;
</script>

<main>
	<div class="header">
		<img src="/Password.svg" alt="" />
	</div>
	{#if confirmed === false}
		<form use:enhance>
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
			</div>
			<div class="submit">
				<Button
					text="Продолжить"
					kind="primary"
					on:click={submit}
					disabled={!valid}
				/>
				<div class="links">
					<a href="/auth/sign_in">Вернуться</a>
				</div>
			</div>
		</form>
	{:else}
		<div class="submitted">
			<div class="info">
				<span>
					Письмо с инструкциями по смене пароля отправлено на указанную почту.
				</span>
				<a href="/auth/sign_in" class="button_primary">К странице входа</a>
			</div>
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
	.buttons {
		display: flex;
		justify-content: space-between;
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
