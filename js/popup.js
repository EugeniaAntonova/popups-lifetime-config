import { getCookie, getRestPopupTime, isTargetDay, isTheRightPeriod, handleEsc, handleSideClick, handleCloseBtnClick, BLOCKER } from './utils.js';

const popups = document.querySelectorAll('.popup');

const showPopup = (popup, restPopupTime) => {
    const cookie = popup.getAttribute('id');
    const isShown = getCookie(cookie);
    const block = getCookie('already');

    const configAndShow = (name, lifetime, who) => {
        document.cookie = `${name}=shown;max-age=${lifetime}`;
        document.cookie = `already=shown;max-age=10`;
        who.classList.add('show');

        const closeButton = who.querySelector('.p-close-btn');
        closeButton.addEventListener('click', handleCloseBtnClick)
        who.addEventListener('click', handleSideClick);
        window.addEventListener('keydown', handleEsc);

    }
    if (!isShown && !block) {
        configAndShow(cookie, restPopupTime, popup);
    } else if (!isShown && block) {
        setTimeout(() => {
            configAndShow(cookie, restPopupTime, popup);
        }, BLOCKER)
    }
}

const popupConfig = (popup) => {
    const restTime = popup.getAttribute('popup-rest-time').split(', ');
    const restPopupTime = getRestPopupTime(restTime);

    const day = popup.getAttribute('popup-day');
    const rightDay = !day ? !isTargetDay(day) : isTargetDay(day);

    let min = (new Date(popup.getAttribute('popup-period-min'))).getTime();
    let max = (new Date(popup.getAttribute('popup-period-max'))).getTime();
    const fitInPeriod = isTheRightPeriod(min, max);

    rightDay && fitInPeriod ? setTimeout(() => { showPopup(popup, restPopupTime) }, 300) : console.log('not this time, popup')
}

const touchPopups = () => {
    popups.forEach((popup) => popupConfig(popup))
}

export default touchPopups;

