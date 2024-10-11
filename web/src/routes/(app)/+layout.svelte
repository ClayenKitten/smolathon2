<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "$lib/components/Button.svelte";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
</script>

<div id="app">
	<header>
		<img src="/LogoFull.svg" alt="" />
		<nav>
			<a href="/">Лента</a>
			<a href="/events">Мероприятия</a>
			<a href="/info">Витрина возможностей</a>
			<div class="search">
				<input placeholder="Поиск по работам" />
				<img src="/Icons/Search.svg" alt="" />
			</div>
		</nav>
		<menu>
			{#if data.user}
				<img class="email" src="/Icons/Email.svg" alt="" />
				<a href={`/user/${data.user.id}`}>
					<img src={`/s3/avatar/${data.user.id}`} alt="Профиль" />
				</a>
			{:else}
				<div class="login">
					<Button
						kind="primary"
						text="Войти"
						on:click={() => goto("/auth/sign_in")}
					/>
				</div>
			{/if}
		</menu>
	</header>
	<section>
		<slot />
	</section>
</div>

<style lang="scss">
	header {
		display: flex;
		align-items: center;
		height: 83px;
		padding: 0 20px;
		border-bottom: 1px solid var(--black);
		img {
			height: 20px;
		}
		nav {
			display: flex;
			align-items: center;
			gap: 32px;
			margin: 0 40px;
			a {
				color: var(--black);
				font: var(--T-bold);
				text-decoration: none;
			}
			.search {
				position: relative;
				img {
					position: absolute;
					top: 11px;
					right: 15px;
				}
				&:hover {
					img {
						filter: var(--filter-blue);
					}
				}
			}
		}
		input {
			padding: 8px 12px;
			height: 40px;
			width: 527px;
		}
		menu {
			display: flex;
			margin-left: auto;
			align-items: center;
			gap: 16px;
			img {
				width: 40px;
				height: 40px;
				border-radius: 100px;
			}
			.email {
				width: 20px;
				height: 16px;
				filter: var(--filter-blue);
			}
			.login > :global(button) {
				width: 77px;
				height: 40px;
				padding: 0;
				font: var(--T);
			}
		}
	}
</style>
