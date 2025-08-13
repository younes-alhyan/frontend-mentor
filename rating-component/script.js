
document.addEventListener('DOMContentLoaded', () => {
    const RateButtons = document.querySelectorAll('.rate');
    const submitButoon = document.getElementById('submit');
    const mainContent = document.getElementById('main-content');
    const thankYou = document.getElementById('thank-you');
    submitButoon.disabled = true;
    let rate = 0;
    RateButtons.forEach(button => {
        button.addEventListener('click', () => Rate(button.id));
    });
    submitButoon.addEventListener('click', displayThankYouState);
    function Rate(id) {
        const RateButtons = document.querySelectorAll('.rate');
        RateButtons.forEach(button => {
            if (button.id == id) {
                button.classList.add('active');
                button.disabled = true;
            } else {
                button.classList.remove('active');
                button.disabled = false;
            }
        });
        submitButoon.disabled = false;
        rate = id;
    }
    function displayThankYouState() {
        mainContent.style.display = 'none';
        thankYou.style.display = 'flex';
        const selectedRate = document.getElementById('selected');
        selectedRate.innerText = `You selected ${rate} out of 5`;
    }
})
