<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Button from "./Button.svelte";
	import type { CreatePost } from "$lib/models";

	export let tags: { id: number; name: string }[];

	let header: string = "";
	let content: string = "";
	let selectedTags: number[] = [];
	let files: FileList;
	$: images = files ? filesIntoDataUrls(files) : [];

	const toggleTag = (id: number) => {
		let index = selectedTags.indexOf(id);
		if (index !== -1) {
			selectedTags.splice(index, 1);
		} else {
			selectedTags.push(id);
		}
		selectedTags = selectedTags;
	};

	async function filesIntoDataUrls(files: FileList) {
		let urls: string[] = [];
		for (const file of Array.from(files)) {
			urls.push((await reader(file)).result as string);
		}
		return urls;
	}

	const reader = (file: File) =>
		new Promise<FileReader>((resolve, reject) => {
			const fr = new FileReader();
			fr.onload = () => resolve(fr);
			fr.onerror = err => reject(err);
			fr.readAsDataURL(file);
		});

	let dispatch = createEventDispatcher<{
		post: CreatePost;
		close: void;
	}>();

	const post = () => {
		dispatch("post", {
			header,
			content,
			attachments: [] as any,
			tags: selectedTags
		});
	};
</script>

<div class="backdrop">
	<article>
		<section>
			<label class="title">
				<h2>Заголовок *</h2>
				<input bind:value={header} placeholder="Введите заголовок" />
			</label>
			<label class="files">
				<input type="file" bind:files multiple />
				<img src="/Files.svg" alt="Добавить файлы" />
			</label>
		</section>
		<section>
			<label class="text">
				<h2>Текст</h2>
				<textarea bind:value={content} placeholder="Введите текст" />
			</label>
		</section>
		<section class="tags">
			<h2>Выберите теги</h2>
			<ul>
				{#each tags as tag}
					<button
						class:enabled={selectedTags.includes(tag.id)}
						on:click={() => toggleTag(tag.id)}
					>
						{tag.name}
					</button>
				{/each}
			</ul>
		</section>
		<Button text="Опубликовать" on:click={post} disabled={header === ""} />
		{#await images then images}
			{#each images as image}
				<img src={image} alt="" />
			{/each}
		{/await}
	</article>
	<button class="close" on:click={() => dispatch("close")}>
		<img src="/Icons/Close.svg" alt="Закрыть" />
	</button>
</div>

<style lang="scss">
	article {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 796px;
		overflow-y: auto;
		background-color: white;
		padding: 32px 40px;
		gap: 20px;
	}
	section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		input,
		textarea {
			border: 1px solid var(--black);
			padding: 16px 12px;
			font: var(--T);
			resize: none;
			&::placeholder {
				font: var(--T);
				color: var(--grey-deep);
			}
		}
		&:first-of-type {
			gap: 100px;
		}
		label.title {
			flex: 1;
		}
		label.title > input {
			width: 100%;
		}
		label.files > input {
			display: none;
		}

		label.text,
		label.text > textarea {
			width: 100%;
		}
		&.tags {
			flex-direction: column;
			justify-content: start;
			ul {
				display: flex;
				flex-wrap: wrap;
				gap: 16px;
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
	}
	.backdrop {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding-top: 52px;
		background: #00000066;
		backdrop-filter: blur(4px);
	}
	.close {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--black);
		position: absolute;
		right: 40px;
		top: 24px;
		height: 32px;
		width: 32px;
		img {
			height: 24px;
			width: 24px;
		}
	}
	h2 {
		color: var(--grey-deep);
		font: var(--A);
		margin-bottom: 12px;
	}
</style>
