# smolathon2

Решение для хакатона Smolathon 2024 от команды "Смолодцы МИСИС".

## Разработка

Для разработки используется технология devcontainer'ов.

Запуск dev-сервера производится разработчиком через CLI, сопутствующие сервисы
запускаются автоматически при запуске devcontainer'а.

### Авторизация

seed-скрипты создают следующие аккаунты:

| Email                           | Пароль   |
| ------------------------------- | -------- |
| user@smolathon.clayenkitten.dev | password |

### Сервисы

- dev-сервер: [localhost:3000](http://localhost:3000)
- Домашняя панель: [admin.localhost:3000](http://admin.localhost:3000)
- Веб-интерфейс к базе данных: [db.admin.localhost:3000](http://db.admin.localhost:3000)
- Веб-интерфейс к S3-хранилищу: [s3.admin.localhost:3000](http://s3.admin.localhost:3000)

### CLI

- Запуск dev-сервера: `npm run dev`
- Проверка кода: `npm run check`
- Форматирование кода: `npm run format`
- БД:
  - Миграции:
    - Запуск одной миграции: `npm run db migrate up`
    - Отмена одной миграции: `npm run db migrate down`
    - Запуск всех миграций: `npm run db migrate latest -- --all`
  - Обновление типов: `npm run db:infer`
  - Заполнение тестовыми данными: `npm run db seed run`
