export const tmplIndexPage = `
div(class="main")      
    div(class="chats-list")
        div(class="chats-list__wrapper")
            div(class="chats-list__top-buttons")
                a(class="btn-new-chat" href="./index-add-user.html")    Новый чат
                a(class="btn-profile" href="./profile.html")    Профиль
            div(class="input")
                input(type="text" class="input-element")/
                div(class="input__wrapper")
                    div(class="input__wrapper-loop")
                        span(class="input__loop-text")  Поиск
            each item, i in userList            
                div(class="user")
                    div(class="user__cont-1")
                        img(src=item.imgSrc alt="аватар")
                    div(class="user__cont-2")
                        div(class="user__top-wrapper")
                            p(class="user__nick-name")  #{item.name} 
                            div(class="user__date-wrapper")
                                span(class="user__date")    #{item.lastMsgdate}
                                a(class="user__delete-icon" href="./index-delete-user.html") +
                        div(class="user__bottom-wrapper")
                            p(class="user__last-message") #{item.lastMsg}
                            if item.unreadMsg
                                div(class="user__unread-mess-numb")
                                    div(class="circle-unread")                                    
                                        div(class="circle-unread__wrapper")
                                            span(class="circle-unread__text")   #{item.unreadMsg}
    div(class="msgs")
        div(class="msgs__container")
            div(class="msgs__head")
                div(class="msgs__avatar-nick-cont")
                    img(src=feed.imgSrc alt="аватар")
                    span(class="msgs__nick-name-text") #{feed.name}
                    a(href="./login.html")
                    a(href="./registr.html")
            div(class="feed")
                p(class="feed__date") #{feed.lastMsg}
                each item, i in feed.feedItems
                    if item.incomingMsg
                        div(class="feed__msg-cont")
                            each elem in item.msg
                                p(class="feed__msg-text")= elem
                            span(class="feed__msg-time") #{item.dateStatus.received}
                        div(class="feed__msg-img")
                            img(src=item.mediaSrc alt="изображение от пользователя")
                            span(class="feed__msg-time feed__msg-time_img") #{item.dateStatus.received}
                    else
                        div(class="feed__answer-cont")
                            each elem in item.msg
                                p(class="feed__msg-text")= elem
                            div(class="feed__answer-time-cont")
                                span(class="time-status") #{item.dateStatus.sent}
            form(class="msgs__footer" id="form")
                a(href="./index-add-media.html" class="msgs__attache")
                input(type="text" id="message-text" class="msgs__input" placeholder="Сообщение")/
                button(type="submit" id="submit" class="msgs__send-msg-btn")/`;
