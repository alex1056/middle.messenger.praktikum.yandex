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
  form?: any;
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

  chngUserProfileData = (options: Options) => {
    const { data } = options;
    const headers = {
      'content-type': 'application/json',
    };
    return this.api.put(`${urlApi}/user/profile`, { data, headers });
  };

  chngUserPassword = (options: Options) => {
    const { data } = options;
    const headers = {
      'content-type': 'application/json',
    };
    return this.api.put(`${urlApi}/user/password`, { data, headers });
  };

  chngUserAvatar = (options: Options) => {
    const { form } = options;
    return this.api.put(`${urlApi}/user/profile/avatar`, { form });
  };

  chngChatAvatar = (options: Options) => {
    const { form } = options;
    return this.api.put(`${urlApi}/chats/avatar`, { form });
  };

  getChats = () => this.api.get(`${urlApi}/chats`, {});

  createChat = (title: string) => {
    const headers = {
      'content-type': 'application/json',
    };
    return this.api.post(`${urlApi}/chats`, { data: { title }, headers });
  };

  addUsersToChat = (users: number[], chatId: number) => {
    const headers = {
      'content-type': 'application/json',
    };
    return this.api.put(`${urlApi}/chats/users`, { data: { users, chatId }, headers });
  };

  deleteUsersFromChat = (users: number[], chatId: number) => {
    const headers = {
      'content-type': 'application/json',
    };
    return this.api.delete(`${urlApi}/chats/users`, { data: { users, chatId }, headers });
  };

  findUser = (login: string) => {
    const headers = {
      'content-type': 'application/json',
    };
    return this.api.post(`${urlApi}/user/search`, { data: { login }, headers });
  };

  getChatToken = (chatId: number) => {
    const headers = {
      'content-type': 'application/json',
    };
    return this.api.post(`${urlApi}/chats/token/${chatId}`, { headers });
  };

  deleteChat = (chatId: string) => {
    const headers = {
      'content-type': 'application/json',
    };
    return this.api.delete(`${urlApi}/chats`, { data: { chatId }, headers });
  };

  getChatUsers = (chatId: string) => {
    const headers = {
      'content-type': 'application/json',
    };
    return this.api.get(`${urlApi}/chats/${chatId}/users`, { headers });
  };

  getChatFiles = (chatId: number) => this.api.get(`${urlApi}/chats/${chatId}/files`);

  getChatsToken = (chatId: number) => this.api.post(`${urlApi}/chats/token/${chatId}`);
}
