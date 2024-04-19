const configMobilePopups = () => {
    const reMobiles = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Touch|pixel/i;
    const reMac = /Macintosh/i;
    const mobilePopups = document.querySelectorAll('.mobile-p-popup');
    const isMobile = reMobiles.test(navigator.userAgent);
    const isBigIpad = reMac.test(navigator.userAgent) && navigator.maxTouchPoints > 0;
    const isSmall = Math.min(window.innerHeight, window.innerWidth) < 1080;
    if (isMobile || isBigIpad || isSmall) {
        mobilePopups.forEach((item) => {
            item.classList.add('p-popup');
        })
    }
}

export default configMobilePopups;