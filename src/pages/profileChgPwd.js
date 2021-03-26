import { handleSubmitClick } from '../modules/handleSubmitClick';
import { insertTemplate } from '../modules/insert-tmpl';
import { tmplProfileChngPwd } from '../templates';
const pug = require('pug');

const compiled = pug.compile(tmplProfileChngPwd);

const html = compiled({});

insertTemplate(html);
handleSubmitClick();
