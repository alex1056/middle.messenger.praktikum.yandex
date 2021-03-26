export const tmplIndexPage = `
div(class="main")      
    div(class="chats-list")
        div(class="chats-list__wrapper")
            div(class="chats-list__top-buttons")
                a(class="btn-new-chat" href='./add-user.html')    Новый чат
                a(class="btn-profile" href="./profile.html")    Профиль
            div(class="input")
                input(type="text" class="input-element")/
                div(class="input__wrapper")
                    div(class="input__wrapper-loop")
                        span(class="input__loop-text")  Поиск
            each item, i in userList            
                div(class="user")
                    div(class="user__cont-1")
                        img(src=item.imgSrc alt="аватар")
                    div(class="user__cont-2")
                        div(class="user__top-wrapper")
                            p(class="user__nick-name")  #{item.name} 
                            div(class="user__date-wrapper")
                                span(class="user__date")    #{item.lastMsgdate}
                                a(class="user__delete-icon" href="./index-delete-user.html") +
                        div(class="user__bottom-wrapper")
                            p(class="user__last-message") #{item.lastMsg}
                            if item.unreadMsg
                                div(class="user__unread-mess-numb")
                                    div(class="circle-unread")                                    
                                        div(class="circle-unread__wrapper")
                                            span(class="circle-unread__text")   #{item.unreadMsg}
    div(class="msgs")
        div(class="msgs__container")
            div(class="msgs__head")
                div(class="msgs__avatar-nick-cont")
                    img(src=feed.imgSrc alt="аватар")
                    span(class="msgs__nick-name-text") #{feed.name}
                    a(href="./login.html")
                    a(href="./registr.html")
            div(class="feed")
                p(class="feed__date") #{feed.lastMsg}
                each item, i in feed.feedItems
                    if item.incomingMsg
                        div(class="feed__msg-cont")
                            each elem in item.msg
                                p(class="feed__msg-text")= elem
                            span(class="feed__msg-time") #{item.dateStatus.received}
                        div(class="feed__msg-img")
                            img(src=item.mediaSrc alt="изображение от пользователя")
                            span(class="feed__msg-time feed__msg-time_img") #{item.dateStatus.received}
                    else
                        div(class="feed__answer-cont")
                            each elem in item.msg
                                p(class="feed__msg-text")= elem
                            div(class="feed__answer-time-cont")
                                span(class="time-status") #{item.dateStatus.sent}
            form(class="msgs__footer" id="form")
                a(href="./index-add-media.html" class="msgs__attache")
                input(type="text" id="message-text" class="msgs__input" placeholder="Сообщение")/
                button(type="submit" id="submit" class="msgs__send-msg-btn")/`;

export const tmplAddUser = `
div(class="popup popup_visible")
    div(class="popup__body")
        form(id="form")
            div(class="popup__text-cont")
                p(class="popup__action-title") Добавить пользователя
                div(class="popup__fset")
                    label(for="newuser" class="popup__label") Логин
                    input(type="text" id="newuser" class="popup__input" value="" placeholder="Введите логин или email")/
            div(class="popup__btn-cont")
                a(class="btn popup__btn popup__btn_small popup__btn_white" href="#")
                    span(class="btn__text popup__btn-text") Отмена
                button(type="submit" id="submit" class="btn popup__btn popup__btn_small")
                    span(class="btn__text") Добавить`;

export const tmplProfile = `
div(class="profile")
    div(class="profile__back")
        a(class="btn-circle" href="./index.html")
    div(class="profile__info-cont")
        div(class="profile__info")
            div(class="profile__avatar-cont")
                a(class="profile__avatar" href="./profile-chg-avatar.html")
            span(class="profile__name") Иван
            form(class="pform" id="form")
                div(class="pform__fset")
                    label(for="email" class="pform__label") Email
                    input(type="email" id="email" class="pform__input" value="karabas@yandex.ru")/
                div(class="pform__fset")
                    label(for="login" class="pform__label") Логин
                    input(type="text" id="login" class="pform__input" value="KarabasAE")/
                div(class="pform__fset")
                    label(for="name" class="pform__label") Имя
                    input(type="text" id="name" class="pform__input" value="Андрей")/
                div(class="pform__fset")
                    label(for="nick" class="pform__label") Имя в чате
                    input(type="text" id="nick" class="pform__input" value="Андрей К")/
                div(class="pform__fset")
                    label(for="pnone" class="pform__label") Телефон
                    input(type="text" id="pnone" class="pform__input" value="+7 (909) 967 30 30")/
                div(class="pform__btn-cont")
                    div(class="pform__fset")
                        a(class="pform__btn-link" href="./profile-chng-data.html") Изменить данные
                    div(class="pform__fset")
                        a(class="pform__btn-link" href="./profile-chng-pwd.html") Изменить пароль 
                    div(class="pform__fset")
                        a(class="pform__btn-link pform__btn-link_exit" href="#") Выйти`;

export const tmplProfileChngAvatar = `
div(class="popup popup_visible")
    div(class="popup__body")
        div(class="popup__text-cont")
            p(class="popup__action-title") Загрузите файл
            p(class="popup__description") Выбрать файл на компьютере
        button(class="btn popup__btn")
            span(class="btn__text") Сохранить`;

export const tmplProfileChngData = `
div(class="profile")
    div(class="profile__back")
        a(class="btn-circle" href="./index.html")
    div(class="profile__info-cont")
        div(class="profile__info")
            div(class="profile__avatar-cont")
                a(class="profile__avatar" href="./profile-chg-avatar.html")
            span(class="profile__name") Иван
            form(class="pform" id="form")
                div(class="pform__fset")
                    label(for="email" class="pform__label") Email
                    input(type="email" id="email" class="pform__input" value="karabas@yandex.ru")/
                div(class="pform__fset")
                    label(for="login" class="pform__label") Логин
                    input(type="text" id="login" class="pform__input" value="KarabasAE")/
                div(class="pform__fset")
                    label(for="name" class="pform__label") Имя
                    input(type="text" id="name" class="pform__input" value="Андрей")/
                div(class="pform__fset")
                    label(for="nick" class="pform__label") Имя в чате
                    input(type="text" id="nick" class="pform__input" value="Андрей К")/
                div(class="pform__fset")
                    label(for="pnone" class="pform__label") Телефон
                    input(type="text" id="pnone" class="pform__input" value="+7 (909) 967 30 30")/
                div(class="pform__btn-cont")
                    button(type="submit" id="submit" class="btn pform__btn-save")
                        span(class="btn__text") Сохранить`;

export const tmplProfileChngPwd = `
div(class="profile")
    div(class="profile__back")
        a(class="btn-circle" href="./index.html")
    div(class="profile__info-cont")
        div(class="profile__info")
            div(class="profile__avatar-cont")
                a(class="profile__avatar" href="./profile-chg-avatar.html")
            span(class="profile__name") Иван
            form(class="pform" id="form")
                div(class="pform__fset")
                    label(for="password" class="pform__label") Старый пароль
                    input(type="password" id="password" class="pform__input" value="karabas@yandex.ru")/
                div(class="pform__fset")
                    label(for="new-password" class="pform__label") Новый пароль
                    input(type="password" id="new-password" class="pform__input" value="KarabasAE")/
                div(class="pform__fset")
                    label(for="password-again" class="pform__label") Повторите пароль
                    input(type="password" id="password-again" class="pform__input" value="KarabasAE")/
                div(class="pform__btn-cont")
                    button(type="submit" id="submit" class="btn pform__btn-save")
                        span(class="btn__text") Сохранить`;

export const tmplLogin = `
div(class="login-reg login-reg_login")
    form(class="login-form" id="form")
        div(class="login-form__cont")
            h1(class="login-form__title") Вход
            div(class="login-form__fset")
                label(for="login" class="login-form__label") Логин
                input(type="text" id="login" class="login-form__input" value="karabas@yandex.ru" placeholder="")/
            div(class="login-form__fset")
                label(for="password" class="login-form__label") Пароль
                input(type="password" id="password" class="login-form__input" value="123456" placeholder="")/
            div(class="login-form__btn-cont")
                button(type="submit" id="submit" class="btn login-form__btn")
                    span(class="btn__text") Авторизоваться
                a(class="btn login-form__btn login-form__btn_white" href="./registr.html")
                    span(class="btn__text login-form__btn-text") Нет аккаунта?             
`;
export const tmplRegistr = `
div(class="login-reg")
    form(class="login-form" id="form")
        div(class="login-form__cont")
            h1(class="login-form__title") Регистрация
            div(class="login-form__fset")
                label(for="email" class="login-form__label") Почта
                input(type="email" id="email" class="login-form__input" value="karabas@yandex.ru" placeholder="")/
            div(class="login-form__fset")
                label(for="login" class="login-form__label") Логин
                input(type="text" id="login" class="login-form__input" value="KarabasAE" placeholder="")/
            div(class="login-form__fset")
                label(for="name" class="login-form__label") Имя
                input(type="text" id="name" class="login-form__input" value="Артур" placeholder="")/
            div(class="login-form__fset")
                label(for="surname" class="login-form__label") Фамилия
                input(type="text" id="surname" class="login-form__input" value="Благородный" placeholder="")/
            div(class="login-form__fset")
                label(for="phone" class="login-form__label") Телефон
                input(type="phone" id="phone" class="login-form__input" value="+7 (965) 1234567" placeholder="")/
            div(class="login-form__fset")
                label(for="password" class="login-form__label") Пароль
                input(type="password" id="password" class="login-form__input" value="1234567" placeholder="")/
            div(class="login-form__fset")
                label(for="password-confirm" class="login-form__label") Пароль (еще раз)
                input(type="password" id="password-confirm" class="login-form__input" value="1234567" placeholder="")/
            p(class="login-form__err-message") Пароли не совпадают
            div(class="login-form__btn-cont")
                button(type="submit" id="submit" class="btn login-form__btn")
                    span(class="btn__text") Зарегистрироваться
                a(class="btn login-form__btn login-form__btn_white" href="./login.html")
                    span(class="btn__text login-form__btn-text") Войти`;
