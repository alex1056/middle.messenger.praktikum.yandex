import { compile } from 'pug';
import { Form } from '../../modules/form';
import { Validator } from '../../modules/validator';
import { Block } from '../Block';
import { Btn } from '../Button';
import { ProfileFormCtrls } from '../Profile-form-ctrls';
import { PopupChngAvatar } from '../Popup-chng-avatar';
import { tmplProfile } from './template';
import './style.scss';
import { onSubmitGetFormData, mapInputsForSending } from '../../modules/form/onSubmitHandlers';
import { Api, urlApiResources } from '../../modules/Api';
import { createStore, Actions } from '../../modules/Store';
import { Router } from '../../modules/Router';

const api = new Api();
const store = createStore();
const router = new Router('.page');

type TProps =
  | {
      className?: string;
      disabled?: boolean;
      [propName: string]: any;
    }
  | undefined;

export class ProfileForm extends Block<TProps> {
  props: TProps;

  form: Form;

  popupChngAvatar: PopupChngAvatar | null;

  static _instance: ProfileForm;

  constructor(props: TProps) {
    super('div', {
      ...props,
      buttonsubmit: new Btn({
        ...props,
        buttonText: 'Сохранить',
        className: 'pform__btn-save btn_hide',
        disabled: true,
      }),
      ctrls: new ProfileFormCtrls({ ...props }),
      inputsDisabled: true,
      showPasswordFields: false,
      data: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
        avatar: '',
      },
    });
    const { rootQuery } = props as any;

    if (ProfileForm._instance) {
      return ProfileForm._instance;
    }

    this.rootQuery = rootQuery;
    this.setProps = this.setProps.bind(this);
    this.chngData = this.chngData.bind(this);
    this.chngPwd = this.chngPwd.bind(this);

    ProfileForm._instance = this;
  }

  chngData() {
    ProfileForm._instance.setProps({
      ...ProfileForm._instance.props,
      className: 'pform__btn-save',
      ctrlsContainer: 'pform__ctrls-container_hide',
      inputsDisabled: false,
      setListeners: true,
    });
  }

  chngPwd() {
    ProfileForm._instance.setProps({
      ...ProfileForm._instance.props,
      className: 'pform__btn-save',
      ctrlsContainer: 'pform__ctrls-container_hide',
      inputsDisabled: false,
      setListeners: true,
      showPasswordFields: true,
    });
  }

  chngAvatar() {
    const inputsDisabled = ProfileForm._instance.props?.inputsDisabled;
    ProfileForm._instance.setProps({
      ...ProfileForm._instance.props,
      inputsDisabled,
      setListeners: true,
      setListenersChngAvatar: true,
    });

    store.dispatch({
      type: Actions.CHNG_AVATAR_POPUP_SHOW,
      data: { showPopup: true },
    });
  }

  onSubmitHandlerProfile(event: any, form: HTMLFormElement, formId: string) {
    event.preventDefault();

    const errServerReply = document.body.querySelector(`#${formId}`) as HTMLFormElement;
    const errSpan = errServerReply.querySelector('#error-server-reply');
    const inputsData = onSubmitGetFormData(form, formId) as any;

    const inputsDataMapped = mapInputsForSending(inputsData, formId);

    const { userData } = store.getState();

    if (userData.id) {
      const { oldPassword, newPassword } = inputsDataMapped as any;
      if (oldPassword && newPassword) {
        api.chngUserPassword({ data: inputsDataMapped }).then((res: any) => {
          if (res.ok) {
            if (errSpan) {
              errSpan.textContent = 'Изменения сохранены';
            }

            setTimeout(() => {
              ProfileForm._instance.setProps({
                ...ProfileForm._instance.props,
                buttonsubmit: new Btn({
                  ...ProfileForm._instance.props,
                  buttonText: 'Сохранить',
                  className: 'pform__btn-save btn_hide',
                  disabled: true,
                }),
                ctrlsContainer: 'pform__ctrls-container',
                inputsDisabled: false,
                setListeners: true,
                showPasswordFields: false,
                ctrls: new ProfileFormCtrls({
                  ...ProfileForm._instance.props,
                  ctrlsContainer: 'pform__ctrls-container',
                }),
              });
            }, 1000);
          } else if (errSpan) {
            errSpan.textContent = res.errorMessageText as string;
          }
        });
      } else {
        api.chngUserProfileData({ data: inputsDataMapped }).then((res: any) => {
          if (res.ok) {
            const userDataFromServer = res.json() as any;
            if (errSpan) {
              errSpan.textContent = 'Изменения сохранены';
            }
            store.dispatch({
              type: Actions.GET_USER_DATA,
              data: userDataFromServer,
            });

            setTimeout(() => {
              const avatarUrl = `${urlApiResources}${userDataFromServer.avatar}`;
              ProfileForm._instance.setProps({
                ...ProfileForm._instance.props,
                data: { ...userDataFromServer, avatar: avatarUrl },
                buttonsubmit: new Btn({
                  ...ProfileForm._instance.props,
                  buttonText: 'Сохранить',
                  className: 'pform__btn-save btn_hide',
                  disabled: true,
                }),
                ctrlsContainer: 'pform__ctrls-container',
                inputsDisabled: false,
                setListeners: true,
                showPasswordFields: false,
                ctrls: new ProfileFormCtrls({
                  ...ProfileForm._instance.props,
                  ctrlsContainer: 'pform__ctrls-container',
                }),
              });
            }, 1000);
          } else if (errSpan) {
            errSpan.textContent = res.errorMessageText as string;
          }
        });
      }
    }
  }

  addEvents(): boolean {
    const { setListeners } = this.props as any;
    let nodeData = null;
    let nodePwd = null;
    let nodeChngAvatar = null;

    if (this._element) {
      nodeData = this._element.querySelector('#chng-data-btn-form-profile');
      nodePwd = this._element.querySelector('#chng-pwd-btn-form-profile');
      nodeChngAvatar = this._element.querySelector('#chng-avatar-btn-form-profile');
    }

    if (nodeData && nodePwd && nodeChngAvatar) {
      nodeData.addEventListener('click', this.chngData);
      nodePwd.addEventListener('click', this.chngPwd);
      nodeChngAvatar.addEventListener('click', this.chngAvatar);
    }

    if (setListeners) {
      this.form = new Form('form-profile');
      this.form.setPopup(this._element as HTMLDivElement);
      this.form.setHandlers('submit', this.onSubmitHandlerProfile);
      this.form.setEventListeners();
      let currentForm = null;
      let formValidator = null;
      if (this._element) {
        currentForm = this._element.querySelector('#form-profile') as HTMLFormElement;
      }
      if (currentForm) {
        formValidator = new Validator(currentForm, 'form-profile');
      }
      if (formValidator) {
        formValidator.setHandleLabels(false);
      }
      this.form.setFormValidator(formValidator as any);
    }

    let profileBtnBack = null;

    if (this._element) {
      profileBtnBack = this._element.querySelector<HTMLElement>('#profile-btn-back');
    }
    if (profileBtnBack) {
      profileBtnBack.addEventListener('click', this.goBack);
    }

    let profileBtnLogout = null;

    if (this._element) {
      profileBtnLogout = this._element.querySelector<HTMLElement>('#profile-btn-logout');
    }
    if (profileBtnLogout) {
      profileBtnLogout.addEventListener('click', this.goLogout);
    }

    return true;
  }

  goBack() {
    router.back();
  }

  goLogout() {
    api.logOut().then(() => {
      store.dispatch({
        type: Actions.LOGOUT_CLEAN_DATA,
        data: {},
      });
      router.go({}, '', '/login');
    });
  }

  componentDidMount(): boolean {
    api.getUserData().then((res: any) => {
      if (res.ok) {
        const userDataFromServer = res.json() as any;
        store.dispatch({
          type: Actions.GET_USER_DATA,
          data: userDataFromServer,
        });

        const avatarUrl = `${urlApiResources}${userDataFromServer.avatar}`;
        ProfileForm._instance.setProps({
          ...ProfileForm._instance.props,

          data: { ...userDataFromServer, avatar: avatarUrl },
        });
      }
    });

    return true;
  }

  componentDidUpdate() {
    if (this.form) {
      this.form.removeEventListeners();
    }

    const { ctrlsContainer } = this.props as any;

    if (ctrlsContainer === 'pform__ctrls-container_hide') {
      if (this.props) {
        this.props.buttonsubmit = new Btn({
          ...this.props,
          buttonText: 'Сохранить',
          className: 'pform__btn-save',
          buttonId: 'submit-form-profile',
          disabled: false,
        });
      }

      if (this.props) {
        this.props.ctrls = new ProfileFormCtrls(this.props);
      }
    }
    return true;
  }

  render(): string {
    const compiled = compile(tmplProfile);
    const html = compiled({
      ...this.props,
      buttonsubmit: this.props ? this.props.buttonsubmit.render() : '',
      ctrls: this.props ? this.props.ctrls.render() : '',
    });
    return html;
  }
}
