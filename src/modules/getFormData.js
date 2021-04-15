export const getFormData = (form) => {
  const inputs = Array.from(form.elements);
  const submit = form.querySelector('#submit');

  const inputsData = inputs.reduce((acc, { id, value }) => {
    if (id && id !== submit.id) {
      return { ...acc, [id]: value };
    }
    return acc;
  }, {});

  return inputsData;
};
