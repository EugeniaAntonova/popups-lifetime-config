// =========================================  utils

const hidePPopup = (popup) => {
    popup.classList.remove('show');
    popup.querySelector('.p-close-btn').removeEventListener('click', handleCloseBtnClick)
    popup.removeEventListener('click', handleSideClick);
    document.removeEventListener('keydown', handleEsc);
}

const isEsc = (evt) => evt.key === 'Escape';

function handleEsc (evt) {
    const popup = document.querySelector('.custom-popup.show');
    if(isEsc(evt)) {
      evt.preventDefault();
      hidePPopup(popup);
    }
  }

const handleSideClick = (evt) => {
    if (evt.target.tagName === 'SECTION' && evt.target.classList.contains('p-popup')) {
        const popup = evt.target;
        hidePPopup(popup);
    }
    return;
}

const handleCloseBtnClick = () => {
    const popup = document.querySelector('.custom-popup.show');
    hidePPopup(popup);
}

const getCookies = (name) => {
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
    }
    if (now.getTime() > start.getTime() && now.getTime() < end.getTime()) {
        return true;
    }
    return false;
}

const isItMobileDevice = () => {
    const reMobiles = /webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Touch|pixel/i;
    const reMac = /Macintosh/i;

    const isMobile = reMobiles.test(navigator.userAgent);
    const isBigIpad = reMac.test(navigator.userAgent) && navigator.maxTouchPoints > 0;
    const isSmall = Math.max(window.innerHeight, window.innerWidth) <= 1600 && navigator.maxTouchPoints > 0;

    return isMobile || isBigIpad || isSmall;
}
// const isItMobileDevice = () => {
//     const reMobiles = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Touch|pixel/i;
//     const reMac = /Macintosh/i;
//     const agent = navigator.userAgent;
    
//     const isMobile = reMobiles.test(agent);
    
//     const isBigIpad = reMac.test(agent) && navigator.maxTouchPoints > 0;
    
//     const isSmall = Math.max(window.innerHeight, window.innerWidth) <= 1600 && navigator.maxTouchPoints > 0;
    
//     const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

//     return isMobile || isBigIpad || isSmall || hasCoarsePointer;
// };

const NEVER = 60 * 60 * 24 * 30 * 1.5;

const doNotShow = (cookie, time) => {
    document.cookie = `${cookie}=shown;max-age=${time}`;
}


// ===============================================  popups

const showPPopup = (popup, restPopupTime) => {
    const cookie = popup.getAttribute('id');
    const isShown = getCookies(cookie);
    const block = getCookies('already');

    const configAndShow = (cookie, restPopupTime, pPopup) => {
        document.cookie = `${cookie}=shown;max-age=${restPopupTime}`;
        document.cookie = `already=shown;max-age=5`;
        pPopup.classList.add('show');

        const closeButton = pPopup.querySelector('.p-close-btn');
        closeButton.addEventListener('click', handleCloseBtnClick);
        const showNoMoreCheck = pPopup.querySelector('.p-show-no-more') || false;
        if (showNoMoreCheck) {
            const onshowNoMoreChecked = (evt) => {
                const check  = evt.target;
                const currentCookie = cookie;
                let time;
                if (check.checked) {
                    time = NEVER;
                    doNotShow(currentCookie, time);
                    return;
                } else {
                    time = restPopupTime;
                    doNotShow(currentCookie, time);
                    return;
                }
            }
            showNoMoreCheck.addEventListener('change', onshowNoMoreChecked);
        }
        pPopup.addEventListener('click', handleSideClick);
        window.addEventListener('keydown', handleEsc);

    }
    if (!isShown && !block) {
        configAndShow(cookie, restPopupTime, popup);
    } 
}

const pPopupConfig = (popup) => {
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
    const rightDevice = isForMobilesOnly ? isItMobileDevice() : true;

    rightDay && fitInPeriod && rightDayTime && rightDevice ? setTimeout(() => { showPPopup(popup, restPopupTime) }, 0) : console.log('not this time, popup', popup.id);
}

const touchPopups = () => {
    const popups = document.querySelectorAll('.p-popup');
    popups.forEach((popup) => pPopupConfig(popup))
}

// ==============================================================  get state

const onSuccess = (user, cb) => {
    const {email, bonus, dataReg, balance, canWithdraw } = user;

    const getDateDiff = () => {
        const arr = dataReg.split(' ');
        const dateParts = arr[0].split('.');
        const year = dateParts[2];
        const month = dateParts[1];
        const day = dateParts[0];
        const timeParts = arr[1].split(':');
        const hours = timeParts[0];
        const minutes = timeParts[1];
        const dateReg = new Date(`${year}, ${month}, ${day}, ${hours}:${minutes}`);
        const now = new Date(Date.now());
        const oneDay = 24*3600*1000;
        const diff = ((Date.parse(now) - Date.parse(dateReg)) / oneDay).toFixed(3);
        return diff;
    }

    const daysFromReg = getDateDiff();

    // if (!email) {
    //     const pPopup = document.querySelector('#email-popup');
    //     pPopup.classList.add('p-popup');
    //     pPopup.setAttribute('popup-rest-time', `${5*24}, 0, 0`);
    // }

    if (balance + canWithdraw === 0 && bonus < 200 && daysFromReg < 7) {
        const pPopup = document.querySelector('.js-twenty-popup');
        pPopup.classList.add('p-popup');
        pPopup.setAttribute('popup-rest-time', '24, 0, 0');        
        cb();        
    } else if (balance + canWithdraw < 200 && daysFromReg > 7 && daysFromReg < 30) {
        const pPopup = document.querySelector('.js-fifteen-popup');
        pPopup.classList.add('p-popup');
        pPopup.setAttribute('popup-rest-time', `${3*24}, 0, 0`);        
        cb();       
    } else if (balance + canWithdraw < 200 && daysFromReg > 30) {
        const pPopup = document.querySelector('.js-ten-popup');
        pPopup.classList.add('p-popup');
        pPopup.setAttribute('popup-rest-time', `${5*24}, 0, 0`);          
        cb();  
    }

    cb()
  }
  
  const onFail = (error) => {
    console.log(error);
  }
  const getData = async (onSuccess, onFail, cb) => {
    try {
      const response = await fetch(
        // 'https://rpo.logycom.kz/tm/threemen.dll/srvNew?srv=rShortInfo',
        './data.json'
        // 'https://static.sz.kz/test/json.php'
        // 'https://sz.kz/srvNew?srv=rShortInfo'
      );
  
      if (!response.ok) {
        throw new Error('Не удалось получить данные');
      }
  
      const user = await response.json();
      onSuccess(user, cb);
    } catch (error) {
      onFail(error.message);
    }
  };

//   =========================================== main

window.addEventListener('load', () => getData(onSuccess, onFail, touchPopups))