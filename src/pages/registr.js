import { handleSubmitClick } from '../modules/handleSubmitClick';
import { insertTemplate } from '../modules/insert-tmpl';
import { tmplRegistr } from '../templates';
import { Form } from '../modules/form';
import { Validator } from '../modules/validator';

const pug = require('pug');

const form = new Form();

const compiled = pug.compile(tmplRegistr);

const html = compiled({});

insertTemplate(html);
handleSubmitClick();

form.setPopup(document.body);
form.setEventListeners();
const currentForm = document.body.querySelector('#form');
const formValidator = new Validator(currentForm);
formValidator.setHandleLabels(true);
form.setFormValidator(formValidator);
