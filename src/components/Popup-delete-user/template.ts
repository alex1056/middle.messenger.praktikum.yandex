export const tmplDeleteAddUser = `
div(class="popup popup_visible")
    div(class="popup__body")
        p(class="popup__exclam") Вы уверены что хотите удалить пользователя и всю переписку?
        p(class="popup__user-to-delete") Пользователь:
            span(class="popup__user-to-delete") &nbsp;Андрей
        div(class="popup__btn-cont")
            != buttonCancel
            != buttonAdd`;
