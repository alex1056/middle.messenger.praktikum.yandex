import { compile } from 'pug';
import { Form } from '../../modules/form';
import { Validator } from '../../modules/validator';
import { Block } from '../Block';
import { Btn } from '../Button';
import { ProfileFormCtrls } from '../Profile-form-ctrls';
import { PopupChngAvatar } from '../Popup-chng-avatar';
import { tmplProfile } from './template';
import './style.scss';
import { onSubmitTestLogin } from '../../modules/form/onSubmitHandlers';
import { hideOnClickOutside } from '../../utils/outside-click-listenet';
import { getEventBus, actions } from '../../modules/EventBusInstance';

const eventBus = getEventBus();

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

  // state: { [x: string]: any };
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
      disabled: true,
      showPasswordFields: false,
    });
    const { rootQuery } = props as any;

    if (ProfileForm._instance) {
      return ProfileForm._instance;
    }

    this.rootQuery = rootQuery;
    this.setProps = this.setProps.bind(this);
    this.chngData = this.chngData.bind(this);
    this.chngPwd = this.chngPwd.bind(this);
    this.popupChngAvatar = null;
    this.outsideClick = this.outsideClick.bind(this);

    ProfileForm._instance = this;
    // console.log('Конструктор отработал!');
  }

  chngData() {
    ProfileForm._instance.setProps({
      ...ProfileForm._instance.props,
      className: 'pform__btn-save',
      ctrlsContainer: 'pform__ctrls-container_hide',
      disabled: false,
      setListeners: true,
    });
  }

  chngPwd() {
    ProfileForm._instance.setProps({
      ...ProfileForm._instance.props,
      className: 'pform__btn-save',
      ctrlsContainer: 'pform__ctrls-container_hide',
      disabled: false,
      setListeners: true,
      showPasswordFields: true,
    });
  }

  chngAvatar() {
    ProfileForm._instance.setProps({
      ...ProfileForm._instance.props,
      disabled: false,
      setListeners: true,
      setListenersChngAvatar: true,
    });
    eventBus.emit(actions.CHNG_AVATAR_POPUP_SHOW);
  }

  addEvents(): boolean {
    const { setListeners, setListenersChngAvatar } = this.props as any;
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
      // console.log('logsetListeners', setListeners);

      this.form = new Form('form-profile');
      this.form.setPopup(this._element as HTMLDivElement);
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
      this.form.setHandlers('submit', onSubmitTestLogin);
    }
    if (setListenersChngAvatar) {
      const popupChngAvatar = document.body.querySelector<HTMLElement>('#chng-avatar-popup-profile');
      if (popupChngAvatar) {
        popupChngAvatar.addEventListener('click', this.outsideClick);
        document.addEventListener('keydown', this.outsideClick);
      }
    }

    return true;
  }

  outsideClick = (event: any) => {
    event.preventDefault();
    const popupChngAvatar = document.body.querySelector<HTMLElement>('#chng-avatar-popup-profile');
    if (event.type === 'click') {
      if (popupChngAvatar) {
        if (popupChngAvatar === event.target) {
          popupChngAvatar.style.display = 'none';
          popupChngAvatar.removeEventListener('click', this.outsideClick);
        }
      }
    }
    if (event.key === 'Escape') {
      if (popupChngAvatar) {
        popupChngAvatar.style.display = 'none';
        document.removeEventListener('keydown', this.outsideClick);
      }
    }
  };

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
    // console.log('...this.props', { ...this.props });

    const compiled = compile(tmplProfile);
    const html = compiled({
      ...this.props,
      buttonsubmit: this.props ? this.props.buttonsubmit.render() : '',
      ctrls: this.props ? this.props.ctrls.render() : '',
    });
    return html;
  }
}
