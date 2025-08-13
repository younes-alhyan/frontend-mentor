document.addEventListener('DOMContentLoaded', () => {
    const titels = document.querySelectorAll('.title');
    const Hours = document.querySelectorAll('.hours');
    const Previous = document.querySelectorAll('.previous');

    const radioInput = document.getElementsByName('option');

    async function fetchData() {
        const res = await fetch('data.json');
        const data = await res.json();
        return data;
    }
    async function insertData() {
        const data = await fetchData();
        insertTitles(data);
        insertHours(data);
    }
    function insertTitles(data) {
        titels.forEach((title, index) => {
            title.innerText = data[index].title;
        })
    }
    function insertHours(data) {
        const value = getCheckedRadio(radioInput);
        data.forEach((item, index) => {
            Hours[index].innerText = `${item.timeframes[value].current}hrs`;
            let text = `Last Week - ${item.timeframes[value].previous} hrs`;
            Previous[index].innerText = text;
        })
    }

    function getCheckedRadio(radio) {
        let value;
        radio.forEach(input => {
            if (input.checked) {
                value = input.value;
                return
            }
        })
        return value;
    }
    radioInput.forEach(radio => {
        radio.addEventListener('change', () => {
            insertData();
        })
    })


    insertData();
})