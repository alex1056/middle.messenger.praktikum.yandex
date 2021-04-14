export const tmplChngPwd = `
main(class="main")
    div(class="profile")
        div(class="profile__back")
            a(class="btn-circle" href="./index.html")
        div(class="profile__info-cont")
            div(class="profile__info")
                div(class="profile__avatar-cont")
                    a(class="profile__avatar" href="./profile-chg-avatar.html")
                span(class="profile__name") Иван
                form(class="pform" id="form")
                    div(class="pform__fset")
                        label(for="password" class="pform__label") Старый пароль
                        input(type="password" id="password" class="pform__input" value="karabas@yandex.ru")/
                        div(class="pform__err-message")
                            span(id="errorpassword")
                    div(class="pform__fset")
                        label(for="newpassword" class="pform__label") Новый пароль
                        input(type="password" id="newpassword" class="pform__input" value="KarabasAE")/
                        div(class="pform__err-message")
                            span(id="errornewpassword")
                    div(class="pform__fset")
                        label(for="passwordconfirm" class="pform__label") Повторите пароль
                        input(type="password" id="passwordconfirm" class="pform__input" value="KarabasAE")/
                        div(class="pform__err-message")
                            span(id="errorpasswordconfirm")
                    div(class="pform__btn-cont")
                        != buttonsubmit
                        a(class="btn pform__btn pform__btn_white" href="./login.html")
                            span(class="btn__text pform__btn-text") Войти`;
