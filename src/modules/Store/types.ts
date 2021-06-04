export type TState = {
  chats?: {
    [chatId: number]: TChat;
    data?: any;
  };
  [x: string]: any | {};
};

export type TChat = {
  data?: any;
};

export type TAction = { type: string; data?: any };
