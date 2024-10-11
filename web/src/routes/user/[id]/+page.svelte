<script lang="ts">
	import type { PageData } from "./$types";
	import Sidebar from "./Sidebar.svelte";
	import Card from "./Card.svelte";

	export let data: PageData;
</script>

<div>
	<Sidebar profile={data.profile} />
	TEST
	{#each data.posts as post}
		<Card {post} />
	{/each}
</div>
