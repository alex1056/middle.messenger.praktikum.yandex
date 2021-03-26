import { handleSubmitClick } from '../modules/handleSubmitClick';
import { insertTemplate } from '../modules/insert-tmpl';
import { tmplRegistr } from '../templates';
const pug = require('pug');

const compiled = pug.compile(tmplRegistr);

const html = compiled({});

insertTemplate(html);
handleSubmitClick();
