import { hidePopup, getCookie, getRestPopupTime, isTargetDay, isTheRightPeriod, handleEsc } from './utils.js';

const popups = document.querySelectorAll('.popup');

const showPopup = (popup, restPopupTime) => {
    const cookie = popup.getAttribute('id');
    const isShown = getCookie(cookie);
    const block = getCookie('already');
    if (!isShown && !block) {
        document.cookie = `${cookie}=shown;max-age=${restPopupTime}`;
        document.cookie = `already=shown;max-age=10`;
        popup.classList.add('show');
        popup.addEventListener('click', hidePopup);
        popup.addEventListener('keydown', (evt) => handleEsc(evt));
    }
}

const popupConfig = (popup) => {
    const restTime = popup.getAttribute('popup-rest-time').split(', ');
    const restPopupTime = getRestPopupTime(restTime);

    const day  = popup.getAttribute('popup-day');
    const rightDay = !day ? !isTargetDay(day) : isTargetDay(day);
    
    let min = (new Date(popup.getAttribute('popup-period-min'))).getTime();
    let max = (new Date(popup.getAttribute('popup-period-max'))).getTime();
    const fitInPeriod = isTheRightPeriod(min, max);

    rightDay && fitInPeriod ? setTimeout( () => {showPopup(popup, restPopupTime)}, 500) : console.log('not this time, popup')
}

const touchPopups = () => {

    popups.forEach((popup) => popupConfig(popup))
}

export default touchPopups;

