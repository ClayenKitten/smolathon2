<script lang="ts">
	import { goto, invalidateAll } from "$app/navigation";
	import { page } from "$app/stores";
	import api from "$lib/api";
	import Button from "$lib/components/Button.svelte";
	import type { ProfileInfo } from "$lib/models";

	export let user: ProfileInfo | null;
	export let profile: ProfileInfo;
	export let subscribers: number;
	export let subscriptions: number;
</script>

<aside>
	<header>
		<img src={`/s3/avatar/${profile.id}`} alt="" />
		<div>
			<span class="mentor">Открыт(а) к менторству</span>
			{#if profile.surname}
				<h2>{profile.name}<br />{profile.surname}</h2>
			{:else}
				<h2>{profile.name}</h2>
			{/if}
			<button class="subscribe" on:click={() => {}}>Подписаться</button>
		</div>
	</header>
	<ul class="subscribers">
		<li>
			<span>Подписки</span>
			<div>{subscriptions}</div>
		</li>
		<li>
			<span>Подписчики</span>
			<div>{subscribers}</div>
		</li>
	</ul>
	{#if profile.info}
		<section class="info">
			<h3>О себе</h3>
			<p>{profile.info}</p>
		</section>
	{/if}
	<section class="city">
		<h3>Город</h3>
		<span>Смоленск</span>
	</section>
	{#if profile.workplace}
		<section class="workplace">
			<h3>Работа</h3>
			<p>{profile.workplace}</p>
		</section>
	{/if}
	<section class="contacts">
		<h3>Контакты</h3>
		<ul>
			{#if profile.email}
				<li><a href={`mailto:${profile.email}`}>Email</a></li>
			{/if}
			{#if profile.telegram}
				<li><a href={profile.telegram}>Telegram</a></li>
			{/if}
			{#if profile.vk}
				<li><a href={profile.vk}>VK</a></li>
			{/if}
		</ul>
	</section>
	<section class="actions">
		{#if user && profile.id === user.id}
			<Button
				kind="primary"
				text="Выйти"
				on:click={async () => {
					await api($page).user.session.logout.mutate();
					await invalidateAll();
					await goto("/");
				}}
			/>
		{:else}
			{#if profile.isCreator}
				<a class="profi" href="https://profi.ru/">Заказать на profi.ru</a>
			{/if}
			<Button text="Написать" kind="primary" />
			{#if profile.isCreator}
				<Button text="Поддержать художника" kind="secondary" />
			{:else}
				<Button
					kind="secondary"
					text="Стать креатором"
					on:click={() =>
						(window.location.href =
							"https://docs.google.com/forms/d/e/1FAIpQLSeuLud6Amo7Fz88Y769MlplRuJQULeW8MxVSnZJrswbT6bvEg/viewform?usp=sf_link")}
				/>
			{/if}
		{/if}
	</section>
</aside>

<style lang="scss">
	aside {
		flex: 0 0 332px;
		display: flex;
		flex-direction: column;
		padding: 16px 20px;
		border: 1px solid var(--black);
		gap: 16px;
		header {
			display: flex;
			gap: 16px;
			img {
				width: 100px;
				height: 100px;
			}
			div {
				display: flex;
				flex-direction: column;
				justify-content: center;
				.mentor {
					font: var(--A);
					color: var(--black);
				}
				h2 {
					font: var(--H-huge);
					color: var(--black);
					margin-bottom: 2px;
				}
				.subscribe {
					font: var(--T);
					color: var(--primary-blue);
					border: 0;
					background-color: transparent;
					text-decoration: underline;
					text-align: left;
				}
			}
		}
		.subscribers {
			ul {
				display: flex;
				flex-direction: column;
			}
			li {
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid var(--grey-light);
				padding: 8px 0;
				&:first-of-type {
					border-top: 1px solid var(--grey-light);
				}
				> span {
					font: var(--T);
					color: var(--black);
				}
				> div {
					background-color: var(--primary-yellow);
					padding: 4px 8px;
					font: var(--A);
				}
			}
		}
		.actions {
			display: flex;
			flex-direction: column;
			gap: 16px;
		}
	}
	h3 {
		font: var(--A);
		color: var(--grey-deep);
		+ p {
			font: var(--A);
			color: var(--black);
		}
		+ span {
			font: var(--T);
			color: var(--black);
		}
		+ ul {
			list-style: none;
			li,
			a {
				font: var(--T);
				color: var(--black);
			}
		}
	}
</style>
