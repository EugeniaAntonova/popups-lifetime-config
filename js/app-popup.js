
const defineUserDevice = () => {
    const actionButton = document.querySelector('.js-application-download-link') || null;
    if (actionButton) {
        if (navigator.userAgent.toLowerCase().match(/(ipad|iphone|macintosh)/)) {
            actionButton.classList.add('apple');
            actionButton.href = 'https://apps.apple.com/kz/app/лотерея-satty-zhuldyz/id1671720238';
        } else {
            actionButton.classList.add('android');
            actionButton.href = 'https://static.sz.kz/app/android/satty-latest.apk';
        }
    }
}
export default defineUserDevice