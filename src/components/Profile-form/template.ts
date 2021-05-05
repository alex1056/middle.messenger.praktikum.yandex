export const tmplProfile = `
main(class="main")
    div(class="profile")
        div(class="profile__back")
            a(class="btn-circle" href="./")
        div(class="profile__info-cont")
            div(class="profile__info")
                div(class="profile__avatar-cont" )
                    a(class="profile__avatar" id="chng-avatar-btn-form-profile")
                span(class="profile__name") Иван
                form(class="pform" id="form-profile")
                    if !showPasswordFields
                        div(class="pform__fset")
                            label(for="email-form-profile" class="pform__label") Email
                            input(type="email" id="email-form-profile" class="pform__input" disabled= inputsDisabled ? '' : null value="karabas@yandex.ru")/
                            div(class="pform__err-message")
                                span(id="erroremail-form-profile") 
                        div(class="pform__fset")
                            label(for="login-form-profile" class="pform__label") Логин
                            input(type="text" id="login-form-profile" class="pform__input" disabled= inputsDisabled ? '' : null value="KarabasAE")/
                            div(class="pform__err-message")
                                span(id="errorlogin-form-profile") 
                        div(class="pform__fset")
                            label(for="name-form-profile" class="pform__label") Имя
                            input(type="text" id="name-form-profile" class="pform__input" disabled= inputsDisabled ? '' : null value="Андрей")/
                            div(class="pform__err-message")
                                span(id="errorname-form-profile") 
                        div(class="pform__fset")
                            label(for="nick-form-profile" class="pform__label") Имя в чате
                            input(type="text" id="nick-form-profile" class="pform__input" disabled= inputsDisabled ? '' : null value="Андрей К")/
                            div(class="pform__err-message")
                                span(id="errornick-form-profile") 
                        div(class="pform__fset")
                            label(for="phone-form-profile" class="pform__label") Телефон
                            input(type="text" id="phone-form-profile" class="pform__input" disabled= inputsDisabled ? '' : null value="+7 (909) 967 30 30")/
                            div(class="pform__err-message")
                                span(id="errorphone-form-profile")
                    else
                        div(class="pform__fset")
                            label(for="oldPassword-form-profile" class="pform__label") Старый пароль
                            input(type="password" id="oldPassword-form-profile" class="pform__input" value="karabas@yandex.ru")/
                            div(class="pform__err-message")
                                span(id="erroroldPassword-form-profile")
                        div(class="pform__fset")
                            label(for="newpassword-form-profile" class="pform__label") Новый пароль
                            input(type="password" id="newpassword-form-profile" class="pform__input" value="KarabasAE")/
                            div(class="pform__err-message")
                                span(id="errornewpassword-form-profile")
                        div(class="pform__fset")
                            label(for="passwordconfirm-form-profile" class="pform__label") Повторите пароль
                            input(type="password" id="passwordconfirm-form-profile" class="pform__input" value="KarabasAE")/
                            div(class="pform__err-message")
                                span(id="errorpasswordconfirm-form-profile")         
                    div(class="pform__btn-cont")
                    != ctrls
                    != buttonsubmit`;
