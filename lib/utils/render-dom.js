"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderDOM = renderDOM;

function renderDOM(query, block) {
  var root = document.querySelector(query);

  if (root) {
    root.appendChild(block);
    return root;
  }

  throw new Error('Root элемент не найден!');
}