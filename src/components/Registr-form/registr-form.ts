import { compile } from 'pug';
import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplRegistr } from './template';
import './style.scss';

type TProps = {
  [propName: string]: any;
};

export class RegistrForm extends Block<TProps> {
  props: TProps;

  constructor(props?: TProps) {
    super('div', {
      buttonsubmit: new Btn({
        ...props,
        buttonText: 'Зарегистрироваться',
        className: 'btn_disabled',
        disabled: true,
      }),
    });
  }

  render(): string {
    const compiled = compile(tmplRegistr);
    const html = compiled({
      buttonsubmit: this.props.buttonsubmit.render(),
    });
    return html;
  }
}
