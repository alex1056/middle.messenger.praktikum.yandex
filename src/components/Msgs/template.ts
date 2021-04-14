export const tmplMsgs = `
div(class="msgs")
    div(class="msgs__container")
        div(class="msgs__head")
            div(class="msgs__avatar-nick-cont")
                img(src=feed.imgSrc alt="аватар")
                span(class="msgs__nick-name-text") #{feed.name}
        != feedComponent
        != sendForm`;
