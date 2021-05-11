export const tmplDeleteAddUser = `
div(class="popup popup_visible")
    div(class="popup__body")
        form(class="delete-user" id="popup-add-user-form")
            div(class="popup__text-cont")
                p(class="popup__exclam") Удалить пользователя из чата?
                div(class="popup__fset delete-user__fset")
                    label(for="newuser-popup-add-user-form" class="popup__label") Логин
                    input(type="text" id="newuser-popup-add-user-form" class="popup__input" value="" placeholder="Введите логин или email")/
            div(class="popup__btn-cont")
                != buttonCancel
                != buttonAdd`;
