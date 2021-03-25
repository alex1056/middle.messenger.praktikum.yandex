export const insertTemplate = (tmpl) => {
  const page = document.querySelector('.page');
  const template = document.createElement('template');
  template.insertAdjacentHTML('afterbegin', tmpl);
  const addNode = template.firstElementChild;
  page.innerHTML = '';
  page.appendChild(addNode);

  // const template = document.createElement('template');
  //       template.insertAdjacentHTML('afterbegin', str1);
  //       const tagNode = template.firstElementChild;
  //       const tagsNode = document.querySelector('.intro-art__container');
  //       tagsNode.appendChild(tagNode);
};
