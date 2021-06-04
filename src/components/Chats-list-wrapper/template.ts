export const tmplChatList = `
div(class="chats-list")
    div(class="chats-list__wrapper")
        div(class="chats-list__top-buttons")
            a(class="btn-new-chat" id="btn-new-chat")    Новый чат
            a(class="btn-profile" id="btn-go-profile")    Профиль
        div(class="input")
            input(type="text" class="input-element")/
            div(class="input__wrapper")
                div(class="input__wrapper-loop")
                    span(class="input__loop-text")  Поиск
        != chatList`;
