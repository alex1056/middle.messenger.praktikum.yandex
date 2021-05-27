export const tmplPopupChngAvatar = `
div(class="popup popup_visible" id="msgs-chng-avatar-popup")
    div(class="popup__body")
        form(class="popup__text-cont" id="form-msgs-chng-avatar")
            p(class="popup__action-title") Загрузите файл
            p(class="form-chng-avatar__uploaded-file" id="uploadedfile-form-msgs-chng-avatar")
            label(for="uploadInput-form-msgs-chng-avatar" class="popup__description" id="labelavatar-form-msgs-chng-avatar") Выбрать файл на компьютере
            input(id="uploadInput-form-msgs-chng-avatar" type="file" class="form-chng-avatar__input" name="avatar" accept="image/*")/
            div(class="form-msgs-chng-avatar__err-message-server-reply")
                        span(id="erroravatar-form-msgs-chng-avatar")
            != buttonChange`;
