const baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

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
            typeSecondary = null
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
        pokemonID.innerText = `#${paddedID}`

        //pokemonName
        const pokemonName = document.createElement('span');
        pokemonName.classList.add('pokeName')
        pokemonName.innerText = `${pokeName}`
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
        typeOne.innerText = `${typePrimary}`
        if (typeSecondary) {
            typeTwo.innerText = `${typeSecondary}`
        }
        pokemonType.append(typeOne);
        pokemonType.append(typeTwo);

        //Filling the pokemonCard & the accordion body
        pokemonCard.append(pokemonSprite)
        pokemonCard.append(pokemonID)
        pokemonCard.append(pokemonName)
        pokemonCard.append(pokemonType)
        document.querySelector(accordionBody[genNum]).append(pokemonCard);
    }
}

for (let i = 1; i <= 8; i++) {
    createPokemonCard(pokemonIndexNumByGenerations[i].startID, pokemonIndexNumByGenerations[i].endID, i)
}