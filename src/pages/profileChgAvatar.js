import { insertTemplate } from '../modules/insert-tmpl';
import { tmplProfileChngAvatar } from '../templates';
const pug = require('pug');

const compiled = pug.compile(tmplProfileChngAvatar);

const html = compiled({});

insertTemplate(html);
