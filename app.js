const firstGenAccordionBody = document.querySelector('.first-gen');
const secondGenAccordionBody = document.querySelector('.second-gen');
const thirdGenAccordionBody = document.querySelector('.third-gen');
const fourthGenAccordionBody = document.querySelector('.fourth-gen');
const fifthGenAccordionBody = document.querySelector('.fifth-gen');
const sixthGenAccordionBody = document.querySelector('.sixth-gen');
const seventhGenAccordionBody = document.querySelector('.seventh-gen');
const eighthGenAccordionBody = document.querySelector('.eighth-gen');

const accordionBody = [null, firstGenAccordionBody, secondGenAccordionBody, thirdGenAccordionBody, fourthGenAccordionBody,
    fifthGenAccordionBody, sixthGenAccordionBody, seventhGenAccordionBody, eighthGenAccordionBody]
const baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
const colors = {
    fire: '#FFCBC2',
    water: '#def3fd',
    electric: '#FFEBAD',
    grass: '#defde0',
    ground: '#f4e7da',
    rock: '#d3c89c',
    fairy: '#FFD6FF',
    poison: '#E3C9DE',
    ice: '#c2f0ff',
    bug: '#ECF2BA',
    dark: '#BC9B8A',
    ghost: '#B9B9DF',
    dragon: '#ADC3EB',
    psychic: '#FFC2DA',
    flying: '#adc9ff',
    fighting: '#E4BBB4',
    steel: '#d2d2db',
    normal: '#f5f5f5'
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    return await res.json();
}

async function createPokemonCard(startID, endID, genNum) {
    for (let i = startID; i <= endID; i++) {
        const pokemon = await getPokemon(i)
        const pokeID = pokemon.id;
        const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

        const pokeTypes = pokemon.types.map(t => t.type.name);
        if (pokeTypes.length === 1) {
            typePrimary = pokeTypes[0][0].toUpperCase() + pokeTypes[0].slice(1)
            typeSecondary = ''
        } else {
            typePrimary = pokeTypes[0][0].toUpperCase() + pokeTypes[0].slice(1)
            typeSecondary = pokeTypes[1][0].toUpperCase() + pokeTypes[1].slice(1)
        }

        const pokemonCard = document.createElement('div');
        const cardColor = colors[pokeTypes[0]]
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.style.backgroundColor = cardColor
        pokemonCard.innerHTML = `
    <img src="${baseUrl}${i}.png" />
    <span class="pokeID">#${pokeID.toString().padStart(3, '0')}</span>
    <span class="pokeName">${pokeName}</span>
    <div class="pokeTypes"><div class="type">${typePrimary}</div>
    <div class="type">${typeSecondary}</div>
    </div>
        `
        accordionBody[genNum].append(pokemonCard);
    }
}

const pokemonIndexNumByGenerations = [
    null,
    { startID: 1, endID: 151 },
    { startID: 152, endID: 251 },
    { startID: 252, endID: 386 },
    { startID: 387, endID: 493 },
    { startID: 494, endID: 649 },
    { startID: 650, endID: 721 },
    { startID: 722, endID: 809 },
    { startID: 810, endID: 898 }
]

for (let i = 1; i <= 8; i++) {
    createPokemonCard(pokemonIndexNumByGenerations[i].startID, pokemonIndexNumByGenerations[i].endID, i)
}