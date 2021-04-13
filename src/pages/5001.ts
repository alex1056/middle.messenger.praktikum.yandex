import { Page500 } from "../components/500";
import { render } from "../utils/render";

const page500 = new Page500();
render(".page", page500.getContent());
