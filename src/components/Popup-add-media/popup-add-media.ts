import { Block } from "../Block";
import { Btn } from "../Button";
import { tmplAddMedia } from "./template";
import "./style.scss";
const pug = require("pug");

type TProps = { [propName: string]: any };

export class PopupAddMedia extends Block {
  props: TProps;
  constructor(props?: TProps) {
    super("div", props);
  }
  render(): string {
    const compiled = pug.compile(tmplAddMedia);
    const html = compiled(this.props);
    return html;
  }
}
