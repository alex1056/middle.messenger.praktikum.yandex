import { Block } from '../Block'
// import { Btn } from "../Button";
// import { ProfileFormCtrls } from "../Profile-form-ctrls";
import { tmplMsgs } from './template'
import { Feed } from '../Feed'
import { SendForm } from '../Send-form'

// import "./style.scss";
import { localsIndexPage } from '../../locals'
const pug = require('pug')

type TProps = { [propName: string]: any }

export class Msgs extends Block {
  props: TProps
  constructor(props?: TProps) {
    super('div', {
      sendForm: new SendForm({ ...props, ...localsIndexPage }),
      feedComponent: new Feed({ ...props, ...localsIndexPage }),
    })
  }
  render(): string {
    const compiled = pug.compile(tmplMsgs)
    const html = compiled({
      ...localsIndexPage,
      sendForm: this.props.sendForm.render(),
      feedComponent: this.props.feedComponent.render(),
    })
    return html
  }
}
