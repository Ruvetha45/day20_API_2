fetch('https://restcountries.com/v3.1/all')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const countryCards = document.getElementById('country-cards');
        const fragment = document.createDocumentFragment();

        data.forEach(country => {
            const card = createCountryCard(country);
            fragment.appendChild(card);
        });

        countryCards.appendChild(fragment);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

function createCountryCard(country) {
    const card = document.createElement('div');
    card.classList.add('col-lg-4', 'col-md-6', 'col-sm-12');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card');

    const cardHeader = createCardHeader(country.name.common);

    const cardBody = createCardBody(country);

    cardInner.appendChild(cardHeader);
    cardInner.appendChild(cardBody);

    card.appendChild(cardInner);

    return card;
}

function createCardHeader(countryName) {
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header', 'text-white', 'bg-black');

    const countryNameElement = document.createElement('h5');
    countryNameElement.textContent = countryName;

    cardHeader.appendChild(countryNameElement);

    return cardHeader;
}

function createCardBody(country) {
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'bg-info');

    const flagImage = document.createElement('img');
    flagImage.classList.add('card-img-top');
    flagImage.src = country.flags.png;
    flagImage.alt = `${country.name.common} Flag`;
    flagImage.style.width = '100%';
    flagImage.style.height = '180px';

    const capitalText = createCardText(`Capital: ${country.capital}`);
    const regionText = createCardText(`Region: ${country.region}`);
    const countryCodeText = createCardText(`Country Code: ${country.cca3}`);

    cardBody.appendChild(flagImage);
    cardBody.appendChild(capitalText);
    cardBody.appendChild(regionText);
    cardBody.appendChild(countryCodeText);

    return cardBody;
}

function createCardText(textContent) {
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = textContent;
    return cardText;
}