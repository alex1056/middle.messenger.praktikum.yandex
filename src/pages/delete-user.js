import { insertTemplate } from '../modules/insert-tmpl';
import { tmplDeleteUser } from '../templates';

const pug = require('pug');

const compiled = pug.compile(tmplDeleteUser);

const html = compiled({});

insertTemplate(html);
