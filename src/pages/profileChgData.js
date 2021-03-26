import { handleSubmitClick } from '../modules/handleSubmitClick';
import { insertTemplate } from '../modules/insert-tmpl';
import { tmplProfileChngData } from '../templates';
const pug = require('pug');

const compiled = pug.compile(tmplProfileChngData);

const html = compiled({});

insertTemplate(html);
handleSubmitClick();
