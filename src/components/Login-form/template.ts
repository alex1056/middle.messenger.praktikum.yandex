export const tmplLogin = `
main(class="main")
    div(class="login-reg login-reg_login")
        form(class="login-form" id="form-login")
            div(class="login-form__cont")
                h1(class="login-form__title") Вход
                div(class="login-form__fset")
                    label(for="login-form-login" class="login-form__label login-form__label_hide" id="labellogin-form-login") Логин
                    input(type="email" id="login-form-login" class="login-form__input" value="" placeholder="Логин")/
                div(class="login-form__err-message")
                    span(id="errorlogin-form-login")
                div(class="login-form__fset")
                    label(for="password-form-login" class="login-form__label login-form__label_hide" id="labelpassword-form-login") Пароль
                    input(type="password" id="password-form-login" class="login-form__input" value="" placeholder="Пароль")/
                div(class="login-form__err-message")
                    span(id="errorpassword-form-login")
                div(class="login-form__err-message login-form__err-message_server-reply-error")
                    span(id="error-server-reply") 
                div(class="login-form__btn-cont") 
                    != buttonsubmit
                    a(class="btn login-form__btn login-form__btn_white" href="./registr")
                        span(class="btn__text login-form__btn-text") Нет аккаунта?`;
