export const tmplMsgs = `
div(class="msgs")
    if activeChatData
        div(class="msgs__container")
            div(class="msgs__head")
                div(class="msgs__avatar-nick-cont")
                    img(src=activeChatData.avatar alt="аватар" id="msgs-avatar")
                    span(class="msgs__nick-name-text") #{activeChatData.title}
                div(class="msgs__add-remove-user" id="add-remove-user")    
            != feedComponent
            != sendForm
    else
        p(class="msgs__select-chat") Выберите чат чтобы отправить сообщение`;
