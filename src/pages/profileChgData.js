import { handleSubmitClick } from '../modules/handleSubmitClick';
import { insertTemplate } from '../modules/insert-tmpl';
import { tmplProfileChngData } from '../templates';
import { Form } from '../modules/form';
import { Validator } from '../modules/validator';

const pug = require('pug');

const compiled = pug.compile(tmplProfileChngData);

const html = compiled({});

insertTemplate(html);
handleSubmitClick();

const form = new Form();
form.setPopup(document.body);
form.setEventListeners();
const currentForm = document.body.querySelector('#form');
const formValidator = new Validator(currentForm);
form.setFormValidator(formValidator);
