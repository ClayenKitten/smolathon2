<script lang="ts">
	import type { Attachment, PostPreview, ProfileInfo } from "$lib/models";
	import Content from "./Content.svelte";

	export let post: PostPreview;
</script>

<article>
	<Content {post} />
	<div class="post">
		<span>{post.header}</span>
		<a class="user" href="/user/{post.userId}">
			<img src={`/s3/avatar/${post.userId}`} alt="" />
			<span>{post.userName}</span>
		</a>
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
				text-decoration: none;
				color: var(--black);
				&:hover {
					text-decoration: underline;
				}
				img {
					width: 24px;
					height: 24px;
					object-fit: cover;
				}
				span {
					font: var(--A);
				}
			}
		}
		footer {
			display: flex;
			justify-content: space-between;
			padding: 12px 16px;
			img {
				width: 24px;
				height: 24px;
				filter: var(--filter-black);
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
				filter: var(--filter-blue);
			}
		}
		&:active {
			color: var(--primary-blue);
			img {
				filter: var(--filter-blue);
			}
		}
	}
</style>
