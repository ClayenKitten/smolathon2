<script lang="ts">
	import type { PageData } from "./$types";
	import Sidebar from "./Sidebar.svelte";

	export let data: PageData;
</script>

<div>
	<Sidebar profile={data.profile} />
	TEST
</div>
