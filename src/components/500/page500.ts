import { Block } from "../Block";
import { tmpl500 } from "./template";
const pug = require("pug");

type TProps = { [propName: string]: any };

export class Page500 extends Block {
  props: TProps;
  constructor(props?: TProps) {
    super("div", props);
  }

  render(): string {
    const compiled = pug.compile(tmpl500);
    const html = compiled({});
    return html;
  }
}
