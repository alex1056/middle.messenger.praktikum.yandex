export const tmplDeleteChat = `
div(class="popup popup_visible" id="delete-chat-popup")
    div(class="popup__body")
        form(class="delete-chat-form" id="delete-chat-form")
            p(class="popup__exclam") Вы уверены что хотите удалить чат и всю переписку?
            p(class="popup__item-to-delete delete-chat-form__chat-name") Чат:
                span(class="popup__item-to-delete") &nbsp; #{chatName}
            div(class="popup__btn-cont")
                != buttonCancel
                != buttonAdd`;
