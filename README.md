### Проектная работа «Мессенджер»

- [Макеты проекта](https://www.figma.com/file/tvVRobUvTiGSkECLTFEmES/Chat-with-Additions)
- [Ссылка Netlify](https://gifted-franklin-967a84.netlify.app/)
- [Ссылка Heroku](https://my-heroku-app123456.herokuapp.com/)
- [Ссылка на реопзиторий](https://github.com/alex1056/middle.messenger.praktikum.yandex/tree/main)

[Ссылка на pull request](https://github.com/alex1056/middle.messenger.praktikum.yandex/pull/4)

### Реализация чата с минимально достаточными функциями:

- Регистрация/авторизация
- Добавление нового чата
- Добавление нового пользователя в чат
- Удаление пользователя из чата
- Отправка сообщений

На текущем этапе реализована функциональность согласно заданию Sprint 3:

- Настроен Webpack
- Настроена Docker-сборку статического приложения
- Проект размещен на платформе Heroku
- Настроен precommit

<h2 align="center">Установка</h2>

Установка зависимостей:

```bash
npm install
```

<h2 align="center">Запуск и сборка</h2>

**Запуск версии для разработчиков, порт `1234`:**

```bash
npm run dev
```

**Сборка стабильной версии:**

```bash
npm run build
```

Проект собирается в папку `dist`

**Сборка и запуск стабильной версии:**

```bash
npm run start
```

Проект собирается в папку `dist` и открывается с порт: `3000`

**Docker-сборка статического приложения, порт 4000:**

- Необходима версия Docker не ниже 20.10.6

```bash
docker build -t app-container-name .
```

```bash
docker run -p 4000:3000 -d app-container-name
```

**Heroku deploy статического приложения через Docker контейнер:**

```bash
heroku login
heroku stack:set container
git push heroku your_current_branch:master
```
