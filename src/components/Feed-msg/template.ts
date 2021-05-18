export const tmplFeedMsg = `if data.incomingMsg
    div(class="feed__msg-cont")
        p(class="feed__msg-text") #{data.content}
        span(class="feed__msg-time") #{data.time}
else
    div(class="feed__answer-cont")
        p(class="feed__msg-text") #{data.content}
        div(class="feed__answer-time-cont")
            span(class="time-status" class= true ? "some-class-name" : "") #{data.time}`;
