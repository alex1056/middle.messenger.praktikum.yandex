import { Block } from '../Block';
import { tmplMsgs } from './template';
import { Feed } from '../Feed';
import { SendForm } from '../Send-form';
import { localsIndexPage } from '../../locals';
import { compile } from 'pug';

type TProps = { [propName: string]: any };

export class Msgs extends Block {
  props: TProps;

  constructor(props?: TProps) {
    super('div', {
      sendForm: new SendForm({ ...props, ...localsIndexPage }),
      feedComponent: new Feed({ ...props, ...localsIndexPage }),
    });
  }

  render(): string {
    const compiled = compile(tmplMsgs);
    const html = compiled({
      ...localsIndexPage,
      sendForm: this.props.sendForm.render(),
      feedComponent: this.props.feedComponent.render(),
    });
    return html;
  }
}
