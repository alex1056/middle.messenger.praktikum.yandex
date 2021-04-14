import { Page500 } from "../components/500";
import { renderDOM } from "../utils/render-dom";

const page500 = new Page500();
renderDOM(".page", page500.getContent());
