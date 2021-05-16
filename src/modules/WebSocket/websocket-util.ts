export class WebSocketRun {
  socket: WebSocket;

  private subscribers: { [key: string]: any[] } = {};

  static _instance: WebSocketRun;

  constructor() {
    if (WebSocketRun._instance) {
      return WebSocketRun._instance;
    }
    WebSocketRun._instance = this;
  }

  socketInit(userId: number, chatId: number, token: string) {
    console.log('userId, chatId, token', userId, chatId, token);
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
  }

  socketOnOpen() {
    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      this.socket.send(
        JSON.stringify({
          content: 'Моё первое сообщение миру!',
          type: 'message',
        }),
      );
      //   this.subscribers.open.forEach((subscriber: any) => subscriber());
    });
  }

  socketOnClose() {
    this.socket.addEventListener('close', (event: any) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      //   this.subscribers.close.forEach((subscriber: any) => subscriber(event.reason));
    });
  }

  socketOnMessage() {
    this.socket.addEventListener('message', (event: any) => {
      console.log('Получены данные', event.data);
      //   this.subscribers.message.forEach((subscriber: any) => subscriber(event.data));
    });
  }

  socketOnError() {
    this.socket.addEventListener('error', (event: any) => {
      console.log('Ошибка', event.message);
      //   this.subscribers.error.forEach((subscriber: any) => subscriber(event.message));
    });
  }

  subscribe(eventName: string, callback: Function) {
    if (!this.subscribers[eventName]) {
      this.subscribers[eventName] = [];
    }
    this.subscribers[eventName].push(callback);
    return {
      unsubscribe: function () {
        this.subscribers[eventName] = this.subscribers[eventName].filter((subscriber: any) => subscriber !== callback);
      }.bind(this),
    };
  }
}
