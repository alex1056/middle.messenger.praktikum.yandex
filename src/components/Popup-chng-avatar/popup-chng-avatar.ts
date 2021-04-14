import { Block } from "../Block";
import { Btn } from "../Button";
// import { ProfileFormCtrls } from "../Profile-form-ctrls";
import { tmplPopupChngAvatar } from "./template";
import "./style.scss";
const pug = require("pug");

type TProps = { [propName: string]: any };

export class PopupChngAvatar extends Block {
  props: TProps;
  constructor(props?: TProps) {
    super("div", {
      ...props,
      buttonChange: new Btn({ buttonText: "Поменять" }),
    });
  }
  render(): string {
    const compiled = pug.compile(tmplPopupChngAvatar);
    const html = compiled({
      ...this.props,
      buttonChange: this.props.buttonChange.render(),
    });
    return html;
  }
}
