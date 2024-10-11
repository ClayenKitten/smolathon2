<script lang="ts">
	import type { PageData } from "./$types";

	const datas = [
		{
			date: "1 марта - 1 мая 2023",
			heading: "Цвет настроения",
			content:
				"Участникам предлагается создать художественное произведение, отражающее их внутреннее состояние. Это может быть живопись, графика, скульптура, инсталляция или любое другое направление."
		},
		{
			date: "1 июня - 1 августа 2023",
			heading: "Вдохновение природой",
			content:
				"Путешествие на пленэр, набор художественных материалов, публикацию в арт-журнале."
		},
		{
			date: "1 сентября - 1 ноября 2023",
			heading: "Городские истории",
			content:
				"Участникам предлагается создать художественное произведение, отражающее жизнь в городе. Это может быть городская панорама, портрет горожанина, абстрактная композиция, передающая атмосферу мегаполиса."
		},
		{
			date: "15 февраля - 15 апреля 2023",
			heading: "Звуки города",
			content:
				"Участникам предлагается создать звуковой пейзаж города, используя реальные звуки. Это может быть городская симфония, шум улицы, звуки природы, которые встречаются в городском пространстве."
		},
		{
			date: "1 июля - 1 сентября 2023",
			heading: "Музыка для фильма",
			content:
				"Участникам предлагается создать музыкальное сопровождение к короткометражному фильму. Это может быть оркестровая партитура, электронная музыка, фоновая музыка, которая создает атмосферу и подчеркивает события."
		},
		{
			date: "1 ноября - 1 января 2024",
			heading: "Звуковая инсталляция",
			content:
				"Участникам предлагается создать звуковую инсталляцию, которая воздействует на посетителей на уровне звуковых ощущений. Это может быть интерактивная инсталляция, где звук изменяется в зависимости от действий зрителей, или просто звуковая среда, которая создает определенную атмосферу."
		},
		{
			date: "15 февраля - 15 апреля 2023",
			heading: "Дизайн будущего",
			content:
				"Участникам предлагается создать концепцию дизайна для объекта, который будет актуальным в будущем. Это может быть гаджет, транспорт, архитектурное сооружение, одежда или что-либо другое. Главное — показать креативность и видение будущего."
		},
		{
			date: "1 сентября - 1 ноября 2023",
			heading: "Ребрендинг классики",
			content:
				"Участникам предлагается разработать новый дизайн для известного бренда, продукта или логотипа. Цель — сохранить узнаваемость и добавить современности."
		},
		{
			date: "1 февраля - 1 апреля 2024",
			heading: "Дизайн для всех",
			content:
				"Участникам предлагается разработать дизайн, который будет доступен и удобен для людей с ограниченными возможностями. Это может быть мобильное приложение, сайт, интерфейс устройства или что-либо другое."
		}
	];
</script>

<main>
	<div class="column">
		{#each datas.filter((_, i) => i % 3 === 0) as data}
			<button class="opportunity">
				<div class="date">
					<img src="/Icons/Calendar_today.svg" alt="" />
					<span>{data.date}</span>
				</div>
				<div class="information">
					<div class="name">
						<span>{data.heading}</span>
					</div>
					<div class="content">
						<span>{data.content}</span>
					</div>
				</div>
			</button>
		{/each}
	</div>
	<div class="column">
		{#each datas.filter((_, i) => i % 3 === 1) as data}
			<button class="opportunity">
				<div class="date">
					<img src="/Icons/Calendar_today.svg" alt="" />
					<span>{data.date}</span>
				</div>
				<div class="information">
					<div class="name">
						<span>{data.heading}</span>
					</div>
					<div class="content">
						<span>{data.content}</span>
					</div>
				</div>
			</button>
		{/each}
	</div>
	<div class="column">
		{#each datas.filter((_, i) => i % 3 === 2) as data}
			<button class="opportunity">
				<div class="date">
					<img src="/Icons/Calendar_today.svg" alt="" />
					<span>{data.date}</span>
				</div>
				<div class="information">
					<div class="name">
						<span>{data.heading}</span>
					</div>
					<div class="content">
						<span>{data.content}</span>
					</div>
				</div>
			</button>
		{/each}
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		gap: 16px;
		padding: 20px;
		.column {
			display: flex;
			flex-direction: column;
			gap: 16px;
		}
	}
	.opportunity {
		width: 448px;
		padding: 16px 20px 20px 20px;
		border: 1px solid var(--black);
		display: flex;
		flex-direction: column;
		gap: 12px;
		text-align: left;
		background-color: var(--white);
		&:hover {
			border: 1px solid var(--primary-blue);
			color: var(--primary-blue);
			img {
				filter: var(--filter-blue);
			}
		}
		.date {
			display: flex;
			gap: 4px;
			align-items: center;
			span {
				font: var(--A);
			}
		}
		.information {
			display: flex;
			flex-direction: column;
			gap: 8px;
			.name {
				font: var(--T);
			}
			.content {
				font: var(--A);
			}
		}
	}
	img {
		width: 16px;
		height: 16px;
	}
</style>
