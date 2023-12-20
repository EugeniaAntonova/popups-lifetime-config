// time in ms, that we want popup to be hidden. call the function with three arguments (hours, minutes, seconds). E.g.: restPopupTime = getRestPopupTime(0, 15, 0)  = 15 minutes;

const getRestPopupTime = (hours, minutes, seconds) => {
    return parseInt(hours) * 60 * 60 + parseInt(minutes) * 60 + parseInt(seconds);
}

const restPopupTime = getRestPopupTime(0, 0, 30);


// if we want to show popup only when it is X day of the week
const DAY_TO_SHOW = 'fri';

const WEEK = {
    0: 'sun',
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat'
}

const isNeededDay = () => {
    const today = new Date(Date.now());
    const day = WEEK[today.getDay()];
    console.log(day);
    return day === DAY_TO_SHOW;
}

// if we want to show popup up to some date? in min and max constants input two dates in format year, month, day. monthes count from 0 to 11. 
// if you want for the minimum to be now - delete everything from the brackets like that: const MIN = new Date();

const MIN = new Date(2023, 11, 20);
const MAX = new Date(2023, 11, 31);

const isTheRightPeriod = (min, max) => {
    const now = new Date(Date.now());
    return (now >= min && now <= max);
}

const fitPeriod = isTheRightPeriod();

export {restPopupTime, isNeededDay, fitPeriod}