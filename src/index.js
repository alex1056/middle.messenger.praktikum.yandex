import { getFormData } from './modules/getFormData';
const form = document.querySelector('#form');

let inputsData = {};
form.addEventListener('submit', (event) => {
  event.preventDefault();

  inputsData = getFormData(form);
  console.log(inputsData);
});
