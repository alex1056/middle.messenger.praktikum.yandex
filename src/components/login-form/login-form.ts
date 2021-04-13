import { Block } from "../Block";
import { Btn } from "../Button";
import { tmplLogin } from "./template";
const pug = require("pug");

type TProps = { [propName: string]: any };

export class LoginForm extends Block {
  props: TProps;
  constructor(props?: TProps) {
    super("div", { buttonsubmit: new Btn() });
  }
  render(): string {
    const compiled = pug.compile(tmplLogin);
    const html = compiled({
      buttonsubmit: this.props.buttonsubmit.render(),
    });
    return html;
  }
}
