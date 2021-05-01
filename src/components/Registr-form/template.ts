export const tmplRegistr = `
main(class="main")
    div(class="login-reg")
        form(class="login-form" id="form-registr")
            div(class="login-form__cont")
                h1(class="login-form__title") Регистрация
                div(class="login-form__fset")
                    label(for="email-form-registr" class="login-form__label login-form__label_hide" id="labelemail-form-registr") Почта
                    input(type="email" id="email-form-registr" class="login-form__input" value="" placeholder="Почта")/
                div(class="login-form__err-message")
                    span(id="erroremail-form-registr")
                div(class="login-form__fset")
                    label(for="login-form-registr" class="login-form__label login-form__label_hide" id="labellogin-form-registr") Логин
                    input(type="text" id="login-form-registr" class="login-form__input" value="" placeholder="Логин")/
                div(class="login-form__err-message")
                    span(id="errorlogin-form-registr")    
                div(class="login-form__fset")
                    label(for="name-form-registr" class="login-form__label login-form__label_hide" id="labelname-form-registr") Имя
                    input(type="text" id="name-form-registr" class="login-form__input" value="" placeholder="Имя")/
                div(class="login-form__err-message")
                    span(id="errorname-form-registr")
                div(class="login-form__fset")
                    label(for="surname-form-registr" class="login-form__label login-form__label_hide" id="labelsurname-form-registr") Фамилия
                    input(type="text" id="surname-form-registr" class="login-form__input" value="" placeholder="Фамилия")/
                div(class="login-form__err-message")
                    span(id="errorsurname-form-registr")
                div(class="login-form__fset")
                    label(for="phone-form-registr" class="login-form__label login-form__label_hide" id="labelphone-form-registr") Телефон
                    input(type="phone" id="phone-form-registr" class="login-form__input" value="" placeholder="Телефон")/
                div(class="login-form__err-message")
                    span(id="errorphone-form-registr")
                div(class="login-form__fset")
                    label(for="password-form-registr" class="login-form__label login-form__label_hide" id="labelpassword-form-registr") Пароль
                    input(type="password" id="password-form-registr" class="login-form__input" value="" placeholder="Пароль")/
                div(class="login-form__err-message")
                    span(id="errorpassword-form-registr")
                div(class="login-form__fset")
                    label(for="passwordconfirm-form-registr" class="login-form__label login-form__label_hide" id="labelpasswordconfirm-form-registr") Пароль (еще раз)
                    input(type="password" id="passwordconfirm-form-registr" class="login-form__input" value="" placeholder="Пароль (еще раз)")/
                div(class="login-form__err-message")
                    span(id="errorpasswordconfirm-form-registr")
                div(class="login-form__btn-cont")
                    != buttonsubmit
                    a(class="btn login-form__btn login-form__btn_white" href="./login")
                        span(class="btn__text login-form__btn-text") Войти`;
