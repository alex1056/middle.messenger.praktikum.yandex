export const tmplMsgs = `
div(class="msgs")
    if chatId
        div(class="msgs__container")
            div(class="msgs__head")
                div(class="msgs__avatar-nick-cont")
                    img(src=feed.imgSrc alt="аватар")
                    span(class="msgs__nick-name-text") #{feed.name}
                div(class="msgs__add-remove-user" id="add-remove-user")    
            != feedComponent
            != sendForm
    else
        p(class="msgs__select-chat") Выберите чат чтобы отправить сообщение`;
