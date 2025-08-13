document.addEventListener('DOMContentLoaded', () => {
    const priceText = document.getElementById('price');
    const priceTextMobile = document.getElementById('price-mobile');
    const slider = document.getElementById('slider');
    const discountText = document.getElementById('discount');
    const viewsText = document.getElementById('views');

    const basePrice = 16; // Base price for 100K pageviews
    const baseViews = 100; // Base views in K
    const maxPrice = 30; // Max price in dollars

    function updatePrice() {
        let price = (slider.value / slider.max) * maxPrice;
        if (price > maxPrice) price = maxPrice;
        price = price.toFixed(2);
        priceText.textContent = `$${price}`;
        priceTextMobile.textContent = priceText.textContent;
    }

    function changeDiscountText() {
        if (window.innerWidth < 450) {
            discountText.textContent = '-25%';
        } else {
            discountText.textContent = '25% discount';
        }
    }

    function updateTraker() {
        const progress = (slider.value / slider.max) * 100;
        slider.style.background = `linear-gradient(to right, hsl(174, 77%, 80%) ${progress}%, hsl(224, 65%, 95%) ${progress}%)`;
    }

    function updateViews() {
        let views = (baseViews / basePrice) * (slider.value / slider.max) * maxPrice;
        viewsText.textContent = `${Math.round(views)}K PAGEVIEWS`;
    }

    slider.addEventListener('input', () => {
        updatePrice();
        updateTraker();
        updateViews();
    });

    window.addEventListener('resize', changeDiscountText);

    updatePrice();
    updateTraker();
    updateViews();
});
