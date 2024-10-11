<script lang="ts">
	import type { Attachment, PostPreview, ProfileInfo } from "$lib/models";

	export let post: PostPreview;
	$: image = post.attachments.find(
		x => x.type === "image" || x.type === "video"
	);
	$: audio = post.attachments.find(x => x.type === "audio");
</script>

{#if image !== undefined}
	<div class="image">
		<!-- svelte-ignore a11y-media-has-caption -->
		{#if image.type === "video"}
			<video controls width="">
				<source src={`/s3/attachment/${image.id}`} type="video/mp4" />
			</video>
		{:else if image.type === "image"}
			<img src={`/s3/attachment/${image.id}`} alt="" />
		{/if}
		<div class="attachment_list">
			<span>{post.attachments.filter(x => x.type === "image").length} фото</span
			>
			<span
				>{post.attachments.filter(x => x.type === "video").length} видео</span
			>
			<span
				>{post.attachments.filter(x => x.type === "audio").length} аудио</span
			>
		</div>
	</div>
{/if}
{#if audio !== undefined}
	<audio controls src={`/s3/attachment/${audio.id}`}> </audio>
{/if}

<style lang="scss">
	.image {
		position: relative;
		background-color: var(--white);
		width: 100%;
		border-bottom: 1px solid var(--black);
		&:hover {
			.attachment_list {
				position: absolute;
				top: 0;
				padding: 10px 0px 20px 16px;
				width: 100%;
				display: flex;
				gap: 12px;
				background-image: linear-gradient(#0000004d, #00000000);
				span {
					padding: 4px 8px;
					color: var(--white);
					background-color: var(--primary-blue);
				}
			}
		}
		video {
			width: 100%;
			border-bottom: 1px solid var(--black);
		}
		.attachment_list {
			display: none;
		}
	}
	audio {
		width: 100%;
		border-bottom: 1px solid var(--black);
	}
</style>
