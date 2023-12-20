import { restPopupTime, isNeededDay, fitPeriod } from "./utils.js";

const popup1 = document.querySelector('#popup1');
const popup2 = document.querySelector('#popup2');

const hidePopup = (evt) => {
    const popup = evt.target;
    popup.classList.remove('show');
    popup.removeEventListener('click', hidePopup);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : false;
}

const showPopup = (evt) => {
    let theDay = isNeededDay(); 
    if (theDay) {
        if (!getCookie('popup1')) {;
            popup1.classList.add('show');
            popup1.addEventListener('click', hidePopup);
            document.cookie = `popup1=shown;max-age=${restPopupTime};`;
            console.log(document.cookie)
        } else {
            if (!getCookie('popup2')) {
                popup2.classList.add('show');
                popup2.addEventListener('click', hidePopup);
                document.cookie = `popup2=shown;max-age=${restPopupTime};`;
                console.log(document.cookie)
            }
        }
    } 
}

export default showPopup;

