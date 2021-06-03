import { Block } from '../Block';
// import { tmplMsgs } from './template';
import { Feed } from '../Feed';
import { SendForm } from '../Send-form';
import { localsIndexPage } from '../../LocalsData';
// @ts-ignore
const template = require('./template.pug');

type TProps = { [propName: string]: any };

export class Msgs extends Block<TProps> {
  props: TProps;

  constructor(props: TProps = {}) {
    super('div', {
      ...props,
      sendForm: new SendForm(),
      feedComponent: new Feed({ ...props, ...localsIndexPage }),
    });
  }

  render(): string {
    // const compiled = compile(tmplMsgs);
    const html = template({
      ...this.props,
      ...localsIndexPage,
      sendForm: this.props.sendForm.render(),
      feedComponent: this.props.feedComponent.render(),
    });
    return html;
  }
}
