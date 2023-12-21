const hidePopup = (evt) => {
    const popup = evt.target;
    popup.classList.remove('show');
    popup.removeEventListener('click', hidePopup);
}

const handleEsc = (evt) => {
    console.log('esk')
    if (evt.key === 'Escape') {
        hidePopup();
    }
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
    console.log(`${weekDay}, ${theDay}`);
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

export {hidePopup, getCookie, getRestPopupTime, isTargetDay, isTheRightPeriod, handleEsc}