export const tmplPopupAddUser = `
div(class="popup popup_visible" id="popup-add-chat")
    div(class="popup__body")
        form(id="popup-add-chat-form")
            div(class="popup__text-cont")
                p(class="popup__action-title") Добавить новый чат
                div(class="popup__fset")
                    label(for="newchat-popup-add-chat-form" class="popup__label") Название
                    input(type="text" id="newchat-popup-add-chat-form" class="popup__input" value="" placeholder="Введите название чата")/
            div(class="popup__btn-cont")
                != buttonCancel
                != buttonAdd`;
