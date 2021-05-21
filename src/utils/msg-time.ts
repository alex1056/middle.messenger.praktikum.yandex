const msToTime = (duration: number) => {
  const milliseconds = parseInt(String(duration % 1000));
  const seconds = Math.floor(duration / 1000) % 60;
  const minutes = Math.floor(duration / (1000 * 60)) % 60;
  const hours = Math.floor(duration / (1000 * 60 * 60)) % 24;
  const days = Math.floor(duration / (1000 * 60 * 60 * 24)) % 30;
  const months = Math.floor(duration / (1000 * 60 * 60 * 24 * 30)) % 12;
  const years = Math.floor(duration / (1000 * 60 * 60 * 24 * 365)) % 365;
  return { years, months, days, hours, minutes, seconds, milliseconds };
};

const monthToStr = (month: number) => {
  switch (month) {
    case 0:
      return 'Янв';
    case 1:
      return 'Фев';
    case 2:
      return 'Мар';
    case 3:
      return 'Апр';
    case 4:
      return 'Мая';
    case 5:
      return 'Июн';
    case 6:
      return 'Июл';
    case 7:
      return 'Авг';
    case 8:
      return 'Сен';
    case 9:
      return 'Окт';
    case 10:
      return 'Ноя';
    case 11:
      return 'Дек';
    case 12:
      return 'Янв';
    default:
      return 'Err';
  }
};

export const lastMsgTimeToString = (msgTime: string) => {
  const msgDate = new Date(msgTime);
  const nowDate = new Date();
  const duration = Number(nowDate) - Number(msgDate);

  const result = msToTime(duration);
  const { days } = result;

  // const days = msgDate.getDate(); // 0-31

  if (days < 1) {
    const minutes = msgDate.getMinutes() > 9 ? msgDate.getMinutes() : `0${msgDate.getMinutes()}`;

    return `${msgDate.getHours()}:${minutes}`;
  }

  if (days <= 6) {
    const daysWeek = msgDate.getDay();
    switch (daysWeek) {
      case 0:
        return 'Пн';
      case 1:
        return 'Вт';
      case 2:
        return 'Ср';
      case 3:
        return 'Чт';
      case 4:
        return 'Пт';
      case 5:
        return 'Сб';
      case 6:
        return 'Вс';
      default:
        return 'Err';
    }
  } else {
    const date1 = msgDate.getDate();
    const month1 = msgDate.getMonth();
    const year1 = msgDate.getFullYear();
    const monthStr = monthToStr(month1);

    return `${date1} ${monthStr} ${year1}`;
  }
};
