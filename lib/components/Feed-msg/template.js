"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tmplFeedMsg = void 0;
var tmplFeedMsg = "if data.incomingMsg\n    div(class=\"feed__msg-cont\")\n        p(class=\"feed__msg-text\") #{data.content}\n        span(class=\"feed__msg-time\") #{data.time}\nelse\n    div(class=\"feed__answer-cont\")\n        p(class=\"feed__msg-text\") #{data.content}\n        div(class=\"feed__answer-time-cont\")\n            span(class=\"time-status\" class= true ? \"some-class-name\" : \"\") #{data.time}";
exports.tmplFeedMsg = tmplFeedMsg;