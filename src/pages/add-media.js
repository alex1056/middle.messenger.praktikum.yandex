import { handleSubmitClick } from '../modules/handleSubmitClick';
import { insertTemplate } from '../modules/insert-tmpl';
import { tmplIndexPage, tmplAddMedia } from '../templates';
import { localsIndexPage } from '../locals';
const pug = require('pug');

const compiledIndexPage = pug.compile(tmplIndexPage);

let html = compiledIndexPage(localsIndexPage);

insertTemplate(html);

const compiledAddMediaPopup = pug.compile(tmplAddMedia);

html = compiledAddMediaPopup();

insertTemplate(html, false);

handleSubmitClick();
