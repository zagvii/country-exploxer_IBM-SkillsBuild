const params = new URLSearchParams(window.location.search);
let encodedValueName = params.get("name");
let encodedValueFlag = params.get("flag");
let encodedValuePopulation = params.get("population");
let encodedValueRegion = params.get("region");
let encodedValueSubRegion = params.get("subRegion");
let encodedValueCapital = params.get("capital");
let encodedValueCurrencies = params.get("currencies");
let encodedValueLanguages = params.get("languages");
let decodedValueName = decodeURIComponent(encodedValueName);
let decodedValueFlag = decodeURIComponent(encodedValueFlag);
// let decodedValuePopulation = decodeURIComponent(encodedValuePopulation);
// let decodedValueRegion = decodeURIComponent(encodedValueRegion);
let decodedValueSubRegion = decodeURIComponent(encodedValueSubRegion);
let decodedValueCapital = decodeURIComponent(encodedValueCapital);
let decodedValueCurrencies = decodeURIComponent(encodedValueCurrencies);
let decodedValueLanguages = decodeURIComponent(encodedValueLanguages);

const countryCardContainer = document.getElementById('country-card-detail-container');

const card = document.createElement('div');
card.classList.add('country-card-detail');

const nameElement = document.createElement('h1');
nameElement.innerHTML = decodedValueName;
card.appendChild(nameElement);

const flagElement = document.createElement('img');
flagElement.src = decodedValueFlag;
flagElement.alt = `${decodedValueName} Flag`;
card.appendChild(flagElement);

const populationElement = document.createElement('p');
populationElement.innerHTML = `<b>Population:</b> ${encodedValuePopulation}`;
card.appendChild(populationElement);

const regionElement = document.createElement('p');
regionElement.innerHTML = `<b>Region:</b> ${encodedValueRegion}`;
card.appendChild(regionElement);

const subRegionElement = document.createElement('p');
subRegionElement.innerHTML = `<b>Sub Region:</b> ${decodedValueSubRegion}`;
card.appendChild(subRegionElement);

const capitalElement = document.createElement('p');
capitalElement.innerHTML = `<b>Capital:</b> ${decodedValueCapital}`;
card.appendChild(capitalElement);

const currenciesElement = document.createElement('p');
currenciesElement.innerHTML = `<b>Currencies:</b> ${decodedValueCurrencies}`;
card.appendChild(currenciesElement);

const languagesElement = document.createElement('p');
languagesElement.innerHTML = `<b>Languages:</b> ${decodedValueLanguages}`;
card.appendChild(languagesElement);

if (countryCardContainer) {
    countryCardContainer.appendChild(card);
}