import { Block } from '../Block';
// @ts-ignore
import template from './template.pug';

type TPropsChatsList = {
  [propName: string]: any;
  chatsData: {
    id: string;
    avatar: string;
    title: string;
    created_by: number;
    [last_message: string]: any;
    unread_count: number;
  }[];
};

export class ChatList extends Block<TPropsChatsList> {
  props: TPropsChatsList;

  constructor(props: TPropsChatsList) {
    super('div', props);
  }

  render(): string {
    const html = template(this.props);
    return html;
  }
}
