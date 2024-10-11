<script lang="ts">
	export let kind: "primary" | "secondary" | "link" | "text" | "text-left" =
		"primary";
	export let text: string;
	export let disabled: boolean = false;
</script>

<button
	type="button"
	class:primary={kind === "primary"}
	class:secondary={kind === "secondary"}
	class:link={kind === "link"}
	class:text={kind === "text"}
	class:text-left={kind === "text-left"}
	on:click
	{disabled}
>
	{#if kind === "text-left"}
		<img
			src="/Icons/Arrow.svg"
			alt="button"
			class="arrow"
			style="transform:scale(-1, 1);"
		/>
	{/if}

	<span>
		{text}
	</span>

	{#if kind === "text"}
		<img src="/Icons/Arrow.svg" alt="button" class="arrow" />
	{/if}
</button>

<style lang="scss">
	button {
		height: 52px;
		padding: 14px 32px 14px 32px;
		align-content: center;
		font: var(--T-bold);

		&.primary {
			color: var(--white);
			background-color: var(--primary-blue);
			border: none;

			&:hover,
			&:focus {
				color: var(--black);
				background-color: var(--primary-yellow);
			}

			&:disabled {
				color: var(--grey-deep);
				background-color: var(--grey-light);
				cursor: not-allowed;
			}
		}
		&.secondary {
			color: var(--primary-blue);
			background-color: var(--white);
			border: 2px solid var(--primary-blue);

			&:hover,
			&:focus {
				color: var(--white);
				background-color: var(--primary-blue);
			}

			&:disabled {
				color: var(--grey-deep);
				background-color: var(--grey-light);
				cursor: not-allowed;
			}
		}
		&.link {
			color: var(--black);
			font: var(--B);
			text-decoration: underline;
			background-color: var(--white);
			border: none;
			&:hover {
				color: var(--primary-blue);
			}
			&:focus {
				color: var(--primary-blue);
			}
		}
		&.text,
		&.text-left {
			display: flex;
			align-items: center;
			gap: 10px;
			height: 24px;
			padding: 4px 0 4px 0;
			color: var(--primary);
			background-color: var(--main-bg);
			border: none;

			& img {
				filter: invert(25%) sepia(60%) saturate(2103%) hue-rotate(179deg)
					brightness(99%) contrast(94%);
			}

			&:hover {
				color: var(--secondary);
				fill: var(--secondary);
				img {
					filter: invert(77%) sepia(39%) saturate(283%) hue-rotate(161deg)
						brightness(100%) contrast(90%);
				}
			}

			&:focus {
				color: var(--primary);
				img {
					filter: invert(25%) sepia(60%) saturate(2103%) hue-rotate(179deg)
						brightness(99%) contrast(94%);
				}
			}

			&:disabled {
				color: var(--text-note);
				cursor: not-allowed;
				img {
					filter: invert(82%) sepia(8%) saturate(41%) hue-rotate(316deg)
						brightness(87%) contrast(98%);
				}
			}
		}
	}
</style>
