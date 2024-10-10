<script lang="ts">
	//export let post: "postPreview";
</script>

<article>
	<div class="video">
		<video controls width="">
			<source src="my-video.mp4" type="video/mp4" />
			<source src="my-video.webm" type="video/webm" />
		</video>
		<div class="attachment_list">
			<span>3 фото</span>
			<span>2 видео</span>
			<span>6 аудио</span>
		</div>
	</div>
	<audio controls src="hi-alice.mp3"> </audio>
	<div class="post">
		<span>Каждый в этой жизни ценен.</span>
		<div class="user">
			<img src="/Icons/Favorite_border.svg" alt="" />
			<span>Radonezh</span>
		</div>
	</div>
	<footer>
		<div class="reaction">
			<div class="like">
				<img src="/Icons/Favorite_border.svg" alt="" />
				<span>12</span>
			</div>
			<div class="comment">
				<img src="/Icons/Chat_bubble.svg" alt="" />
				<span>12</span>
			</div>
		</div>
		<div class="repost">
			<img src="/Icons/Ios_share.svg" alt="" />
			<span>12</span>
		</div>
	</footer>
</article>

<style lang="scss">
	article {
		width: 332px;
		display: flex;
		flex-direction: column;
		color: var(--black);
		border: 1px solid var(--black);
		.video {
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
</style>
