export const tmplMsgs = `
div(class="msgs")
    if activeChatId
        p activeChatId= #{activeChatId}
    else
        p(class="msgs__select-chat") Выберите чат чтобы отправить сообщение`;
