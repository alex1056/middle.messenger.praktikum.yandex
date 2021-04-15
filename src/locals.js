export const localsIndexPage = {
  feed: {
    name: 'Андрей',
    imgSrc: require('../static/img/cat-avatar.jpeg'),
    lastMsg: '19 июня',
    feedItems: [
      {
        incomingMsg: true,
        msg: [
          'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты спленкой.',
          'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
        ],
        dateStatus: { received: '10:19', showed: true },
        mediaSrc: require('../static/img/test2.jpg'),
      },
      {
        incomingMsg: false,
        msg: ['Интересная находка!', 'Молодец!'],
        dateStatus: { sent: '10:19', showed: true },
      },
      {
        incomingMsg: false,
        msg: ['Интересная находка!', 'Молодец!'],
        dateStatus: { sent: '10:19', showed: true },
      },
      {
        incomingMsg: false,
        msg: ['Интересная находка!', 'Молодец!'],
        dateStatus: { sent: '10:19', showed: true },
      },
      {
        incomingMsg: false,
        msg: ['Интересная находка!', 'Молодец!'],
        dateStatus: { sent: '10:19', showed: true },
      },
    ],
  },

  userList: [
    {
      name: 'Андрей',
      lastMsg: 'Друзья, у меня для вас особенный выпуск новостей!...',
      unreadMsg: 8,
      lastMsgdate: '1 мая 2020',
      imgSrc: require('../static/img/cat-avatar.jpeg'),
    },
    {
      name: 'Андрей Владимирович',
      lastMsg: 'Друзья, у меня для вас торт!',
      unreadMsg: 0,
      lastMsgdate: '10:57',
      imgSrc: require('../static/img/avatar.png'),
    },
    {
      name: 'Андрей',
      lastMsg: 'Друзья, у меня для вас особенный выпуск новостей!...',
      unreadMsg: 7,
      lastMsgdate: '1 мая 2020',
      imgSrc: require('../static/img/avatar.png'),
    },
    {
      name: 'Андрей Владимирович',
      lastMsg: 'Друзья, у меня для вас торт!',
      unreadMsg: 0,
      lastMsgdate: '10:57',
      imgSrc: require('../static/img/cat-avatar.jpeg'),
    },
    {
      name: 'Андрей',
      lastMsg: 'Друзья, у меня для вас особенный выпуск новостей!...',
      unreadMsg: 7,
      lastMsgdate: '1 мая 2020',
      imgSrc: require('../static/img/cat-avatar.jpeg'),
    },
  ],
};
