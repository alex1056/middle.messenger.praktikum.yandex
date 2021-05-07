export const tmplDeleteAddUser = `
div(class="popup popup_visible" id="delete-chat-popup")
    div(class="popup__body")
        p(class="popup__exclam") Вы уверены что хотите удалить чат и всю переписку?
        p(class="popup__item-to-delete") Чат:
            span(class="popup__item-to-delete") &nbsp; #{chatName}
        div(class="popup__btn-cont")
            != buttonCancel
            != buttonAdd`;
