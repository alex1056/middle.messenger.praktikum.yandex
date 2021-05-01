export const tmplPopupAddUser = `
div(class="popup popup_visible" id="popup-add-user")
    div(class="popup__body")
        form(id="popup-add-user-form")
            div(class="popup__text-cont")
                p(class="popup__action-title") Добавить пользователя
                div(class="popup__fset")
                    label(for="newuser-popup-add-user-form" class="popup__label") Логин
                    input(type="text" id="newuser-popup-add-user-form" class="popup__input" value="" placeholder="Введите логин или email")/
            div(class="popup__btn-cont")
                != buttonCancel
                != buttonAdd`;
