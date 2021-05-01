export function onSubmitHandlerLogin(form: HTMLFormElement, formId: string) {
  if (!formId) {
    throw new Error('Не задан formId для кнопки Submit!');
  }
  const inputs = Array.from(form.elements);
  const submit = form.querySelector(`#submit-${formId}`) as HTMLDivElement;

  const inputsData = inputs.reduce((acc: object, { id, value }: HTMLInputElement) => {
    if (id && id !== submit.id) {
      return { ...acc, [id]: value };
    }
    return acc;
  }, {});

  return inputsData;
}

export function onSubmitTestLogin(): void {
  console.log('onSubmitTestLogin');
}
