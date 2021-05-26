"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Block = void 0;

var _EventBus = require("../../modules/EventBus");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EVENTS;

(function (EVENTS) {
  EVENTS["INIT"] = "init";
  EVENTS["FLOW_CDM"] = "flow:component-did-mount";
  EVENTS["FLOW_RENDER"] = "flow:render";
  EVENTS["FLOW_CDU"] = "flow:component-did-update";
  EVENTS["FLOW_CDU_REMOUNT"] = "flow:component-did-update-remount";
  EVENTS["FLOW_CDU_REMOUNT_ADD_EVENTS"] = "flow:component-did-update-remount-add-events";
})(EVENTS || (EVENTS = {}));

var Block = /*#__PURE__*/function () {
  function Block() {
    var _this = this;

    var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Block);

    _defineProperty(this, "props", void 0);

    _defineProperty(this, "eventBus", void 0);

    _defineProperty(this, "events", void 0);

    _defineProperty(this, "_element", null);

    _defineProperty(this, "rootQuery", void 0);

    _defineProperty(this, "_meta", void 0);

    _defineProperty(this, "setProps", function (nextProps) {
      if (!nextProps) {
        return;
      }

      _this.eventBus.emit(EVENTS.FLOW_CDU, _this.props, nextProps);

      Object.assign(_this.props, nextProps);
    });

    var eventBus = new _EventBus.EventBus();
    this._meta = {
      tagName: tagName,
      props: props
    };
    this.rootQuery = '';
    this.props = this._makePropsProxy(props);
    this.eventBus = eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(EVENTS.INIT);
  }

  _createClass(Block, [{
    key: "_registerEvents",
    value: function _registerEvents(eventBus) {
      eventBus.on(EVENTS.INIT, this.init.bind(this));
      eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
      eventBus.on(EVENTS.FLOW_CDU_REMOUNT, this._renderDOM.bind(this));
      eventBus.on(EVENTS.FLOW_CDU_REMOUNT_ADD_EVENTS, this._addEvents.bind(this));
    }
  }, {
    key: "_createResources",
    value: function _createResources() {
      var tagName = this._meta.tagName;
      this._element = this._createDocumentElement(tagName);
    }
  }, {
    key: "init",
    value: function init() {
      this._createResources();

      this.eventBus.emit(EVENTS.FLOW_CDM);
    }
  }, {
    key: "_componentDidMount",
    value: function _componentDidMount() {
      this.componentDidMount();
      this.eventBus.emit(EVENTS.FLOW_RENDER);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      return true;
    }
  }, {
    key: "_componentDidUpdate",
    value: function _componentDidUpdate(_oldProps, newProps) {
      this.props = this._makePropsProxy(newProps);
      var response = this.componentDidUpdate();

      if (response) {
        this._removeEvents();

        this.eventBus.emit(EVENTS.FLOW_RENDER);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      return true;
    }
  }, {
    key: "element",
    get: function get() {
      return this._element;
    }
  }, {
    key: "_addEvents",
    value: function _addEvents() {
      var _this2 = this;

      this.addEvents();
      var _ref = this.props,
          _ref$events = _ref.events,
          events = _ref$events === void 0 ? {} : _ref$events;
      Object.keys(events).forEach(function (eventName) {
        if (_this2._element) {
          _this2._element.addEventListener(eventName, events[eventName]);
        }
      });
    }
  }, {
    key: "addEvents",
    value: function addEvents() {
      return false;
    }
  }, {
    key: "_removeEvents",
    value: function _removeEvents() {
      var _this3 = this;

      this.removeEvents();
      var _ref2 = this.props,
          _ref2$events = _ref2.events,
          events = _ref2$events === void 0 ? {} : _ref2$events;
      Object.keys(events).forEach(function (eventName) {
        if (_this3._element) {
          _this3._element.removeEventListener(eventName, events[eventName]);
        }
      });
    }
  }, {
    key: "removeEvents",
    value: function removeEvents() {
      return false;
    }
  }, {
    key: "_renderDOM",
    value: function _renderDOM() {
      if (this.rootQuery) {
        try {
          var root = document.querySelector(this.rootQuery);

          while (root && root.firstChild) {
            root.removeChild(root.lastChild);
          }

          if (root) {
            root.appendChild(this.getContent());
            return root;
          }
        } catch (_unused) {
          console.log('DOM элемент не найден!');
        }

        this.eventBus.emit(EVENTS.FLOW_CDU_REMOUNT_ADD_EVENTS);
      }
    }
  }, {
    key: "_render",
    value: function _render() {
      var block = '';

      if (this.render()) {
        block = this.render();
      }

      if (this._element) {
        var template = document.createElement('template');
        template.insertAdjacentHTML('afterbegin', block);
        this._element = template.firstElementChild;
      }

      this._addEvents();

      this.eventBus.emit(EVENTS.FLOW_CDU_REMOUNT);
    }
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "getContent",
    value: function getContent() {
      if (this._element) {
        return this._element;
      }

      throw new Error('Рендеренный элемент = null');
    }
  }, {
    key: "_makePropsProxy",
    value: function _makePropsProxy(props) {
      var proxyData = new Proxy(props, {
        get: function get(target, prop) {
          var value = target[prop];
          return typeof value === 'function' ? value.bind(target) : value;
        },
        set: function set(target, prop, value) {
          target[prop] = value;
          return true;
        },
        deleteProperty: function deleteProperty() {
          throw new Error('Нет доступа');
        }
      });
      return proxyData;
    }
  }, {
    key: "_createDocumentElement",
    value: function _createDocumentElement(tagName) {
      return document.createElement(tagName);
    }
  }, {
    key: "show",
    value: function show() {
      this.getContent().classList.remove('hidden');
    }
  }, {
    key: "hide",
    value: function hide() {
      this.getContent().classList.add('hidden');
    }
  }]);

  return Block;
}();

exports.Block = Block;