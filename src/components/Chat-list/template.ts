export const tmplChatList = `
ul(class="chats-list__chat-list")
    each item, i in userListData            
        li(class="chat")
            div(class="chat__cont-1")
                img(src=item.imgSrc alt="аватар")
            div(class="chat__cont-2")
                div(class="chat__top-wrapper")
                    p(class="chat__nick-name")  #{item.name} 
                    div(class="chat__date-wrapper")
                        span(class="chat__date")    #{item.lastMsgdate}
                        span(class="chat__delete-icon" data-chat-id= item.chatId data-chat-name= item.chatName) +
                div(class="chat__bottom-wrapper")
                    p(class="chat__last-message") #{item.lastMsg}
                    if item.unreadMsg
                        div(class="chat__unread-mess-numb")
                            div(class="circle-unread")                                    
                                div(class="circle-unread__wrapper")
                                    span(class="circle-unread__text")   #{item.unreadMsg}`;
