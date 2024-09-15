let pokemonJson, i = 1, allPokemons;



function getPokemonByURL(url) {
    pokemons = fetch(url)
        .then(response => response.json())
        .then(results => {
            console.log(results.next);
            return results
        })
}
function getPokemonById(pokemonId) {
    const imgurl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}`;
    const pokemonName = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then((pokeData) => {

            document.getElementById(`pokemonImg${pokemonId}`).src = pokeData.sprites.other.dream_world.front_default;
            document.getElementById(`contentArea${pokemonId}`).innerHTML = `<span><h2>${pokeData.name}</h2></span><span><h3>${pokeData.weight}</h2></span>`;
        }
        );

}


function populateGrid(pokemons, offset) {
    debugger
    
    pokemons.filter((x,i)=>(i<offset))
    document.getElementById("cards").innerHTML ="";
    pokemons.forEach(pokemon => {
        pokeId = pokemon.url.split('https://pokeapi.co/api/v2/pokemon/')[1].split('/')[0]
        document.getElementById("cards").innerHTML += `<div id="card${pokeId}" class="card">
            <img id="pokemonImg${pokeId}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png" alt="${pokemon.name}">
            <div id="contentArea${pokeId}"><span><h2>${pokemon.name}</h2></span></div>
        </div>`;
    });
}
//let i = 1;
/* window.onload = () => {
    getAllPokemons(`https://pokeapi.co/api/v2/pokemon`);
    while (i <= 150) {
        document.getElementById("cards").innerHTML += `<div id="card${i}" class="card">
                 
                 <img id="pokemonImg${i}" src="" alt="no image">
                 <div id="contentArea${i}"></div>
             </div>`;

        getPokemon(i); i++;

    }
} */

window.onload = async () => {
    pokemons = await getAllPokemons(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1400`);
    let filteredPokemons = pokemons.filter((x,i)=>(i<20))
    
    populateGrid(filteredPokemons, 100);
}

function filterPokemons(pokemonName) {
    ///use filter function to reduce the array of pokemons to the ones having the mentioned pokemon name
    debugger
    pokemons.filter(x => (x.name.includes(pokemonName.toLowerCase())));
    populateGrid(pokemons.filter(x => (x.name.includes(pokemonName.toLowerCase()))),1000)
}

async function getAllPokemons(initUrl) {
    /**This function gets all the pokemons recursively in batches of 20 */
    debugger
    let pokeResponse = await fetch(initUrl);
    let allPokemonsJson = await pokeResponse.json();
    allPokemons = allPokemonsJson.results;
    console.log(allPokemons.length - 20);

    console.log(allPokemons);
    console.log(allPokemonsJson.next)
    while (allPokemonsJson.next) {
        pokeResponse = await fetch(allPokemonsJson.next);
        allPokemonsJson = await pokeResponse.json();
        let newPokemons = allPokemonsJson.results;
        allPokemons.push(...newPokemons);
        console.log(allPokemons.length - 20);
    }

    return allPokemons;
}



//getPokemon(14);