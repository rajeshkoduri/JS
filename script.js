function getPokemon( pokemonId ) {
    const imgurl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}`;
    const pokemonName = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => response.json())
    .then((pokeData)=>{
        
        document.getElementById(`pokemonImg${pokemonId}`).src = pokeData.sprites.other.dream_world.front_default;
        document.getElementById(`contentArea${pokemonId}`).innerHTML= `<span><h2>${pokeData.name}</h2></span><span><h3>${pokeData.weight}</h2></span>` ;
    }
);
    
}
let i=1;
 window.onload = () =>{
     while (i<=150){
         debugger
         document.getElementById("cards").innerHTML += `<div id="card${i}" class="card">
                 
                 <img id="pokemonImg${i}" src="" alt="no image">
                 <div id="contentArea${i}"></div>
             </div>`;
             
             getPokemon(i);i++;
     
     }
 }

 function filterPokemonList (pokemonName){
    
 }


    


//getPokemon(14);