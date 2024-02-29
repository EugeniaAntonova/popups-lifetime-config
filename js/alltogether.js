// =========================================  utils

const hidePPopup = (popup) => {
    popup.classList.remove('show');
    popup.querySelector('.p-close-btn').removeEventListener('click', handleCloseBtnClick)
    popup.removeEventListener('click', handleSideClick);
    document.removeEventListener('keydown', handleEsc);
}

const isEsc = (evt) => evt.key === 'Escape';

function handleEsc (evt) {
    const popup = document.querySelector('.popup.show');
    if(isEsc(evt)) {
      evt.preventDefault();
      hidePPopup(popup);
    }
  }

const handleSideClick = (evt) => {
    const popup = evt.target;
    hidePPopup(popup);
}

const handleCloseBtnClick = () => {
    const popup = document.querySelector('.popup.show');
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
        closeButton.addEventListener('click', handleCloseBtnClick)
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

    let min = (new Date(popup.getAttribute('popup-period-min'))).getTime();
    let max = (new Date(popup.getAttribute('popup-period-max'))).getTime();
    const fitInPeriod = isTheRightPeriod(min, max);

    rightDay && fitInPeriod ? setTimeout(() => { showPPopup(popup, restPopupTime) }, 0) : console.log('not this time, popup')
}

const touchPopups = () => {
    const popups = document.querySelectorAll('.p-popup');
    popups.forEach((popup) => pPopupConfig(popup))
}

// ==============================================================  get state

const onSuccess = (who, cb) => {
    const {email, bonus, dataReg, balance, canWithdraw } = who;

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

    if (!email) {
        const pPopup = document.querySelector('#email-popup');
        pPopup.classList.add('p-popup');
        pPopup.setAttribute('popup-rest-time', `${5*24}, 0, 0`);
    }

    if (balance + canWithdraw === 0 && bonus < 200 && daysFromReg < 10) {
        const pPopup = document.querySelector('#twenty-popup');
        pPopup.classList.add('p-popup');
        pPopup.setAttribute('popup-rest-time', '24, 0, 0');        
        cb();        
    } else if (balance + canWithdraw < 200 && daysFromReg > 10 && daysFromReg < 60) {
        const pPopup = document.querySelector('#fifteen-popup');
        pPopup.classList.add('p-popup');
        pPopup.setAttribute('popup-rest-time', `${3*24}, 0, 0`);        
        cb();       
    } else if (balance + canWithdraw < 200 && daysFromReg > 60) {
        const pPopup = document.querySelector('#ten-popup');
        pPopup.classList.add('p-popup');
        pPopup.setAttribute('popup-rest-time', `${5*24}, 0, 0`);          
        cb();  
    }

    cb()
  }
  
  const onFail = (what) => {
    console.log(what);
  }
  const getData = async (onSuccess, onFail, cb) => {
    try {
      const response = await fetch(
        // 'https://rpo.logycom.kz/tm/threemen.dll/srvNew?srv=rShortInfo',
        // './data.json'
        // 'https://static.sz.kz/test/json.php'
        'https://sz.kz/srvNew?srv=rShortInfo'
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