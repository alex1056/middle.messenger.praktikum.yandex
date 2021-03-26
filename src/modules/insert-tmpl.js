export const insertTemplate = (tmpl, removeInner = true) => {
  const page = document.querySelector('.page');
  const template = document.createElement('template');
  template.insertAdjacentHTML('afterbegin', tmpl);
  const addNode = template.firstElementChild;
  if (removeInner) {
    page.innerHTML = '';
  }
  page.appendChild(addNode);
};
