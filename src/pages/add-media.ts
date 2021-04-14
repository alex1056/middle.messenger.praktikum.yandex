import { PopupAddMedia } from "../components/Popup-add-media";
import { IndexWrapper } from "../components/Index-wrapper";
import { renderDOM } from "../utils/render-dom";

const indexWrapper = new IndexWrapper();
const popupAddMedia = new PopupAddMedia();

renderDOM(".page", indexWrapper.getContent());
renderDOM(".page", popupAddMedia.getContent());
