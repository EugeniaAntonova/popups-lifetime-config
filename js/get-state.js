const onSuccess = (who, cb) => {
    console.log('hi who', who)
    console.log('cb', cb)
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

    if (balance + canWithdraw === 0 && bonus < 200 && daysFromReg < 7) {
        const pPopup = document.querySelector('#twenty-popup');
        const secondPPopup = document.querySelector('#newcomers-popup')
        pPopup.classList.add('p-popup');
        secondPPopup.classList.add('p-popup');
        pPopup.setAttribute('popup-rest-time', '24, 0, 0');        
        secondPPopup.setAttribute('popup-rest-time', '24, 0, 0');
        cb();        
    } else if (balance + canWithdraw < 200 && daysFromReg > 7 && daysFromReg < 30) {
        const pPopup = document.querySelector('#fifteen-popup');
        const secondPPopup = document.querySelector('#cashback-popup')
        pPopup.classList.add('p-popup');
        secondPPopup.classList.add('p-popup');
        pPopup.setAttribute('popup-rest-time', `${3*24}, 0, 0`);        
        secondPPopup.setAttribute('popup-rest-time', `${3*24}, 0, 0`); 
        cb();       
    } else if (balance + canWithdraw < 200 && daysFromReg > 30) {
        const pPopup = document.querySelector('#ten-popup');
        const secondPPopup = document.querySelector('#cashback-popup')
        pPopup.classList.add('p-popup');
        secondPPopup.classList.add('p-popup');
        pPopup.setAttribute('popup-rest-time', `${5*24}, 0, 0`);        
        secondPPopup.setAttribute('popup-rest-time', `${5*24}, 0, 0`);      
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
        '/data.json'
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

  export {getData, onSuccess, onFail}
  
//   getData(onSuccess, onFail);