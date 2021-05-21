"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideOnClickOutside = hideOnClickOutside;

var isVisible = function isVisible(elem) {
  return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
};

function hideOnClickOutside(element) {
  var outsideClickListener = function outsideClickListener(event) {
    if (!element.contains(event.target) && isVisible(element)) {
      // or use: event.target.closest(selector) === null
      element.style.display = 'none';
      removeClickListener();
    }
  };

  function removeClickListener() {
    document.removeEventListener('click', outsideClickListener);
  }

  document.addEventListener('click', outsideClickListener);
}