import { IndexWrapper } from '../components/Index-wrapper';
import { renderDOM } from '../utils/render-dom';

const indexWrapper = new IndexWrapper();

renderDOM('.page', indexWrapper.getContent());
