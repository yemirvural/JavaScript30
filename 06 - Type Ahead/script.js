const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
const inputDOM = document.querySelector('.search');
const listDOM = document.querySelector('.suggestions');

fetch(endpoint)
.then(res => res.json())
.then(data => cities.push(...data));

function findMatches(wordToMatch, cities){
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex)
    });
} 

function displayMatches(){
    const matchArray = findMatches(this.value, cities);
    let html = "";  
    
    
    matchArray.map(el => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = el.city.replace(regex, `<span class="hl">${this.value}</span>`)
        const stateName = el.state.replace(regex, `<span class="hl">${this.value}</span>`)
        html += 
            `<li>
                <span>${cityName}, ${stateName}</span>
                <span>${el.population}</span>
            </li>`
            });
        listDOM.innerHTML = html;
}

inputDOM.addEventListener('keyup', displayMatches);