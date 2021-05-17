const enum WSSTATUS {
  INIT = 'init',
  ONLINE = 'ws-online',
  DISCONNECTED = 'ws-disconnected',
  ERROR = 'ws-error',
}

export class WebSocketRun {
  socket: WebSocket;

  private subscribers: { [key: string]: any[] } = {};

  timerId: unknown;

  status: WSSTATUS;

  static _instance: WebSocketRun;

  constructor() {
    if (WebSocketRun._instance) {
      return WebSocketRun._instance;
    }
    this.timerId = null;
    this.socketSend = this.socketSend.bind(this);
    this.status = WSSTATUS.INIT;

    WebSocketRun._instance = this;
  }

  socketInit(userId: number, chatId: number, token: string) {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
      this.status = WSSTATUS.INIT;
      this.socket.addEventListener('open', () => resolve(this.socket));
    });
  }

  // socketPing() {
  //   this.timerId = setInterval(() => {
  //     this.socket.send(
  //       JSON.stringify({
  //         content: '',
  //         type: 'ping',
  //       }),
  //     );
  //   }, 2000);
  // }

  // socketStopPing() {
  //   if (this.timerId) {
  //     clearInterval(Number(this.timerId));
  //   }
  // }

  socketSend(textMsg: string) {
    if (this.status !== WSSTATUS.ONLINE) {
      this.socket.send(
        JSON.stringify({
          content: textMsg,
          type: 'message',
        }),
      );
      // console.log(`Сообщение "${textMsg}" отправлено`);
    }
  }

  socketOnOpen(callBack: Function) {
    this.socket.addEventListener('open', () => callBack());
    this.status = WSSTATUS.ONLINE;
    // this.socket.addEventListener('open', () => {
    //   console.log('Соединение установлено');
    //   //   this.subscribers.open.forEach((subscriber: any) => subscriber());
    //   //   this.timerId = setInterval(() => this.socketSend(''), 3000);
    // });
  }

  socketOnClose() {
    this.socket.addEventListener('close', (event: any) => {
      this.status = WSSTATUS.DISCONNECTED;
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      //   this.subscribers.close.forEach((subscriber: any) => subscriber(event.reason));
    });
  }

  socketOnMessage(callBack: Function) {
    this.socket.addEventListener('message', (event: any) => {
      console.log('Получены данные', event.data);
      callBack(event.data);
      //   this.subscribers.message.forEach((subscriber: any) => subscriber(event.data));
    });
  }

  socketOnError() {
    this.socket.addEventListener('error', (event: any) => {
      this.status = WSSTATUS.ERROR;
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
