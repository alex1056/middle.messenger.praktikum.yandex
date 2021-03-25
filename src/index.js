import { getFormData } from './modules/getFormData';
import { insertTemplate } from './modules/insert-tmpl';
// const form = document.querySelector('#form');

// let inputsData = {};
// form.addEventListener('submit', (event) => {
//   event.preventDefault();

//   inputsData = getFormData(form);
//   console.log(inputsData);
// });

// import pug from 'pug';
var pug = require('pug');
require('../static/img/test.png');
// let filePug = require('./main.pug');
import { tmpl } from './constants';
// console.log(__dirname);
// console.log(filePug);
// console.log(pug);
// const compiled = pug.compileClient(tmpl);
// console.log(tmpl);
const compiled = pug.compile(tmpl);
// console.log(compiled);

// console.log(compiled());

const html = compiled();
// console.log(html);
insertTemplate(html);
const form = document.querySelector('#form');

let inputsData = {};
form.addEventListener('submit', (event) => {
  event.preventDefault();

  inputsData = getFormData(form);
  console.log(inputsData);
});

// const html = compiled({});
// console.log(html);
// const compiledFunction = pug.compileFile('./index.pug');
// const compilationFunc = pug.render(tmpl); // tmpl — это шаблон таблицы из кода выше
// console.log(compilationFunc); // Получим на выходе HTML

// insertTemplate();
