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
const cardColors = {
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

const typeColors = {
    fire: '#FF4422',
    water: '#3399FF',
    electric: '#FFCC33',
    grass: '#9BCC50',
    ground: '#DDBB55',
    rock: '#BBAA66',
    fairy: '#FFAAFF',
    poison: '#AA5599',
    ice: '#77DDFF',
    bug: '#AABB22',
    dark: '#775544',
    ghost: '#6666BB',
    dragon: '#7766EE',
    psychic: '#FF5599',
    flying: '#6699FF',
    fighting: '#BB5544',
    steel: '#AAAABB',
    normal: '#BBBBAA'
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

        //pokemonCard
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.style.backgroundColor = cardColors[pokeTypes[0]]

        //pokemonSprite
        const pokemonSprite = document.createElement('img')
        pokemonSprite.src = `${baseUrl}${i}.png`

        //pokemonID
        const pokemonID = document.createElement('span');
        const paddedID = pokeID.toString().padStart(3, '0')
        pokemonID.classList.add('pokeID')
        pokemonID.innerHTML = `#${paddedID}`

        //pokemonName
        const pokemonName = document.createElement('span');
        pokemonName.classList.add('pokeName')
        pokemonName.innerHTML = `${pokeName}`
        if (pokeName.length >= 12) {
            pokemonName.style.fontSize = '12px'
        }

        //pokemonType
        const pokemonType = document.createElement('div')
        const typeOne = document.createElement('div')
        const typeTwo = document.createElement('div')
        pokemonType.classList.add('pokemonTypes')
        typeOne.classList.add('type')
        typeOne.classList.add('typeOne')
        typeTwo.classList.add('type')
        typeOne.style.backgroundColor = typeColors[pokeTypes[0]]
        typeTwo.style.backgroundColor = typeColors[pokeTypes[1]]
        typeOne.innerHTML = `${typePrimary}`
        typeTwo.innerHTML = `${typeSecondary}`
        pokemonType.append(typeOne);
        pokemonType.append(typeTwo);

        //Filling the pokemonCard & the accordion body
        pokemonCard.append(pokemonSprite)
        pokemonCard.append(pokemonID)
        pokemonCard.append(pokemonName)
        pokemonCard.append(pokemonType)
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