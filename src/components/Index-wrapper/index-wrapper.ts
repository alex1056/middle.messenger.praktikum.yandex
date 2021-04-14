import { Block } from "../Block";
import { ChatsList } from "../Chats-list";
import { Msgs } from "../Msgs";

import { tmplIndexWrapper } from "./template";
import "./style.scss";
const pug = require("pug");

type TProps = { [propName: string]: any };

export class IndexWrapper extends Block {
  props: TProps;
  constructor(props?: TProps) {
    super("div", {
      chatsList: new ChatsList(props),
      msgs: new Msgs(props),
    });
  }
  render(): string {
    const compiled = pug.compile(tmplIndexWrapper);
    const html = compiled({
      chatsList: this.props.chatsList.render(),
      msgs: this.props.msgs.render(),
    });
    return html;
  }
}
