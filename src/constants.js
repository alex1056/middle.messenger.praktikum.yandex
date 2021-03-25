export const tmpl1 = `
div(class="main")      
    div(class="chats-list")
        div(class="chats-list__wrapper")
            div(class="chats-list__top-buttons")
                a(class="btn-new-chat" href="./index-add-user.html")    Новый чат
                a(class="btn-profile" href="./profile.html")    Профиль
            div(class="input")
                input(type="text" class="input-element")/
                div(class="input__wrapper")
                    div(class="input__wrapper-loop")
                        span(class="input__loop-text")  Поиск
            div(class="user")
                div(class="user__cont-1")
                    img(src="${require('../static/img/test.png')}" alt="аватар")
                div(class="user__cont-2")
                    div(class="user__top-wrapper")
                        p(class="user__nick-name")  Андрей 
                        div(class="user__date-wrapper")
                            span(class="user__date")    1 мая 2020
                            a(class="user__delete-icon" href="./index-delete-user.html") +
                    div(class="user__bottom-wrapper")
                        p(class="user__last-message")   Друзья, у меня для вас особенный выпуск новостей!...
                        div(class="user__unread-mess-numb")
                            div(class="circle-unread")
                                div(class="circle-unread__wrapper")
                                    span(class="circle-unread__text")   7`;

export const tmpl = `
div(class="main")      
    div(class="chats-list")
        div(class="chats-list__wrapper")
            div(class="chats-list__top-buttons")
                a(class="btn-new-chat" href="./index-add-user.html")    Новый чат
                a(class="btn-profile" href="./profile.html")    Профиль
            div(class="input")
                input(type="text" class="input-element")/
                div(class="input__wrapper")
                    div(class="input__wrapper-loop")
                        span(class="input__loop-text")  Поиск
            div(class="user")
                div(class="user__cont-1")
                    img(src="${require('../static/img/test.png')}" alt="аватар")
                div(class="user__cont-2")
                    div(class="user__top-wrapper")
                        p(class="user__nick-name")  Андрей 
                        div(class="user__date-wrapper")
                            span(class="user__date")    1 мая 2020
                            a(class="user__delete-icon" href="./index-delete-user.html") +
                    div(class="user__bottom-wrapper")
                        p(class="user__last-message")   Друзья, у меня для вас особенный выпуск новостей!...
                        div(class="user__unread-mess-numb")
                            div(class="circle-unread")
                                div(class="circle-unread__wrapper")
                                    span(class="circle-unread__text")   7
    div(class="msgs")
        div(class="msgs__container")
            div(class="msgs__head")
                div(class="msgs__avatar-nick-cont")
                    img(src="${require('../static/img/test.png')}" alt="аватар")
                    span(class="msgs__nick-name-text") Андрей
                    a(href="./login.html")
                    a(href="./registr.html")
            div(class="feed")
                p(class="feed__date") 19 июня
                div(class="feed__msg-cont")
                    p(class="feed__msg-text") Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты спленкой.
                    p(class="feed__msg-text") Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
                    span(class="feed__msg-time") 10:19
                div(class="feed__msg-img")
                    img(src="${require('../static/img/test2.jpg')}" alt="изображение от пользователя")
                    span(class="feed__msg-time feed__msg-time_img") 10:19
                div(class="feed__answer-cont")
                    p(class="feed__msg-text") Круто!
                    div(class="feed__answer-time-cont")
                        span(class="time-status") 11:44
            form(class="msgs__footer" id="form")
                a(href="./index-add-media.html" class="msgs__attache")
                input(type="text" id="message-text" class="msgs__input" placeholder="Сообщение")/
                button(type="submit" id="submit" class="msgs__send-msg-btn")/`;
