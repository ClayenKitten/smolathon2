<script lang="ts">
	import type { PageData } from "./$types";
	import Sidebar from "./Sidebar.svelte";
	import Card from "./Card.svelte";
	import EventCard from "./EventCard.svelte";

	export let data: PageData;
</script>

<div>
	<Sidebar
		profile={data.profile}
		subscribers={data.subscribers}
		subscriptions={data.subscribtions}
	/>
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
	div {
		display: flex;
		height: 100%;
	}
	main {
		display: flex;
		gap: 16px;
		padding: 20px;
		> div {
			display: flex;
			flex-direction: column;
			gap: 16px;
			width: 332px;
		}
	}
</style>
