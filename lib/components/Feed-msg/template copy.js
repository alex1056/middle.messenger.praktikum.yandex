"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tmplFeed = void 0;
var tmplFeed = "\ndiv(class=\"feed\")\n    div(class=\"feed__container\")\n        p(class=\"feed__date\") #{feed.lastMsg}\n        each item, i in feed.feedItems\n            if item.incomingMsg\n                div(class=\"feed__msg-cont\")\n                    each elem in item.msg\n                        p(class=\"feed__msg-text\")= elem\n                    span(class=\"feed__msg-time\") #{item.dateStatus.received}\n                div(class=\"feed__msg-img\")\n                    img(src=item.mediaSrc alt=\"\u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043E\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\")\n                    span(class=\"feed__msg-time feed__msg-time_img\") #{item.dateStatus.received}\n            else\n                div(class=\"feed__answer-cont\")\n                    each elem in item.msg\n                        p(class=\"feed__msg-text\")= elem\n                    div(class=\"feed__answer-time-cont\")\n                        span(class=\"time-status\") #{item.dateStatus.sent}";
exports.tmplFeed = tmplFeed;