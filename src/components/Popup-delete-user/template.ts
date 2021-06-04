export const tmplDeleteAddUser = `
div(class="popup popup_visible" id="delete-user-popup")
    div(class="popup__body")
        form(class="delete-user" id="delete-user-form")
            div(class="popup__text-cont")
                p(class="popup__exclam") Удалить пользователя из чата?
                div(class="popup__fset delete-user__fset")
                    label(for="userlogin-delete-user-form" id="labeluserlogin-delete-user-form" class="popup__label") Логин
                    input(type="text" id="userlogin-delete-user-form" class="popup__input" value="" placeholder="Введите логин или email")/
                div(class="add-user-popup__err-message")    
                    span(id="erroruserlogin-delete-user-form")
            div(class="popup__btn-cont")
                != buttonCancel
                != buttonAdd`;
