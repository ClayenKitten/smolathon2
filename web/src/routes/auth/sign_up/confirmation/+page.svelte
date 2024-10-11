<script lang="ts">
	import type { PageData } from "./$types";
</script>

<main>
	<div class="header">
		<img src="/Register.svg" alt="" />
	</div>
	<div class="info">
		<div class="confirmed">
			<span> Регистрация подтверждена </span>
			<img src="/Confirmed.svg" alt="" />
		</div>
		<a href="/auth/sign_in" class="button">Войти</a>
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		gap: 60px;
		color: var(--black);
		background-color: var(--white);
		padding: 60px 200px 0px 125px;
		text-align: center;
		.info {
			display: flex;
			flex-direction: column;
			gap: 32px;
			font: var(--T);
			.confirmed {
				display: flex;
				flex-direction: column;
				gap: 20px;
				font: var(--T-bold);
				img {
					height: 116px;
				}
			}
		}
	}
	a {
		height: 52px;
		padding: 14px 32px 14px 32px;
		align-content: center;
		font: var(--T-bold);
		text-decoration: none;
		color: var(--white);
		background-color: var(--primary-blue);
		border: none;

		&:hover {
			color: var(--black);
			background-color: var(--primary-yellow);
		}

		&:focus {
			color: var(--black);
			background-color: var(--primary-yellow);
		}
	}
</style>
