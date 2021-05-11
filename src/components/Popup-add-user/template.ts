export const tmplPopupAddUser = `
div(class="popup popup_visible" id="add-user-popup")
    div(class="popup__body")
        form(id="popup-add-user-form")
            div(class="popup__text-cont")
                p(class="popup__action-title") Добавить пользователя
                div(class="popup__fset")
                    label(for="userlogin-popup-add-user-form" id="labeluserlogin-popup-add-user-form" class="popup__label") Логин
                    input(type="text" id="userlogin-popup-add-user-form" class="popup__input" value="" placeholder="Введите логин")/
                div(class="add-user-popup__err-message")    
                    span(id="erroruserlogin-popup-add-user-form")
            div(class="popup__btn-cont add-user-popup__btn-cont")
                != buttonCancel
                != buttonAdd`;
