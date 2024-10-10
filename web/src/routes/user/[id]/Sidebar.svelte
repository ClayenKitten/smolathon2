<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import type { ProfileInfo } from "$lib/models";

	export let profile: ProfileInfo;
</script>

<aside>
	<header>
		<img src={`/s3/avatar/${profile.id}`} alt="" />
		<h2>{profile.name} {profile.surname}</h2>
		<button on:click={() => {}}>Подписаться</button>
	</header>
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
	<Button text="Написать" kind="primary" />
	<Button text="Поддержать художника" kind="secondary" />
	<a>Стать креатором</a>
</aside>

<style lang="scss">
	aside {
		display: flex;
		flex-direction: column;
	}
</style>
