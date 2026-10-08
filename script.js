function populateCountryCards() {
    const countryCardsContainer = document.getElementById('country-cards-container');
    if (countryCardsContainer) countryCardsContainer.innerHTML = '';

    const countries = data;
    const filteredCountries = countries.filter(country => {
        const nameMatch = !filters.name || country.name.common.toLowerCase().includes(filters.name.toLowerCase()) || country.name.official.toLowerCase().includes(filters.name.toLowerCase());
        const populationMatch = !filters.population || country.population >= Number(filters.population);
        const regionMatch = !filters.region || filters.region === 'All' || country.region === filters.region;

        return nameMatch && populationMatch && regionMatch;
    });

    if (filteredCountries.length === 0) {
        countryCardsContainer.innerHTML = '<p>No countries found.</p>';

    } else {
        for (let i = 0; i < displayCount && i < filteredCountries.length; i++) {
            const country = filteredCountries[i];
            const card = document.createElement('div');
            card.classList.add('country-card');

            card.addEventListener('click', () => {
                countryCardHandler(country);
            });

            const flagElement = document.createElement('img');
            flagElement.src = country.flags.png;
            flagElement.alt = `${country.name.common} Flag`;
            card.appendChild(flagElement);

            const nameElement = document.createElement('h2');
            nameElement.innerHTML = country.name.common;
            card.appendChild(nameElement);

            const populationElement = document.createElement('p');
            populationElement.innerHTML = `<b>Population:</b> ${country.population.toLocaleString()}`;
            card.appendChild(populationElement);

            const capitalElement = document.createElement('p');
            capitalElement.innerHTML = `<b>Capital:</b> ${country.capital}`;
            card.appendChild(capitalElement);

            const regionElement = document.createElement('p');
            regionElement.innerHTML = `<b>Region:</b> ${country.region}`;
            card.appendChild(regionElement);

            if (countryCardsContainer) {
                countryCardsContainer.appendChild(card);
            }
        }
    }

    if (filteredCountries.length < displayCount) {
        loadMoreButton.style.display = 'none';
    }

    console.log(filteredCountries.length);
}

function showMoreHandler() {
    displayCount += 10;
    populateCountryCards();
}

function filterData() {
    displayCount = 12;

    const inputValue = searchInput.value.trim();
    let regex = new RegExp (/^[a-zA-Z -]*$/);
    if (!regex.test (inputValue)) {
        document.getElementById('searchInputNameMessage').innerHTML = 'Enter valid Country Name.';
        document.getElementById('searchInputNameMessage').classList.add('error');
        return false;
    } else {
        document.getElementById('searchInputNameMessage').innerHTML = '';
        document.getElementById('searchInputNameMessage').classList.remove('error');
    }

    const inputPopulationValue = searchInputPopulation.value.trim();
    if (inputPopulationValue > 1500000000) {
        document.getElementById('searchInputPopulationMessage').innerHTML = 'Country’s population cannot be greater than 1.5 billion.';
        document.getElementById('searchInputPopulationMessage').classList.add('error');
        return false;
    } else {
        document.getElementById('searchInputPopulationMessage').innerHTML = 'Max: 1.5 Billion (1500000000)';
        document.getElementById('searchInputPopulationMessage').classList.remove('error');
    }

    filters.name = inputValue.toLowerCase();
    filters.population = inputPopulationValue;
    filters.region = searchInputRegion.value;

    populateCountryCards();
}

function countryCardHandler(country) {
    let queryString =
        "?name=" + encodeURIComponent(country.name.official) +
        "&flag=" + encodeURIComponent(country.flags.svg) +
        "&population=" + country.population +
        "&region=" + country.region +
        "&subRegion=" + encodeURIComponent(country.subregion) +
        "&capital=" + encodeURIComponent(country.capital) +
        "&currencies=" + encodeURIComponent(getFormattedNames(country.currencies)) +
        "&languages=" + encodeURIComponent(getFormattedNames(country.languages));

    window.location.href = "detail.html" + queryString;
}

function getFormattedNames(namesObject) {
    let formattedNames = '';

    if (namesObject === undefined || namesObject === null) {
        return 'N/A';
    } else {
        for (let i = 0; i < namesObject.length; i++) {
            if (i > 0) {
                formattedNames += ', ';
            }
            formattedNames += namesObject[i].name;
        }
    }
    return formattedNames;
}

let displayCount = 12;
let filters = {
    name: '',
    population: '',
    region: ''
};

const searchInput = document.getElementById('searchInputName');
searchInput.addEventListener('input', filterData);

const searchInputPopulation = document.getElementById('searchInputPopulation');
searchInputPopulation.addEventListener('input', filterData);

const searchInputRegion = document.getElementById('searchSelectRegion');
searchInputRegion.addEventListener('change', filterData);

const loadMoreButton = document.getElementById('load-more-button');
loadMoreButton.addEventListener('click', showMoreHandler);

populateCountryCards();