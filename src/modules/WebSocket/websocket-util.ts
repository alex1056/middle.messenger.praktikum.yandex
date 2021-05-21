const enum READY_STATE_STATUS {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

const READY_STATE_STATUS_TEXT = ['0-CONNECTING', '1-OPEN', '2-CLOSING', '3-CLOSED'];

export class WebSocketRun {
  socket: WebSocket;

  private subscribers: { [key: string]: any[] } = {};

  timerId: unknown;

  static _instance: WebSocketRun;

  constructor() {
    if (WebSocketRun._instance) {
      return WebSocketRun._instance;
    }
    this.timerId = null;
    this.socketSend = this.socketSend.bind(this);

    WebSocketRun._instance = this;
  }

  socketInit(userId: number, chatId: number, token: string) {
    if (!this.socket) {
      return new Promise((resolve) => {
        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
        this.socket.addEventListener('open', () => resolve(this.socket));
      });
    }
    if (this.socket) {
      if (WebSocketRun._instance.socket.readyState !== READY_STATE_STATUS.OPEN) {
        return new Promise((resolve) => {
          this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
          this.socket.addEventListener('open', () => resolve(this.socket));
        });
      }
    }

    return new Promise((resolve) => resolve(WebSocketRun._instance.socket));
  }

  socketPing() {
    this.timerId = setInterval(() => {
      // console.log('socketPing');
      this.socket.send(
        JSON.stringify({
          content: '',
          type: 'message',
        }),
      );
    }, 10000);
  }

  socketStopPing() {
    if (this.timerId) {
      clearInterval(Number(this.timerId));
    }
  }

  socketSend(textMsg: string) {
    const { readyState } = this.socket as any;
    if (readyState === READY_STATE_STATUS.OPEN) {
      this.socket.send(
        JSON.stringify({
          content: textMsg,
          type: 'message',
        }),
      );
    } else {
      const rs: number = readyState;
      console.log(`Статус соединения ${READY_STATE_STATUS_TEXT[rs]}`);
    }
  }

  socketGetOldMsgs() {
    const { readyState } = this.socket as any;

    if (readyState === READY_STATE_STATUS.OPEN) {
      this.socket.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        }),
      );
    } else {
      const rs: number = readyState;
      console.log(`Статус соединения ${READY_STATE_STATUS_TEXT[rs]}`);
    }
  }

  socketOnOpen(callBack: Function) {
    this.socket.addEventListener('open', () => callBack());

    // this.socket.addEventListener('open', () => {
    //   console.log('Соединение установлено');
    //   //   this.subscribers.open.forEach((subscriber: any) => subscriber());
    //   //   this.timerId = setInterval(() => this.socketSend(''), 3000);
    // });
  }

  socketClose(code = 1000) {
    // code = 1000 нормальное закрытие
    if (this.socket) {
      this.socket.close(code);
    }
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

  socketOnMessage(callBack: Function) {
    this.socket.addEventListener('message', (event: any) => {
      // console.log('Получены данные', event.data);
      callBack(event.data);
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
