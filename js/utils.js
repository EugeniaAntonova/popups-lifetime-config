const hidePopup = (popup) => {
    popup.classList.remove('show');
    popup.querySelector('.p-close-btn').removeEventListener('click', handleCloseBtnClick)
    popup.removeEventListener('click', handleSideClick);
    document.removeEventListener('keydown', handleEsc);
}

const isEsc = (evt) => evt.key === 'Escape';

function handleEsc(evt) {
    const popup = document.querySelector('.popup.show');
    if (isEsc(evt)) {
        evt.preventDefault();
        hidePopup(popup);
    }
}

const handleSideClick = (evt) => {
    const popup = evt.target;
    hidePopup(popup);
}

const handleCloseBtnClick = () => {
    const popup = document.querySelector('.popup.show');
    hidePopup(popup);
}

const getCookie = (name) => {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : false;
}

const getRestPopupTime = (array) => {
    return parseInt(array[0]) * 60 * 60 + parseInt(array[1]) * 60 + parseInt(array[2]);
}

const WEEK = {
    0: 'sun',
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat'
}

const isTargetDay = (theDay) => {
    const today = new Date(Date.now());

    const weekDay = WEEK[today.getDay()];
    return weekDay === theDay;
}

const isTheRightPeriod = (min, max) => {

    const now = new Date(Date.now())
    const nowMs = now.getTime();

    if (min === 0) {
        min = nowMs - 60000;
    }

    if (max === 0) {
        max = now;
        max.setFullYear(max.getFullYear() + 1000)
        max = max.getTime();
    }

    return (now >= min && now <= max);
}

const isTheRightDayTime = (dayTime) => {
    const time = dayTime.split('-');
    const min = time[0].split(':');
    const max = time[1].split(':');
    const now = new Date();
    const start = new Date();
    const end = new Date();
    start.setHours(min[0], min[1]);
    end.setHours(max[0], max[1]);
    if (max[0] == "00") {
        end.setDate(end.getDate() + 1);
        console.log(end);
    }
    if (now.getTime() > start.getTime() && now.getTime() < end.getTime()) {
        console.log('fits!')
        return true;
    }
    console.log('does not fit (')
    return false;
}

export { hidePopup, getCookie, getRestPopupTime, isTargetDay, isTheRightPeriod, isTheRightDayTime, handleEsc, handleSideClick, handleCloseBtnClick }