export const tmplRegistr = `
main(class="main")
    div(class="login-reg")
        form(class="login-form" id="form")
            div(class="login-form__cont")
                h1(class="login-form__title") Регистрация
                div(class="login-form__fset")
                    label(for="email" class="login-form__label login-form__label_hide" id="labelemail") Почта
                    input(type="email" id="email" class="login-form__input" value="" placeholder="Почта")/
                div(class="login-form__err-message")
                    span(id="erroremail")
                div(class="login-form__fset")
                    label(for="login" class="login-form__label login-form__label_hide" id="labellogin") Логин
                    input(type="text" id="login" class="login-form__input" value="" placeholder="Логин")/
                div(class="login-form__err-message")
                    span(id="errorlogin")    
                div(class="login-form__fset")
                    label(for="name" class="login-form__label login-form__label_hide" id="labelname") Имя
                    input(type="text" id="name" class="login-form__input" value="" placeholder="Имя")/
                div(class="login-form__err-message")
                    span(id="errorname")
                div(class="login-form__fset")
                    label(for="surname" class="login-form__label login-form__label_hide" id="labelsurname") Фамилия
                    input(type="text" id="surname" class="login-form__input" value="" placeholder="Фамилия")/
                div(class="login-form__err-message")
                    span(id="errorsurname")
                div(class="login-form__fset")
                    label(for="phone" class="login-form__label login-form__label_hide" id="labelphone") Телефон
                    input(type="phone" id="phone" class="login-form__input" value="" placeholder="Телефон")/
                div(class="login-form__err-message")
                    span(id="errorphone")
                div(class="login-form__fset")
                    label(for="password" class="login-form__label login-form__label_hide" id="labelpassword") Пароль
                    input(type="password" id="password" class="login-form__input" value="" placeholder="Пароль")/
                div(class="login-form__err-message")
                    span(id="errorpassword")
                div(class="login-form__fset")
                    label(for="passwordconfirm" class="login-form__label login-form__label_hide" id="labelpasswordconfirm") Пароль (еще раз)
                    input(type="password" id="passwordconfirm" class="login-form__input" value="" placeholder="Пароль (еще раз)")/
                div(class="login-form__err-message")
                    span(id="errorpasswordconfirm")
                div(class="login-form__btn-cont")
                    != buttonsubmit
                    a(class="btn login-form__btn login-form__btn_white" href="./login.html")
                        span(class="btn__text login-form__btn-text") Войти`;
