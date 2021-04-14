import { Block } from "../Block";
// import { Btn } from "../Button";
import { tmplSendForm } from "./template";
import "./style.scss";
const pug = require("pug");

type TProps = { [propName: string]: any };

export class SendForm extends Block {
  props: TProps;
  constructor(props?: TProps) {
    super("div", props);
  }
  render(): string {
    const compiled = pug.compile(tmplSendForm);
    const html = compiled({});
    return html;
  }
}
