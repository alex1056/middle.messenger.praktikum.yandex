import { handleSubmitClick } from '../modules/handleSubmitClick';
import { insertTemplate } from '../modules/insert-tmpl';
import { tmplAddUser } from '../templates';

const pug = require('pug');

const compiled = pug.compile(tmplAddUser);

const html = compiled({});

insertTemplate(html);

handleSubmitClick();
