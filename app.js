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

        const pokemonCard = document.createElement('div');
        const cardColor = colors[pokeTypes[0]]
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.style.backgroundColor = cardColor
        pokemonCard.innerHTML = `
    <img src="${baseUrl}${i}.png" />
    <span class="pokeID">#${pokeID.toString().padStart(3, '0')}</span>
    <span class="pokeName">${pokeName}</span>
    <span class="pokeTypes">${pokeTypes}</span>
    `
        accordionBody[genNum].append(pokemonCard);
    }
}

createPokemonCard(1, 151, 1);
createPokemonCard(152, 251, 2);
createPokemonCard(252, 386, 3);
createPokemonCard(387, 493, 4);
createPokemonCard(494, 649, 5);
createPokemonCard(650, 721, 6);
createPokemonCard(722, 809, 7);
createPokemonCard(810, 898, 8);

