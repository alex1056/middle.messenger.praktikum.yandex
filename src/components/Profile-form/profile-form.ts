import { Block } from '../Block'
import { Btn } from '../Button'
import { ProfileFormCtrls } from '../Profile-form-ctrls'
import { tmplProfile } from './template'
import './style.scss'
const pug = require('pug')

type TProps = { [propName: string]: any }

export class ProfileForm extends Block {
  props: TProps
  constructor(props?: TProps) {
    super('div', {
      buttonsubmit: new Btn({ ...props, buttonText: 'Сохранить' }),
      ctrls: new ProfileFormCtrls(props),
    })
  }
  render(): string {
    const compiled = pug.compile(tmplProfile)
    const html = compiled({
      buttonsubmit: this.props.buttonsubmit.render(),
      ctrls: this.props.ctrls.render(),
      disabled: true,
    })
    return html
  }
}
