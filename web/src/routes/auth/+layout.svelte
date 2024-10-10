<div class="page">
	<slot />
	<div class="sidebar">
		<div class="header">
			<div class="logo">
				<img src="/Logo.svg" alt="logo" />
				<img class="icon" src="/Ukras1.svg" alt="" />
			</div>
			<span>Креативный сервис из Смоленска: соединяем таланты с идеями</span>
		</div>
		<div class="slogans">
			<div class="top">
				<img src="/Community/Trust.svg" alt="" />
				<img src="/Community/Society.svg" alt="" />
			</div>
			<div class="bottom">
				<img src="/Community/Progress.svg" alt="" />
				<img src="/Community/Cooperation.svg" alt="" />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.page {
		display: flex;
		height: 100%;
		justify-content: space-between;
		background-color: var(--white);
	}
	.sidebar {
		width: 476px;
		background-color: var(--primary-red);
		color: var(--white);
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding: 60px;
		.header {
			display: flex;
			flex-direction: column;
			gap: 20px;
			.logo {
				display: flex;
				gap: 32px;
				.icon {
					transition: transform 0.7s ease-in-out;
				}
				&:hover > .icon {
					transform: rotate(360deg);
				}
			}
		}
		.slogans {
			display: flex;
			flex-direction: column;
			gap: 42px;
			border-left: 3px solid var(--white);
			padding: 0 0 0 14px;
			height: 100%;
			position: relative;
			font: var(--H2);
			.top {
				display: flex;
				gap: 124px;
				align-items: start;
			}
			.bottom {
				position: absolute;
				left: 92px;
				bottom: 0;
				display: flex;
				gap: 124px;
				align-items: end;
			}
		}
	}
</style>
