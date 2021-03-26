import { handleSubmitClick } from '../modules/handleSubmitClick';
import { insertTemplate } from '../modules/insert-tmpl';
import { tmplLogin } from '../templates';
const pug = require('pug');

const compiled = pug.compile(tmplLogin);

const html = compiled({});

insertTemplate(html);
handleSubmitClick();
