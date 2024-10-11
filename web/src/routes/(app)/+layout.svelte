<div id="app">
	<header>
		<img src="/LogoFull.svg" alt="" />
		<nav>
			<a href="/">Лента</a>
			<a href="/events">Мероприятия</a>
			<a href="/info">Витрина возможностей</a>
		</nav>
		<a><img /></a>
	</header>
	<section>
		<slot />
	</section>
</div>

<style lang="scss">
	header {
		display: flex;
		align-items: center;
		img {
			height: 40px;
		}
		nav {
			display: flex;
			gap: 32px;
			margin: 0 40px;
			a {
			}
		}
	}
</style>
