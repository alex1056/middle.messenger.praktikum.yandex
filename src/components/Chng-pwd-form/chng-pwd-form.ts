// import { compile } from 'pug';
import { Block } from '../Block';
import { Btn } from '../Button';
// import { tmplChngPwd } from './template';
import './style.scss';
// @ts-ignore
import template from './template.pug';

type TProps = {
  [propName: string]: any;
};

export class ChngPwdForm extends Block<TProps> {
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
    // const compiled = compile(tmplChngPwd);
    const html = template({
      buttonsubmit: this.props.buttonsubmit.render(),
    });
    return html;
  }
}
