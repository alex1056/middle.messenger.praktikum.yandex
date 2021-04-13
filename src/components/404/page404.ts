import { Block } from "../Block";
import { tmpl404 } from "./template";
const pug = require("pug");

type TProps = { [propName: string]: any };

export class Page404 extends Block {
  props: TProps;
  constructor(props?: TProps) {
    super("div", props);
  }

  render(): string {
    const compiled = pug.compile(tmpl404);
    const html = compiled({});
    return html;
  }
}
