export const tmplProfile = `
main(class="main")
    div(class="profile")
        div(class="profile__back")
            a(class="btn-circle" id="profile-btn-back")
        div(class="profile__info-cont")
            div(class="profile__info")
                div(class="profile__avatar-cont" )
                    a(class="profile__avatar" id="chng-avatar-btn-form-profile" style='background-image:url('+ data.avatar + ');background-size:cover;')
                span(class="profile__name") #{data.first_name}
                form(class="pform" id="form-profile")
                    if !showPasswordFields
                        div(class="pform__fset")
                            label(for="email-form-profile" class="pform__label") Email
                            input(type="email" id="email-form-profile" class="pform__input" disabled= inputsDisabled ? '' : null value= data.email)/
                            div(class="pform__err-message")
                                span(id="erroremail-form-profile") 
                        div(class="pform__fset")
                            label(for="login-form-profile" class="pform__label") Логин
                            input(type="text" id="login-form-profile" class="pform__input" disabled= inputsDisabled ? '' : null value= data.login)/
                            div(class="pform__err-message")
                                span(id="errorlogin-form-profile") 
                        div(class="pform__fset")
                            label(for="name-form-profile" class="pform__label") Имя
                            input(type="text" id="name-form-profile" class="pform__input" disabled= inputsDisabled ? '' : null value= data.first_name)/
                            div(class="pform__err-message")
                                span(id="errorname-form-profile") 
                        div(class="pform__fset")
                            label(for="surname-form-profile" class="pform__label" id="labelsurname-form-profile") Фамилия
                            input(type="text" name="second_name" id="surname-form-profile" class="pform__input" value= data.second_name placeholder="")/
                            div(class="pform__err-message")
                                span(id="errorsurname-form-profile")
                        div(class="pform__fset")
                            label(for="nick-form-profile" class="pform__label") Имя в чате
                            input(type="text" id="nick-form-profile" class="pform__input" disabled= inputsDisabled ? '' : null value= data.display_name)/
                            div(class="pform__err-message")
                                span(id="errornick-form-profile") 
                        div(class="pform__fset")
                            label(for="phone-form-profile" class="pform__label") Телефон
                            input(type="text" id="phone-form-profile" class="pform__input" disabled= inputsDisabled ? '' : null value= data.phone)/
                            div(class="pform__err-message")
                                span(id="errorphone-form-profile")
                    else
                        div(class="pform__fset")
                            label(for="oldPassword-form-profile" class="pform__label") Старый пароль
                            input(type="password" id="oldPassword-form-profile" class="pform__input" value="123")/
                            div(class="pform__err-message")
                                span(id="erroroldPassword-form-profile")
                        div(class="pform__fset")
                            label(for="newpassword-form-profile" class="pform__label") Новый пароль
                            input(type="password" id="newpassword-form-profile" class="pform__input" value="123")/
                            div(class="pform__err-message")
                                span(id="errornewpassword-form-profile")
                        div(class="pform__fset")
                            label(for="passwordconfirm-form-profile" class="pform__label") Повторите пароль
                            input(type="password" id="passwordconfirm-form-profile" class="pform__input" value="123")/
                            div(class="pform__err-message")
                                span(id="errorpasswordconfirm-form-profile")         
                    div(class="pform__err-message-server-reply")
                        span(id="error-server-reply")
                    div(class="pform__btn-cont")
                    != ctrls
                    != buttonsubmit`;
