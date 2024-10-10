<script lang="ts">
	export let placeholder: string;
	export let value: string | null | undefined;
	export let type: "text" | "email" | "password" = "text";

	export let invalid: boolean = false;
	export let required: boolean = false;

	export let autocomplete: string | undefined = undefined;
</script>

<label class={invalid ? "invalid" : ""}>
	{#if type === "text"}
		<input
			type="text"
			bind:value
			{placeholder}
			{required}
			{autocomplete}
			on:input
			on:change
		/>
	{:else if type === "email"}
		<input
			type="email"
			bind:value
			class={invalid ? "invalid" : ""}
			{placeholder}
			{required}
			{autocomplete}
			on:input
			on:change
		/>
	{:else if type === "password"}
		<input
			type="password"
			bind:value
			class={invalid ? "invalid" : ""}
			{placeholder}
			{required}
			{autocomplete}
			on:input
			on:change
		/>
	{/if}
	<span>{placeholder}</span>
</label>

<style lang="scss">
	label {
		height: 52px;
		display: flex;
		gap: 4px;
		flex-direction: column-reverse;
		justify-content: center;
		background: var(--white);
		border: none;
		border-left: 1px solid var(--black);
		padding: 16px 24px 16px 24px;
	}
	input {
		width: var(--input-width, 292px);
		color: var(--black);
		background: none;
		border: none;
		font: var(--B);
		&::placeholder {
			color: var(--grey-deep);
			font: var(--B);
		}
		&:placeholder-shown + span {
			display: none;
		}
		&:focus {
			border: none;
			outline: 0;
			&::placeholder {
				color: transparent;
			}
			+ span {
				display: initial;
			}
		}
	}
	span {
		color: var(--grey-deep);
		font: var(--A);
	}
	.invalid {
		border-color: var(--error);
	}
</style>
