import { Block } from "../Block";
import { Btn } from "../Button";
// import { ProfileFormCtrls } from "../Profile-form-ctrls";
import { tmplPopupAddUser } from "./template";
import "./style.scss";
const pug = require("pug");

type TProps = { [propName: string]: any };

export class PopupAddUser extends Block {
  props: TProps;
  constructor(props?: TProps) {
    super("div", {
      ...props,
      buttonCancel: new Btn({
        buttonText: "Отмена",
        className: "popup__btn btn_small btn_white",
        // disabled: true,
      }),
      buttonAdd: new Btn({
        buttonText: "Добавить",
        className: "popup__btn btn_small btn_disabled",
        disabled: true,
      }),
    });
  }
  render(): string {
    const compiled = pug.compile(tmplPopupAddUser);
    const html = compiled({
      ...this.props,
      buttonCancel: this.props.buttonCancel.render(),
      buttonAdd: this.props.buttonAdd.render(),
    });
    return html;
  }
}
