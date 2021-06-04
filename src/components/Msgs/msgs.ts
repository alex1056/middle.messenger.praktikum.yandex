import { Block } from '../Block';
import { Feed } from '../Feed';
import { SendForm } from '../Send-form';
import { localsIndexPage } from '../../LocalsData';
// @ts-ignore
import template from './template.pug';

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
    const html = template({
      ...this.props,
      ...localsIndexPage,
      sendForm: this.props.sendForm.render(),
      feedComponent: this.props.feedComponent.render(),
    });
    return html;
  }
}
