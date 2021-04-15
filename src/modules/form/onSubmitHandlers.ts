export function onSubmitHandlerLogin(form: HTMLFormElement) {
  const inputs = Array.from(form.elements);
  const submit = form.querySelector('#submit') as HTMLDivElement;

  const inputsData = inputs.reduce((acc: object, item: HTMLInputElement) => {
    const { id, value } = item;
    if (id && id !== submit.id) {
      return { ...acc, [id]: value };
    }
    return acc;
  }, {});
  console.log(inputsData);
  return inputsData;
}
