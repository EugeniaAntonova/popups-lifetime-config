const form = document.querySelector('.newsletter-form');
const input = form.querySelector('#email');
const errorMessage = form.querySelector('.error');
const submitButton = form.querySelector('.my-sbmt-btn');


const isValidInput = (input) => {
    let inputValid = false;
    if (input.match(/^[A-Za-z0-9\_\.]{1,}\@[A-Za-z0-9]{2,}\.[A-Za-z]{2,}$/)) {
        inputValid = true;
    };
    return inputValid;
}

const checkInput = (input) => {
    if (!isValidInput(input.value) || input.value === '') {
        errorMessage.classList.add('error--show');
        input.style.borderColor = '#CF1212';
        submitButton.setAttribute('disabled', 'true');
    } else {
        errorMessage.classList.remove('error--show');
        submitButton.removeAttribute('disabled');
        input.style.borderColor = null;
    };
}

input.addEventListener ('input', () => {
    checkInput(input);
})

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    checkInput(input);    
})

submitButton.setAttribute('disabled', true);