import { handleSubmitClick } from '../modules/handleSubmitClick';
import { insertTemplate } from '../modules/insert-tmpl';
import { tmplIndexPage } from '../templates';
import { localsIndexPage } from '../locals';

const pug = require('pug');

const compiled = pug.compile(tmplIndexPage);

const html = compiled(localsIndexPage);

insertTemplate(html);

handleSubmitClick();
