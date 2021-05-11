// import { sanitizeHtmlXss } from '../../utils/sanitizeHtml';

export function onSubmitGetFormData(form: HTMLFormElement, formId: string) {
  if (!formId) {
    throw new Error('Не задан formId для кнопки Submit!');
  }
  const inputs = Array.from(form.elements);
  const submit = form.querySelector(`#submit-${formId}`) as HTMLDivElement;
  const cancel = form.querySelector(`#cancel-${formId}`) as HTMLDivElement;

  const inputsData = inputs.reduce((acc: object, { id, value }: HTMLInputElement) => {
    if (id && id !== submit.id && id !== cancel.id) {
      return { ...acc, [id]: value };
    }
    return acc;
  }, {});

  return inputsData;
}

export function mapInputsForSending(inputsData: any, formId: string) {
  if (inputsData) {
    return Object.keys(inputsData).reduce((acc, item) => {
      switch (item) {
        case `email-${formId}`:
          return { ...acc, email: inputsData[item] };
        case `login-${formId}`:
          return { ...acc, login: inputsData[item] };
        case `name-${formId}`:
          return { ...acc, first_name: inputsData[item] };
        case `surname-${formId}`:
          return { ...acc, second_name: inputsData[item] };
        case `phone-${formId}`:
          return { ...acc, phone: inputsData[item] };
        case `password-${formId}`:
          return { ...acc, password: inputsData[item] };
        case `nick-${formId}`:
          return { ...acc, display_name: inputsData[item] };
        case `avatar-${formId}`:
          return { ...acc, avatar: inputsData[item] };
        case `oldPassword-${formId}`:
          return { ...acc, oldPassword: inputsData[item] };
        case `newpassword-${formId}`:
          return { ...acc, newPassword: inputsData[item] };
        case `newchat-${formId}`:
          return { ...acc, chatName: inputsData[item] };
        case `userlogin-${formId}`:
          return { ...acc, userLogin: inputsData[item] };
        default:
          return acc;
      }
    }, {});
  }
  throw new Error('Отсутствуют данные из формы для отправки на сервер!');
}

// export function mapInputsForSending(inputsData: any, formId: string) {
//   if (inputsData) {
//     return Object.keys(inputsData).reduce((acc, item) => {
//       switch (item) {
//         case `email-${formId}`:
//           return { ...acc, email: sanitizeHtmlXss(inputsData[item]) };
//         case `login-${formId}`:
//           return { ...acc, login: sanitizeHtmlXss(inputsData[item]) };
//         case `name-${formId}`:
//           return { ...acc, first_name: sanitizeHtmlXss(inputsData[item]) };
//         case `surname-${formId}`:
//           return { ...acc, second_name: sanitizeHtmlXss(inputsData[item]) };
//         case `phone-${formId}`:
//           return { ...acc, phone: sanitizeHtmlXss(inputsData[item]) };
//         case `password-${formId}`:
//           return { ...acc, password: sanitizeHtmlXss(inputsData[item]) };
//         case `nick-${formId}`:
//           return { ...acc, display_name: sanitizeHtmlXss(inputsData[item]) };
//         case `avatar-${formId}`:
//           return { ...acc, avatar: sanitizeHtmlXss(inputsData[item]) };
//         case `oldPassword-${formId}`:
//           return { ...acc, oldPassword: sanitizeHtmlXss(inputsData[item]) };
//         case `newpassword-${formId}`:
//           return { ...acc, newPassword: sanitizeHtmlXss(inputsData[item]) };
//         default:
//           return acc;
//       }
//     }, {});
//   }
//   throw new Error('Отсутствуют данные из формы для отправки на сервер!');
// }

export function onSubmitTestLogin(): void {
  console.log('onSubmitTestLogin');
}
