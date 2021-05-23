"use strict";

var _Router = require("./modules/Router");

var _IndexWrapper = require("./components/Index-wrapper");

var _ProfileForm = require("./components/Profile-form");

var _ = require("./components/404");

var _2 = require("./components/500");

var _LoginForm = require("./components/Login-form");

var _RegistrForm = require("./components/Registr-form");

var _MountPopups = require("./modules/MountPopups");

var _MountComponents = require("./modules/MountComponents");

var _Api = require("./modules/Api");

var api = new _Api.Api();
var router = new _Router.Router('.page');
var isLoggedIn = false;
api.getUserData().then(function (res) {
  if (res.ok) {
    isLoggedIn = true;
    router.use('/', _IndexWrapper.IndexWrapper);
    router.use('/chats/:chatId', _IndexWrapper.IndexWrapper);
    router.use('/profile', _ProfileForm.ProfileForm);
    router.use('/login', _LoginForm.LoginForm);
    router.use('/registr', _RegistrForm.RegistrForm);
    router.use('/404', _.Page404);
    router.use('/500', _2.Page500);
    router.start();
  } else {
    isLoggedIn = false;
    router.use('/login', _LoginForm.LoginForm);
    router.use('/registr', _RegistrForm.RegistrForm);
    router.start();
  }

  (0, _MountPopups.mountPopups)();
  (0, _MountComponents.mountIndexWrapper)();
  (0, _MountPopups.setPopupsSubscribers)();

  if (!isLoggedIn) {
    router.go({}, '', '/login');
  }
});