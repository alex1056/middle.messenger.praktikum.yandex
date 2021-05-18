export const tmplChatList = `
ul(class="chats-list__chat-list")
    each item, i in chatsData            
        li(class=activeChatId === item.id ? "chat chat_selected" : "chat" data-chat-id = item.id)
            div(class="chat__cont-1")
                img(src=item.avatar alt="аватар")
            div(class="chat__cont-2")
                div(class="chat__top-wrapper")
                    p(class="chat__nick-name")  #{item.title} 
                    div(class="chat__date-wrapper")
                        span(class="chat__date")    #{item.last_message ? item.last_message.time : '1 Мая 2021'}
                        span(class="chat__delete-icon" data-chat-id= item.id data-chat-name= item.title) +
                div(class="chat__bottom-wrapper")                    
                    p(class="chat__last-message") #{item.last_message ? item.last_message.content : ''}
                    if item.unread_count !== 0
                        div(class="chat__unread-mess-numb")
                            div(class="circle-unread")                                    
                                div(class="circle-unread__wrapper")
                                    span(class="circle-unread__text") #{item.unread_count}`;
