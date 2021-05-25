import { compile } from 'pug';
import { Block } from '../Block';
import { Btn } from '../Button';
import { ProfileFormCtrls } from '../Profile-form-ctrls';
import { tmplProfile } from './template';
import './style.scss';

type TProps = {
  className?: string;
  disabled?: boolean;
  [propName: string]: any;
};

export class ProfileForm extends Block<TProps> {
  props: TProps;

  constructor(props: TProps) {
    //
    super('div', {
      ...props,
      buttonsubmit: new Btn({ ...props, buttonText: 'Сохранить' }),
      ctrls: new ProfileFormCtrls(props),
    });
  }

  render(): string {
    const compiled = compile(tmplProfile);
    const html = compiled({
      ...this.props,
      buttonsubmit: this.props.buttonsubmit.render(),
      ctrls: this.props.ctrls.render(),
    });
    return html;
  }
}
