export const tmplFeed = `
div(class="feed")
    div(class="feed__container")
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
                        span(class="time-status") #{item.dateStatus.sent}`;
