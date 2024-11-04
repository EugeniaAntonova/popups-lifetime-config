import touchPopups from "./popup.js";
import { getData, onSuccess, onFail } from "./get-state.js";
import defineUserDevice from "./app-popup.js";

window.addEventListener('load', getData(onSuccess, onFail, touchPopups))
window.addEventListener('load', defineUserDevice)