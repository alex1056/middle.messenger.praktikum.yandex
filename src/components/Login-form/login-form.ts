import { Block } from '../Block';
import { Btn } from '../Button';
import { tmplLogin } from './template';
import './style.scss';
import { compile } from 'pug';

type TProps = {
  buttonText?: string;
  className?: string;
  disabled?: boolean;
  [propName: string]: any;
};

export class LoginForm extends Block<TProps> {
  constructor(props?: TProps) {
    //
    super('div', {
      buttonsubmit: new Btn({
        ...props,
      }),
    });
  }

  render(): string {
    const compiled = compile(tmplLogin);
    const html = compiled({
      buttonsubmit: this.props.buttonsubmit.render(),
    });
    return html;
  }
}
