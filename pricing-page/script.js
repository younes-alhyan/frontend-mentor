document.addEventListener('DOMContentLoaded', () => {
    const toggelInput = document.getElementById
        ('toggle');
    const BasicPrice = document.getElementById('basic');
    const ProfessionalPrice = document.getElementById('professional');
    const MasterPrice = document.getElementById('master');
    const annuelyValues = {
        Basic: 199.99,
        Professional: 249.99,
        Master: 399.99,
    }
    const monthlyValues = {
        Basic: 19.99,
        Professional: 24.99,
        Master: 39.99,
    }
    function updatePrices(values) {
        BasicPrice.textContent = values.Basic;
        ProfessionalPrice.textContent = values.Professional;
        MasterPrice.textContent = values.Master;
    }
    function handleToggle() {
        toggelInput.checked ? updatePrices(annuelyValues) : updatePrices(monthlyValues);

    }
    toggelInput.addEventListener('click', handleToggle);
    handleToggle();
})