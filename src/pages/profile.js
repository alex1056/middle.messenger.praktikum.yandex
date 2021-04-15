import { insertTemplate } from '../modules/insert-tmpl';
import { tmplProfile } from '../templates';

const pug = require('pug');

const compiled = pug.compile(tmplProfile);

const html = compiled({});

insertTemplate(html);
