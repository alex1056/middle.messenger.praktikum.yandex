import { Page404 } from '../components/404';
import { renderDOM } from '../utils/render-dom';

const page404 = new Page404({});
renderDOM('.page', page404.getContent());
