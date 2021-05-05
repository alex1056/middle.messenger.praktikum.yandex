import { HTTPTransport } from './xmlHttpTransport';
import { urlApi } from './config';

// type TSignUp = {
//   first_name: 'string';
//   second_name: 'string';
//   login: 'string';
//   email: 'string';
//   password: 'string';
//   phone: 'string';
// };

type Options = {
  // method?: METHODS;
  data?: any;
  timeout?: number;
  headers?: { [key: string]: string };
};

export type TDataLogin = {
  login: string;
  password: string;
};

export class Api {
  api: HTTPTransport;

  constructor() {
    this.api = new HTTPTransport();
  }

  signUp = (options: Options) => {
    const headers = {
      'content-type': 'application/json',
    };
    return this.api.post(`${urlApi}/auth/signup`, { ...options, headers });
  };

  signIn = (options: Options) => {
    const { data } = options;
    const headers = {
      'content-type': 'application/json',
    };
    return this.api.post(`${urlApi}/auth/signin`, { data, headers });
  };

  logOut = () => this.api.post(`${urlApi}/auth/logout`, {});

  getUserData = () => this.api.get(`${urlApi}/auth/user`, {});

  getChats = () => this.api.get(`${urlApi}/chats`, {});

  createChat = (title: string) => {
    const headers = {
      'content-type': 'application/json',
    };
    return this.api.post(`${urlApi}/chats`, { data: { title }, headers });
  };

  deleteChat = (chatId: string) => {
    const headers = {
      'content-type': 'application/json',
    };
    return this.api.delete(`${urlApi}/chats`, { data: { chatId }, headers });
  };

  getChatFiles = (chatId: number) => this.api.get(`${urlApi}/chats/${chatId}/files`);

  getChatsToken = (chatId: number) => this.api.post(`${urlApi}/chats/token/${chatId}`);
}
