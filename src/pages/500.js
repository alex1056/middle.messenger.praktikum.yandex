import { insertTemplate } from "../modules/insert-tmpl";
import { tmpl500 } from "../templates";
const pug = require("pug");

const compiled = pug.compile(tmpl500);

const html = compiled({});

insertTemplate(html);
