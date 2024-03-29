export const tmplPopupAddChat = `
div(class="popup popup_visible" id="add-chat-popup")
    div(class="popup__body")
        form(id="popup-add-chat-form")
            div(class="popup__text-cont")
                p(class="popup__action-title") Добавить новый чат
                div(class="popup__fset")
                    label(for="newchat-popup-add-chat-form" class="popup__label" id="labelnewchat-popup-add-chat-form") Название
                    input(type="text" id="newchat-popup-add-chat-form" class="popup__input" value="" placeholder="Введите название чата")/
                div(class="add-chat-popup__err-message")    
                    span(id="errornewchat-popup-add-chat-form")
            div(class="popup__btn-cont add-chat-popup__btn-cont")
                != buttonCancel
                != buttonAdd`;
