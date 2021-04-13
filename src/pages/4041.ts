import { Page404 } from "../components/404";
import { render } from "../utils/render";

const page404 = new Page404();
render(".page", page404.getContent());
