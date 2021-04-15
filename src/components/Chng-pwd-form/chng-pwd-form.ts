import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplChngPwd } from './template';
import './style.scss';

const pug = require('pug');

type TProps = { [propName: string]: any };

export class ChngPwdForm extends Block {
  props: TProps;

  constructor(props?: TProps) {
    super('div', {
      buttonsubmit: new Btn({
        ...props,
        buttonText: 'Сохранить',
        className: 'pform__btn-save',
      }),
    });
  }

  render(): string {
    const compiled = pug.compile(tmplChngPwd);
    const html = compiled({
      buttonsubmit: this.props.buttonsubmit.render(),
    });
    return html;
  }
}
