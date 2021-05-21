"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexWrapper = void 0;

var _pug = require("pug");

var _Block2 = require("../Block");

var _ChatsListWrapper = require("../Chats-list-wrapper");

var _Msgs = require("../Msgs");

var _FeedMsg = require("../Feed-msg");

var _template = require("./template");

require("./style.scss");

var _isEmpty = require("../../utils/is-empty");

var _Store = require("../../modules/Store");

var _Api = require("../../modules/Api");

var _WebSocket = require("../../modules/WebSocket");

var _transfromChatsData = require("../../utils/transfrom-chats-data");

var _timeParse = require("../../utils/timeParse");

var _Router = require("../../modules/Router");

var _sanitizeHtml = require("../../utils/sanitizeHtml");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var api = new _Api.Api();
var store = (0, _Store.createStore)();
var router = new _Router.Router('.page');

var _store$getState = store.getState(),
    userData = _store$getState.userData;

var ws = new _WebSocket.WebSocketRun();

var IndexWrapper = /*#__PURE__*/function (_Block) {
  _inherits(IndexWrapper, _Block);

  var _super = _createSuper(IndexWrapper);

  function IndexWrapper(props) {
    var _this;

    _classCallCheck(this, IndexWrapper);

    // console.log('Index Wrapper', props);
    _this = _super.call(this, 'div', {
      chatList: new _ChatsListWrapper.ChatsListWrapper({
        chatsData: [{
          id: '',
          avatar: '',
          title: '',
          created_by: 0,
          last_message: null,
          unread_count: 0
        }]
      }),
      msgs: new _Msgs.Msgs({
        // activeChatData: { id: '', avatar: '', title: '', created_by: 0, last_message: null, unread_count: 0 },
        activeChatData: null
      })
    });

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "dataset", void 0);

    _defineProperty(_assertThisInitialized(_this), "token", void 0);

    var _ref = props,
        rootQuery = _ref.rootQuery;

    if (IndexWrapper._instance) {
      return _possibleConstructorReturn(_this, IndexWrapper._instance);
    }

    _this.rootQuery = rootQuery;
    _this.addChat = _this.addChat.bind(_assertThisInitialized(_this));
    _this.deleteChat = _this.deleteChat.bind(_assertThisInitialized(_this));
    IndexWrapper._instance = _assertThisInitialized(_this);
    return _this;
  }

  _createClass(IndexWrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // console.log('>>>>>!!! componentDidMount');
      if (!userData || (0, _isEmpty.isEmpty)(userData)) {
        api.getUserData().then(function (res) {
          if (res.ok) {
            var userDataFromServer = res.json();
            store.dispatch({
              type: _Store.Actions.GET_USER_DATA,
              data: userDataFromServer
            });
            userData = store.getState().userData;
          }
        });
      }

      api.getChats().then(function (res) {
        var chatsDataReply = res.json();
        var chatsDataChanged = (0, _transfromChatsData.transfromChatsData)(chatsDataReply);
        store.dispatch({
          type: _Store.Actions.CHATS_UPDATE,
          data: chatsDataChanged
        });

        var _store$getState2 = store.getState(),
            chatsData = _store$getState2.chatsData,
            activeChatId = _store$getState2.activeChatId;

        var activeChatData = (0, _Store.chatsDataSelector)(activeChatId);
        var history = router.history;
        var state = history.state;
        var activeChatIdLocal = activeChatId;

        if (!state) {
          activeChatIdLocal = null;
        }

        if (activeChatIdLocal) {
          IndexWrapper._instance.wsInit(activeChatIdLocal);
        }

        IndexWrapper._instance.setProps({
          activeChatData: activeChatIdLocal ? activeChatData : null,
          activeChatId: Number(activeChatIdLocal),
          chatList: new _ChatsListWrapper.ChatsListWrapper({
            activeChatId: Number(activeChatIdLocal),
            chatsData: chatsData.data
          }),
          msgs: new _Msgs.Msgs({
            activeChatId: Number(activeChatIdLocal),
            activeChatData: activeChatIdLocal ? activeChatData : null
          })
        });
      });
      return true;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _store$getState3 = store.getState(),
          chatsData = _store$getState3.chatsData;

      var activeChatId = this.props.activeChatId;
      var activeChatDataPrevProps = this.props.activeChatData;
      var activeChatData = (0, _Store.chatsDataSelector)(Number(activeChatId));
      var history = router.history;
      var state = history.state; // IndexWrapper._instance.updateMsgCount(activeChatId);

      if (!state || !activeChatId || !activeChatDataPrevProps) {
        return true;
      }

      if (activeChatId && activeChatDataPrevProps.id === activeChatId) {
        IndexWrapper._instance.wsInit(Number(activeChatId)); // console.log('activeChatId && activeChatDataPrevProps.id === activeChatId');


        return true;
      }

      var activeChatIdLocal = activeChatId;

      if (!state) {
        activeChatIdLocal = null;
      } else if (state.activeChatId) {
        var activeChatIdFromParams = Number(state.activeChatId);
        if (activeChatIdFromParams !== activeChatId) activeChatIdLocal = activeChatIdFromParams;
        activeChatData = (0, _Store.chatsDataSelector)(Number(activeChatIdLocal));

        if (activeChatDataPrevProps) {
          if (activeChatIdLocal && Number(activeChatDataPrevProps.id) !== Number(activeChatIdLocal)) {
            IndexWrapper._instance.setProps({
              activeChatData: activeChatIdLocal ? activeChatData : null,
              activeChatId: Number(activeChatIdLocal),
              chatList: new _ChatsListWrapper.ChatsListWrapper({
                activeChatId: Number(activeChatIdLocal),
                chatsData: chatsData.data
              }),
              msgs: new _Msgs.Msgs({
                activeChatId: Number(activeChatIdLocal),
                activeChatData: activeChatIdLocal ? activeChatData : null
              })
            });
          }
        } else {
          IndexWrapper._instance.setProps({
            activeChatData: activeChatData,
            activeChatId: activeChatId,
            chatList: new _ChatsListWrapper.ChatsListWrapper({
              activeChatId: activeChatId,
              chatsData: chatsData.data
            }),
            msgs: new _Msgs.Msgs({
              activeChatId: activeChatId,
              activeChatData: activeChatData
            })
          });
        }
      }

      return true;
    }
  }, {
    key: "updateMsgCount",
    value: function updateMsgCount(activeChatId) {
      api.getNewMsgCount(activeChatId).then(function (res) {
        if (res.ok) {
          var _res$json = res.json(),
              unread_count = _res$json.unread_count; // console.log('unread_count=', unread_count);


          store.dispatch({
            type: _Store.Actions.SET_UNREAD_COUNT,
            data: {
              activeChatId: activeChatId,
              unread_count: unread_count
            }
          });
        }
      });
    }
  }, {
    key: "addEvents",
    value: function addEvents() {
      var _this2 = this;

      var nodeAddChat = null;

      if (this._element) {
        nodeAddChat = this._element.querySelector('#btn-new-chat');
      }

      if (nodeAddChat) {
        nodeAddChat.addEventListener('click', this.addChat);
      }

      var nodeGoProfileBtn = null;

      if (this._element) {
        nodeGoProfileBtn = this._element.querySelector('#btn-go-profile');
      }

      if (nodeGoProfileBtn) {
        nodeGoProfileBtn.addEventListener('click', this.goProfile);
      }

      var deleteChatButtons = null;

      if (this._element) {
        deleteChatButtons = this._element.querySelectorAll('.chat__delete-icon');
        deleteChatButtons.forEach(function (button) {
          return button.addEventListener('click', _this2.deleteChat);
        });
      }

      var userMenu = null;

      if (this._element) {
        userMenu = this._element.querySelectorAll('#add-remove-user');
        userMenu.forEach(function (button) {
          return button.addEventListener('click', _this2.userMenu);
        });
      }

      var addMediaBtn = null;

      if (this._element) {
        addMediaBtn = this._element.querySelector('#add-media-btn-popup');
      }

      if (addMediaBtn) {
        addMediaBtn.addEventListener('click', this.addMedia);
      }

      var selectChats = null;

      if (this._element) {
        selectChats = this._element.querySelectorAll('.chat');
      }

      if (selectChats) {
        selectChats.forEach(function (chatNode) {
          return chatNode.addEventListener('click', _this2.selectChat);
        });
      }

      var sendMsgBtn = null;

      if (this._element) {
        sendMsgBtn = this._element.querySelector('#send-msg-form');
      }

      if (sendMsgBtn) {
        sendMsgBtn.addEventListener('submit', this.sendMsg);
      }

      var chngChatAvatar = null;

      if (this._element) {
        chngChatAvatar = this._element.querySelector('#msgs-avatar');
      }

      if (chngChatAvatar) {
        chngChatAvatar.addEventListener('click', this.addChngMsgAvatar);
      }

      return true;
    }
  }, {
    key: "sendMsg",
    value: function sendMsg(event) {
      event.preventDefault();

      if (event.target.elements[0].value.length) {
        var msg = (0, _sanitizeHtml.sanitize)(event.target.elements[0].value);

        var _store$getState4 = store.getState(),
            activeChatId = _store$getState4.activeChatId;

        IndexWrapper._instance.wsInit(activeChatId, msg);

        event.target.elements[0].value = '';
      }
    }
  }, {
    key: "wsInit",
    value: function wsInit(activeChatId, msg) {
      if (ws.timerId) {
        ws.socketStopPing();
      }

      ws.socketClose();
      api.getChatToken(activeChatId).then(function (res) {
        if (res.ok) {
          var _ref2 = res.json(),
              token = _ref2.token;

          var userDataLocal = store.getState().userData;
          var id = userDataLocal.id; // console.log('userid, activeChatId, token', id, activeChatId, token);

          ws.socketInit(id, activeChatId, token).then(function () {
            ws.socketGetOldMsgs(); // ws.socketPing();

            if (msg) {
              ws.socketSend(msg);
            }
          });
          ws.socketOnClose();
          ws.socketOnError();
          ws.socketOnMessage(IndexWrapper._instance.publishMessage);
        } else {
          var _res$json2 = res.json(),
              reason = _res$json2.reason;

          console.log(reason);
        }
      });
    }
  }, {
    key: "publishMessage",
    value: function publishMessage(data) {
      var msgObj = JSON.parse(data);

      if (Array.isArray(msgObj)) {
        var msgObjReversed = msgObj.reverse();
        msgObjReversed.forEach(function (msg) {
          return IndexWrapper._instance.handleMsg(msg);
        });
      } else {
        IndexWrapper._instance.handleMsg(msgObj);
      }

      var _store$getState5 = store.getState(),
          activeChatId = _store$getState5.activeChatId;

      var activeChatData = (0, _Store.chatsDataSelector)(activeChatId);
      var chatNode = document.querySelector("[data-chat-id='".concat(activeChatId, "']"));

      if (chatNode) {
        if (activeChatData.unread_count < 20) {
          var circleNode = chatNode.querySelector('.chat__unread-mess-numb');

          if (circleNode) {
            circleNode.style.display = 'none';
          }
        } else {
          var _circleNode = chatNode.querySelector('.circle-unread__text');

          if (_circleNode) {
            _circleNode.textContent = String(activeChatData.unread_count - 20);
          }
        }
      }

      IndexWrapper._instance.updateMsgCount(activeChatId);
    }
  }, {
    key: "handleMsg",
    value: function handleMsg(msgObj) {
      var dataPublish = {};

      if (msgObj.user_id && msgObj.content) {
        if (userData.id === msgObj.user_id) {
          dataPublish = {
            incomingMsg: false,
            content: msgObj.content,
            time: (0, _timeParse.timeParce)(msgObj.time),
            is_read: msgObj.is_read
          };
        } else {
          dataPublish = {
            incomingMsg: true,
            content: msgObj.content,
            time: (0, _timeParse.timeParce)(msgObj.time),
            is_read: msgObj.is_read
          };
        }

        var feedMsg = new _FeedMsg.FeedMsg({
          data: dataPublish
        });
        var feedNode = document.querySelector('.feed__container');

        if (feedNode) {
          var elem = feedNode.appendChild(feedMsg.getContent());
          elem.scrollIntoView();
        }
      }
    }
  }, {
    key: "selectChat",
    value: function selectChat(event) {
      var selectChats = document.querySelectorAll('.chat');

      if (selectChats) {
        selectChats.forEach(function (chatNode) {
          return chatNode.classList.remove('chat_selected');
        });
      }

      event.currentTarget.classList.toggle('chat_selected'); // IndexWrapper._instance.updateMsgCount(this.dataset.chatId);

      store.dispatch({
        type: _Store.Actions.SET_ACTIVE_CHAT,
        data: {
          activeChatId: Number(this.dataset.chatId)
        }
      });

      IndexWrapper._instance.getChatsUpdateStore();

      router.go({
        activeChatId: Number(this.dataset.chatId)
      }, "/chats/".concat(this.dataset.chatId));

      IndexWrapper._instance.wsInit(Number(this.dataset.chatId));
    }
  }, {
    key: "getChatsUpdateStore",
    value: function getChatsUpdateStore() {
      api.getChats().then(function (res) {
        var chatsDataReply = res.json();
        var chatsDataChanged = (0, _transfromChatsData.transfromChatsData)(chatsDataReply);
        store.dispatch({
          type: _Store.Actions.CHATS_UPDATE,
          data: chatsDataChanged
        });
      });
    }
  }, {
    key: "addChngMsgAvatar",
    value: function addChngMsgAvatar() {
      store.dispatch({
        type: _Store.Actions.MSGS_CHNG_AVATAR_POPUP_SHOW,
        data: {
          showPopup: true
        }
      });
    }
  }, {
    key: "goProfile",
    value: function goProfile() {
      router.go({}, '/profile');
    }
  }, {
    key: "addMedia",
    value: function addMedia() {
      store.dispatch({
        type: _Store.Actions.ADD_MEDIA_POPUP_SHOW,
        data: {
          showPopup: true
        }
      });
    }
  }, {
    key: "userMenu",
    value: function userMenu() {
      store.dispatch({
        type: _Store.Actions.USER_MENU_POPUP_SHOW,
        data: {
          showPopup: true
        }
      });
    }
  }, {
    key: "deleteChat",
    value: function deleteChat(event) {
      store.dispatch({
        type: _Store.Actions.DELETE_CHAT_POPUP_SHOW,
        data: {
          showPopup: true,
          chatId: event.target.dataset.chatId,
          chatName: event.target.dataset.chatName
        }
      });
    }
  }, {
    key: "addChat",
    value: function addChat() {
      store.dispatch({
        type: _Store.Actions.ADD_CHAT_POPUP_SHOW,
        data: {
          showPopup: true
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      // console.log('render, this.props=', { ...this.props });
      // console.log('render, this.props.chatList.render()=', IndexWrapper._instance.props.chatList.render());
      // console.log('render, IndexWrapper._instance.props.chatList=', { ...IndexWrapper._instance.props.chatList });
      var compiled = (0, _pug.compile)(_template.tmplIndexWrapper);
      var html = compiled(_objectSpread(_objectSpread({}, this.props), {}, {
        chatList: this.props.chatList.render(),
        msgs: this.props.msgs.render()
      }));
      return html;
    }
  }]);

  return IndexWrapper;
}(_Block2.Block);

exports.IndexWrapper = IndexWrapper;

_defineProperty(IndexWrapper, "_instance", void 0);