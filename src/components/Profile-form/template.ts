export const tmplProfile = `
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
                        label(for="email" class="pform__label") Email
                        input(type="email" id="email" class="pform__input" disabled= disabled ? '' : null value="karabas@yandex.ru")/
                        div(class="pform__err-message")
                            span(id="erroremail") 
                    div(class="pform__fset")
                        label(for="login" class="pform__label") Логин
                        input(type="text" id="login" class="pform__input" disabled= disabled ? '' : null value="KarabasAE")/
                        div(class="pform__err-message")
                            span(id="errorlogin") 
                    div(class="pform__fset")
                        label(for="name" class="pform__label") Имя
                        input(type="text" id="name" class="pform__input" disabled= disabled ? '' : null value="Андрей")/
                        div(class="pform__err-message")
                            span(id="errorname") 
                    div(class="pform__fset")
                        label(for="nick" class="pform__label") Имя в чате
                        input(type="text" id="nick" class="pform__input" disabled= disabled ? '' : null value="Андрей К")/
                        div(class="pform__err-message")
                            span(id="errornick") 
                    div(class="pform__fset")
                        label(for="pnone" class="pform__label") Телефон
                        input(type="text" id="pnone" class="pform__input" disabled= disabled ? '' : null value="+7 (909) 967 30 30")/
                        div(class="pform__err-message")
                            span(id="errorpnone") 
                    div(class="pform__btn-cont")
                    != ctrls
                    != buttonsubmit`;
