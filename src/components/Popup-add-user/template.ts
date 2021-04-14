export const tmplPopupAddUser = `
main(class="main")
    div(class="popup popup_visible")
        div(class="popup__body")
            form(id="form")
                div(class="popup__text-cont")
                    p(class="popup__action-title") Добавить пользователя
                    div(class="popup__fset")
                        label(for="newuser" class="popup__label") Логин
                        input(type="text" id="newuser" class="popup__input" value="" placeholder="Введите логин или email")/
                div(class="popup__btn-cont")
                    != buttonCancel
                    != buttonAdd`;
