export const getFormData = (form) => {
  const inputs = Array.from(form.elements);
  const submit = form.querySelector('#submit');

  const inputsData = inputs.reduce((acc, item) => {
    if (item.id && item.id !== submit.id) {
      return { ...acc, [item.id]: item.value };
    }
    return acc;
  }, {});

  return inputsData;
};
