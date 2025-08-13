document.addEventListener('DOMContentLoaded', () => {
    const countriesContainer = document.getElementById('countries');

    const search = document.getElementById('search-input');
    const filter = document.getElementById('filter');

    const mainontainers = document.getElementById('main');
    const detailsContainers = document.getElementById('details');

    const backButton = document.getElementById('back');

    const regions = [];

    async function fetchData() {
        try {
            const res = await fetch('data.json');
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    async function insertData() {
        const data = await fetchData();
        createContainers(data);
        addSearchEventListener(data);
        addFilter(data);
    }
    function createContainers(data) {
        data.forEach(country => {
            if (!regions.includes(country.region)) {
                regions.push(country.region);
            }
            const container = document.createElement('div');
            container.className = `country`;
            container.id = country.name;
            container.name = country.region;

            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';

            const image = document.createElement('img');
            image.src = country.flags.png;
            image.alt = `Flag of ${country.name}`;
            imageContainer.appendChild(image);

            container.appendChild(imageContainer);

            const informations = document.createElement('div');
            informations.className = 'informations';
            container.appendChild(informations);

            const title = document.createElement('h3');
            title.className = 'title';
            title.innerText = country.name;
            informations.appendChild(title);

            const population = document.createElement('h5');
            population.innerHTML = `<h5>Population: <span>${country.population}</span></h5>`;
            informations.appendChild(population);

            const region = document.createElement('h5');
            region.innerHTML = `<h5>Region: <span>${country.region}</span></h5>`;
            informations.appendChild(region);

            const capital = document.createElement('h5');
            capital.innerHTML = `<h5>Capital: <span>${country.capital}</span></h5>`;
            informations.appendChild(capital);
            // Append the container to the main container
            countriesContainer.appendChild(container);
            container.addEventListener('click', () => { displayDetails(country, data) })
        });
    }
    function displayDetails(country, data) {
        mainontainers.style.display = 'none';
        detailsContainers.style.display = 'flex';
        insertCountryDetails(country);
        insertBorderedButtons(data, country);
    }
    function insertCountryDetails(country) {
        const flagContainer = document.getElementById('flag');
        const flag = document.createElement('img');
        flag.src = country.flags.svg;
        flagContainer.innerHTML = '';
        flagContainer.appendChild(flag);

        const countryName = document.getElementById('country-name');
        countryName.innerText = country.name;

        const nativeNmae = document.getElementById('native');
        nativeNmae.innerText = country.nativeName;

        const population = document.getElementById('population');
        population.innerText = country.population;

        const region = document.getElementById('region');
        region.innerText = country.region;

        const subRegion = document.getElementById('sub-region');
        subRegion.innerText = country.subregion;

        const capital = document.getElementById('capital');
        capital.innerText = country.capital;

        const domains = document.getElementById('domains');
        domains.innerText = ListItemsToString(country.topLevelDomain);

        const currencies = document.getElementById('currencies');
        let Codes = [];
        country.currencies.forEach(element => {
            Codes.push(element.code);
        });
        currencies.innerText = ListItemsToString(Codes)

        const languages = document.getElementById('languages');
        let names = [];
        country.languages.forEach(language => {
            names.push(language.name);
        })
        languages.innerText = ListItemsToString(names);
    }
    function insertBorderedButtons(data, country) {

        const bordered = document.getElementById('bordred');
        bordered.innerHTML = '';
        country.borders.forEach(Country => {
            const button = document.createElement('button');
            const Bordered = data.find(item => item.alpha3Code === Country);
            button.innerText = Bordered.name;
            bordered.appendChild(button);
            button.addEventListener('click', () => {
                displayDetails(Bordered, data);
            });
        });
    }
    function ListItemsToString(list) {
        let text = '';
        for (let index = 0; index < list.length; index++) {
            text += list[index];
            if (index < list.length - 1) {
                text += ', ';
            }
        }
        return text;
    }
    function filterByRegion(region) {
        const countries = document.querySelectorAll('.country');
        if (region == 'All') {
            countries.forEach(country => {
                country.style.display = 'block';
            });
            return;
        }
        countries.forEach(country => {
            if (country.name != region) {
                country.style.display = 'none';
            } else {
                country.style.display = 'block';
            }
        });
    }
    backButton.addEventListener('click', () => {
        mainontainers.style.display = 'flex';
        detailsContainers.style.display = 'none';
    })
    function addSearchEventListener(data) {
        search.addEventListener('input', (event) => {
            const value = event.target.value.toLowerCase();
            data.forEach(country => {
                const isVisisble = country.name.toLowerCase().includes(value);
                const card = document.getElementById(country.name);
                card.classList.toggle('hide', !isVisisble);
            })
        })
    }
    function addFilter(data) {
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            filter.appendChild(option);
        });
    }
    filter.addEventListener('change', () => { filterByRegion(filter.value) })
    insertData();
});
