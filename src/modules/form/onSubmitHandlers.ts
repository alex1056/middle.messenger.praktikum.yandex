export function onSubmitHandlerLogin(form: HTMLFormElement) {
  const inputs = Array.from(form.elements);
  const submit = form.querySelector('#submit') as HTMLDivElement;

  const inputsData = inputs.reduce((acc: object, { id, value }: HTMLInputElement) => {
    if (id && id !== submit.id) {
      return { ...acc, [id]: value };
    }
    return acc;
  }, {});

  return inputsData;
}
