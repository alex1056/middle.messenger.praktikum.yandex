export const tmplUserList = `
ul(class="chats-list__user-list")
    each item, i in userListData            
        li(class="user")
            div(class="user__cont-1")
                img(src=item.imgSrc alt="аватар")
            div(class="user__cont-2")
                div(class="user__top-wrapper")
                    p(class="user__nick-name")  #{item.name} 
                    div(class="user__date-wrapper")
                        span(class="user__date")    #{item.lastMsgdate}
                        span(class="user__delete-icon" ) +
                div(class="user__bottom-wrapper")
                    p(class="user__last-message") #{item.lastMsg}
                    if item.unreadMsg
                        div(class="user__unread-mess-numb")
                            div(class="circle-unread")                                    
                                div(class="circle-unread__wrapper")
                                    span(class="circle-unread__text")   #{item.unreadMsg}`;
