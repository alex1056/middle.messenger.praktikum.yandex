FROM node:14
# создаем рабочую директорию
WORKDIR /var/www
# копируем весь исходный код
COPY . .
# на данном порте запускается наше приложение
EXPOSE 3000

CMD npm ci && npm run startw
