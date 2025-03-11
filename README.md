## Описание проекта

Проект представляет собой RESTful API для управления митапами. Реализована функциональность получения списка митапов, поиска, фильтрации, сортировки, а также аутентификация пользователей с разделением ролей.

## Основной функционал

1. Получение списка всех митапов.
2. Получение определённого митапа по его ID.
3. Регистрация нового митапа.
4. Изменение информации о существующем митапе.
5. Удаление митапа.
6. Набор тегов / ключевых слов.

## Cтек технологий

- Node.js
- NestJs
- prisma
- bcrypt
- passport

## Дополнительно

Валидация DTO .
Реализация фильтрации, сортировки и пагинации при получении списка митапов.
Документирование API через Swagger (первая версия уже реализована).
Система аутентификации на основе PassportJS:
Регистрация и авторизация пользователей с JWT Access Token.
Поддержка JWT Refresh Token.
Разделение пользователей на два типа: обычные пользователи и организаторы митапов (только организаторы могут создавать и редактировать митапы).

## Установка и запуск

1. Установка зависимостей

   1. npm install

2. Запуск проекта

   1. Docker

   ```bash
   # build container
   $ docker build -t modsen-2025-meetups .
   # start container
   $ docker run -d -p 3000:3000 --name modsen-2025-meetups modsen2025
   # stop container
   $ docker stop modsen-2025-meetups
   # delete containder
   $ docker rm modsen-2025-meetups
   # или
   $ docker-compose up --build -d
   ```

   2. Обычный запуск

   ```bash
   # development
   $ npm run start

   # watch mode
   $ npm run start:dev

   # production mode
   $ npm run start:prod
   ```

## Структура проект

```
└── 📁meetups
    └── 📁prisma
        └── (модель базы данных)
    └── 📁src
        └── app.controller.spec.ts
        └── app.controller.ts
        └── app.module.ts
        └── app.service.ts
        └── 📁auth
            └── (файлы функционала авторизации)
            └── 📁dto
                └── (dto объекты авторизации)
        └── http-exception.filter.ts
        └── main.ts
        └── 📁meetup
            └── (файлы функционала митапов)
            └── 📁dto
                └── (dto объекты митапов)
            └── 📁entities
                └── (сущности митапов)
        └── 📁prisma
            └── (объект для работы с базой данных)
        └── 📁tags
            └── (файлы функционала тэгов митапов)
            └── 📁dto
                └── (dto объекты тэгов митапов)
            └── 📁entities
                └── (сущности тэгов митапов)
        └── 📁users
            └── (файлы функционала пользователя)
            └── 📁dto
                └── (dto объекты пользователя)
            └── 📁entities
                └── (сущности пользователя)
    └── 📁test
        └── (тесты)
    └── .env
    └── .gitconfig
    └── .gitignore
    └── .prettierrc
    └── Dockerfile
    └── eslint.config.mjs
    └── nest-cli.json
    └── package-lock.json
    └── package.json
    └── Task_6.md
    └── tsconfig.build.json
    └── tsconfig.json
```
