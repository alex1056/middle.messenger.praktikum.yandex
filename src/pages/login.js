import { handleSubmitClick } from "../modules/handleSubmitClick";
import { insertTemplate } from "../modules/insert-tmpl";
import { tmplLogin } from "../templates";
import { Form } from "../modules/form";
import { Validator } from "../modules/validator";

const pug = require("pug");

const form = new Form();

// console.log(form);

const compiled = pug.compile(tmplLogin);

const html = compiled({});

insertTemplate(html);
handleSubmitClick();

form.setPopup(document.body);

form.setEventListeners();
const currentForm = document.body.querySelector("#form");

const formValidator = new Validator(currentForm);
form.setFormValidator(formValidator);
