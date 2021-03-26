import { insertTemplate } from '../modules/insert-tmpl';
import { tmpl404 } from '../templates';
const pug = require('pug');

const compiled = pug.compile(tmpl404);

const html = compiled({});

insertTemplate(html);
