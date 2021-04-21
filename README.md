<h1>
  <a href="http://films.nomoredomains.icu" target="_blank">
    Movies Explorer API
  </a>
</h1>

<p align="center"><img width=100 src="./.readme/logo.svg" align="center" alt="logo"></p>

## О проекте
API сервиса поиска фильмов и сохранения понравившихся в своем профиле.

### Стек технологий:
- MongoDB
- Express.js
- Node.js
- nginx

## Команды:
```bash
# Запуск приложения
npm run start

# Запуск локального сервера
npm run dev
```

## Запросы
```bash
POST   /signin     # авторизоваться { email, password }

POST   /signup     # регистрация { email, password, name }

GET    /users/me   # информация о текущем пользователе

PATCH  /users/me   # обновить профиль { email, name }

GET    /movies     # получить массив всех сохраненных фильмов

POST   /movies     # сохранить фильм

DELETE /movies/:id # удалить фильм по его movieId

# объект фильма
{
  country,     # строка
  director,    # строка
  duration,    # число
  year,        # строка
  description, # строка
  image,       # URL
  trailer,     # URL
  thumbnail,   # URL
  owner,       # MongoDB _id
  movieId,     # число
  nameRU,      # строка
  nameEN,      # строка
}
```

## Пример .env файла
```bash
PORT=3000

NODE_ENV=production

# при NODE_ENV === production JWT_KEY обязателен
JWT_KEY=beb2e6378e97e604

# при NODE_ENV === production наличие адреса базы данных обязательно
MONGO_URI='mongodb://localhost:27017/movies-explorer'
```

## Ссылки:
| Описание | URL |
| :-- | :-- |
| Домен:     | [films.nomoredomains.icu](http://films.nomoredomains.icu) |
| Домен API: | [api.films.nomoredomains.icu](http://api.films.nomoredomains.icu) |
| Альтернативный адрес API: | [films.nomoredomains.icu/api](http://films.nomoredomains.icu/api) |
| Репозиторий фронтенда: | [github.com/script-ninja/movies-explorer](https://github.com/script-ninja/movies-explorer) |
