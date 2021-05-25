export const tmplChatsList = `
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
        != userList`;
