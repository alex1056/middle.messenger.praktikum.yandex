export const tmplPopupChngAvatar = `
div(class="popup popup_visible" id="chng-avatar-popup")
    div(class="popup__body")
        form(class="popup__text-cont" id="form-chng-avatar")
            p(class="popup__action-title") Загрузите файл
            p(class="form-chng-avatar__uploaded-file" id="uploadedfile-form-chng-avatar")
            label(for="uploadInput-form-chng-avatar" class="popup__description" id="labelavatar-form-chng-avatar") Выбрать файл на компьютере
            input(id="uploadInput-form-chng-avatar" type="file" class="form-chng-avatar__input" name="avatar" accept="image/*")/
            div(class="form-chng-avatar__err-message-server-reply")
                        span(id="erroravatar-form-chng-avatar")
            != buttonChange`;
