<script lang="ts">
	import type { Attachment, PostPreview, ProfileInfo } from "$lib/models";

	export let post: PostPreview;
	$: image = post.attachments.find(
		x => x.type === "image" || x.type === "video"
	);
	$: audio = post.attachments.find(x => x.type === "audio");
</script>

<article>
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
				<span
					>{post.attachments.filter(x => x.type === "image").length} фото</span
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
	<div class="post">
		<span>{post.header}</span>
		<div class="user">
			<img src={`/s3/avatar${post.userId}`} alt="" />
			<span>{post.userName}</span>
		</div>
	</div>
	<footer>
		<div class="reaction">
			<button class="like">
				<img src="/Icons/Favorite_border.svg" alt="" />
				<span>12</span>
			</button>
			<button class="comment">
				<img src="/Icons/Chat_bubble.svg" alt="" />
				<span>12</span>
			</button>
		</div>
		<button class="repost">
			<img src="/Icons/Ios_share.svg" alt="" />
			<span>12</span>
		</button>
	</footer>
</article>

<style lang="scss">
	article {
		width: 332px;
		display: flex;
		flex-direction: column;
		color: var(--black);
		background-color: var(--white);
		border: 1px solid var(--black);
		.image {
			position: relative;
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
		.post {
			display: flex;
			flex-direction: column;
			gap: 8px;
			padding: 12px 16px;
			border-bottom: 1px solid var(--black);
			span {
				font: var(--T);
			}
			.user {
				height: 24px;
				display: flex;
				gap: 8px;
				align-items: center;
				img {
					width: 24px;
				}
				span {
					font: var(--A);
				}
			}
		}
		footer {
			display: flex;
			gap: 109px;
			padding: 12px 16px;
			img {
				width: 24px;
				height: 24px;
			}
			.reaction {
				display: flex;
				gap: 16px;
				.like {
					display: flex;
					gap: 4px;
					align-items: center;
				}
				.comment {
					display: flex;
					gap: 4px;
					align-items: center;
				}
			}
			.repost {
				display: flex;
				gap: 4px;
				align-items: center;
			}
		}
	}
	button {
		border: none;
		background-color: var(--white);
		&:hover {
			color: var(--primary-blue);
			img {
				filter: invert(65%) sepia(16%) saturate(571%) hue-rotate(153deg)
					brightness(92%) contrast(87%);
			}
		}
		&:active {
			color: var(--primary-blue);
			img {
				filter: invert(65%) sepia(16%) saturate(571%) hue-rotate(153deg)
					brightness(92%) contrast(87%);
			}
		}
	}
</style>
