import { getCookie, getRestPopupTime, isTargetDay, isTheRightPeriod, handleEsc, handleSideClick, handleCloseBtnClick, isTheRightDayTime, isMobileDevice, NEVER } from './utils.js';

const showPopup = (popup, restPopupTime) => {
    const cookie = popup.getAttribute('id');
    const isShown = getCookie(cookie);
    const blocked = getCookie('already');

    const configAndShow = (cookie, restPopupTime, pPopup) => {
        document.cookie = `${cookie}=shown;max-age=${restPopupTime}`;
        document.cookie = `already=shown;max-age=10`;
        pPopup.classList.add('show');

        const closeButton = pPopup.querySelector('.p-close-btn');
        closeButton.addEventListener('click', handleCloseBtnClick)
        pPopup.addEventListener('click', handleSideClick);
        window.addEventListener('keydown', handleEsc);

    }
    if (!isShown && !blocked) {
        configAndShow(cookie, restPopupTime, popup);
    } 
}

const popupConfig = (popup) => {
    const restTime = popup.getAttribute('popup-rest-time').split(', ');
    const restPopupTime = restTime ? getRestPopupTime(restTime) : 0;

    const day = popup.getAttribute('popup-day');
    const rightDay = !day ? !isTargetDay(day) : isTargetDay(day);

    const dayTime = popup.getAttribute('popup-daytime');
    const rightDayTime = !dayTime ? true : isTheRightDayTime(dayTime)

    let min = (new Date(popup.getAttribute('popup-period-min'))).getTime();
    let max = (new Date(popup.getAttribute('popup-period-max'))).getTime();
    const fitInPeriod = isTheRightPeriod(min, max);

    let isForMobilesOnly = /p-mobile-only/i.test(popup.classList);
    const rightDevice = isForMobilesOnly ? isMobileDevice() : true;

    rightDay && fitInPeriod && rightDayTime && rightDevice ? setTimeout(() => { showPopup(popup, restPopupTime) }, 300) : console.log('not this time, popup')
}

const touchPopups = () => {
    const popups = document.querySelectorAll('.p-popup');
    popups.forEach((popup) => popupConfig(popup))
}

export default touchPopups;

