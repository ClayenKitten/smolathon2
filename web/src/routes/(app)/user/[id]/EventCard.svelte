<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import type { Attachment, PostPreview, ProfileInfo } from "$lib/models";
	import Content from "./Content.svelte";

	function create() {}
	export let post: PostPreview;
</script>

<article>
	<Content {post} />
	<div class="info">
		<div class="date_time">
			<div class="date">
				<img src="/Icons/Calendar_today.svg" alt="" />
				<span>4 августа</span>
			</div>
			<div class="time">
				<img src="/Icons/Access_time.svg" alt="" />
				<span>12:00</span>
			</div>
		</div>
		<div class="address">
			<img src="/Icons/Place.svg" alt="" />
			<span>Ленинградский проспект 3, д. 6</span>
		</div>
		<div class="header">
			Мероприятие, посвящённое культурной столице и её историческому следу.
		</div>
		<div class="host">
			<img src={`/s3/avatar/${post.userId}`} alt="" />
			<span>{post.userName}</span>
		</div>
		<div class="buttons">
			<button on:click={create} class="primary">Хочу пойти</button>
			<button on:click={create} class="secondary">Пойду как креатор</button>
		</div>
	</div>
</article>

<style lang="scss">
	article {
		width: 332px;
		display: flex;
		flex-direction: column;
		color: var(--black);
		background-color: var(--white);
		border: 1px solid var(--black);
		.info {
			padding: 12px 16px;
			display: flex;
			flex-direction: column;
			gap: 8px;
		}
		.date_time {
			display: flex;
			gap: 12px;
			font: var(--A);
			.date {
				display: flex;
				gap: 4px;
				align-items: center;
			}
			.time {
				display: flex;
				gap: 4px;
				align-items: center;
			}
		}
		.address {
			display: flex;
			gap: 4px;
			align-items: center;
			font: var(--A);
		}
		.info {
			font: var(--T);
		}
		.host {
			height: 24px;
			display: flex;
			gap: 8px;
			align-items: center;
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
	.buttons {
		display: flex;
		justify-content: space-between;
		button {
			font: var(--T);
			border: none;
			color: var(--black);
			padding: 4px 8px;
			&.primary {
				background-color: var(--primary-blue);
				color: var(--white);
				&:hover {
					background-color: var(--primary-yellow);
					color: var(--black);
				}
				&:active {
					background-color: var(--primary-yellow);
					color: var(--black);
				}
			}
			&.secondary {
				background-color: var(--primary-yellow);
				color: var(--black);
				&:hover {
					background-color: var(--primary-blue);
					color: var(--white);
				}
				&:active {
					background-color: var(--primary-blue);
					color: var(--white);
				}
			}
		}
	}
	img {
		width: 16px;
		width: 16px;
		filter: var(--filter-black);
	}
</style>
