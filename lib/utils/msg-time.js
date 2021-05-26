"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastMsgTimeToString = void 0;

var msToTime = function msToTime(duration) {
  var milliseconds = parseInt(String(duration % 1000));
  var seconds = Math.floor(duration / 1000) % 60;
  var minutes = Math.floor(duration / (1000 * 60)) % 60;
  var hours = Math.floor(duration / (1000 * 60 * 60)) % 24;
  var days = Math.floor(duration / (1000 * 60 * 60 * 24)) % 30;
  var months = Math.floor(duration / (1000 * 60 * 60 * 24 * 30)) % 12;
  var years = Math.floor(duration / (1000 * 60 * 60 * 24 * 365)) % 365;
  return {
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  };
};

var monthToStr = function monthToStr(month) {
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

var lastMsgTimeToString = function lastMsgTimeToString(msgTime) {
  var msgDate = new Date(msgTime);
  var nowDate = new Date();
  var duration = Number(nowDate) - Number(msgDate);
  var result = msToTime(duration);
  var days = result.days; // const days = msgDate.getDate(); // 0-31

  if (days < 1) {
    var minutes = msgDate.getMinutes() > 9 ? msgDate.getMinutes() : "0".concat(msgDate.getMinutes());
    return "".concat(msgDate.getHours(), ":").concat(minutes);
  }

  if (days <= 6) {
    var daysWeek = msgDate.getDay();

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
    var date1 = msgDate.getDate();
    var month1 = msgDate.getMonth();
    var year1 = msgDate.getFullYear();
    var monthStr = monthToStr(month1);
    return "".concat(date1, " ").concat(monthStr, " ").concat(year1);
  }
};

exports.lastMsgTimeToString = lastMsgTimeToString;