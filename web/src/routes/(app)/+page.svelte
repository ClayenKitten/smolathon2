<script lang="ts">
	import type { PageData } from "./$types";
	import Card from "./user/[id]/Card.svelte";

	export let data: PageData;
	let subscribed = false;
</script>

<div class="lenta">
	<aside>
		<div class="buttons">
			<button
				class:subscribed={subscribed === false}
				on:click={() => (subscribed = false)}>Всё</button
			>
			<button
				class:subscribed={subscribed === true}
				on:click={() => (subscribed = true)}>Подписки</button
			>
		</div>
		<div class="tags">
			{#if !subscribed}
				<section>
					<span>Дизайн</span>
					<div class="group">
						<button>Графичекий дизайн</button>
						<button>UI/UX дизайн</button>
						<button>Иллюстрация</button>
						<button>Motion - дизайн</button>
					</div>
				</section>
				<section>
					<span>Звук</span>
					<div class="group">
						<button>Sound - дизайн</button>
					</div>
				</section>
				<section>
					<span>Сувениры</span>
					<div class="group">
						<button>Хэндмейд</button>
					</div>
				</section>
				<section>
					<span>Фото</span>
					<div class="group">
						<button>Фотосъёмка</button>
						<button>Видеосъёмка</button>
						<button>Творчество</button>
					</div>
				</section>
			{:else}{/if}
		</div>
	</aside>
	<main>
		<div>
			{#each data.posts.filter((_, i) => i % 3 === 0) as post}
				<Card {post} />
			{/each}
		</div>
		<div>
			{#each data.posts.filter((_, i) => i % 3 === 1) as post}
				<Card {post} />
			{/each}
		</div>
		<div>
			{#each data.posts.filter((_, i) => i % 3 === 2) as post}
				<Card {post} />
			{/each}
		</div>
	</main>
</div>

<style lang="scss">
	.lenta {
		display: flex;
		height: 100%;
		gap: 20px;
	}
	aside {
		width: 194px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	main {
		display: flex;
		gap: 16px;
		> div {
			display: flex;
			flex-direction: column;
			gap: 16px;
			width: 332px;
		}
	}
	.buttons {
		display: flex;
		gap: 16px;
	}
	button {
		background-color: var(--white);
		padding: 8px 0;
		border: none;
		border-bottom: 2px solid var(--primary-blue);
		color: var(--primary-blue);
		&.subscribed {
			color: var(--black);
			border-bottom: 1px solid var(--black);
		}
	}
	.tags {
		display: flex;
		flex-direction: column;
		gap: 20px;
		section {
			display: flex;
			flex-direction: column;
			gap: 12px;
			.group {
				display: flex;
				flex-direction: column;
				gap: 12px;
				font: var(--T);
			}
		}
		span {
			color: var(--grey-deep);
			font: var(--A);
		}
		button {
			background-color: white;
			border: 1px solid var(--primary-yellow);
			padding: 8px 12px;
			font: var(--T);

			&.enabled {
				background-color: var(--primary-yellow);
			}
		}
	}
</style>
