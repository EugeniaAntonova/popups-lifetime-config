import configMobilePopups from "./mobile-ppopups.js"
import touchPopups from "./popup.js";
import { getData, onSuccess, onFail } from "./get-state.js";

window.addEventListener('load', configMobilePopups());
window.addEventListener('load', getData(onSuccess, onFail, touchPopups))