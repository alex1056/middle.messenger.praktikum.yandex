export const tmplMsgs = `
div(class="msgs")
    if chatId
        p chatId= #{chatId}
    else
        p(class="msgs__select-chat") Выберите чат чтобы отправить сообщение`;
