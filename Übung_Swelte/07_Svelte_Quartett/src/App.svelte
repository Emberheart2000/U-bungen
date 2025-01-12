<script>
    import Card from './components/Card.svelte';
    import animalData from './assets/data/animaldata.js';
  //import Card2 from './components/Card2.svelte';

import { onMount } from 'svelte';

let animals = []
let filteredAnimals = [];

onMount(() => {
    document.getElementById('showOverlayButton').addEventListener('click', showOverlay);
        document.getElementById('closeOverlayButton').addEventListener('click', hideOverlay);
        document.getElementById('closeOverlayButton').addEventListener('click', refreshFilter);
        document.getElementById('searchField').addEventListener('input', search);
        //document.getElementById('startGameButton').addEventListener('click', startGame);
        refreshFilter();
        search();
});
function refreshFilter() {
        const dropdown = document.getElementById('animal-group-filter');
        const selectedFilter = dropdown.value.toLowerCase();
        document.getElementById('selectedFilter').innerHTML = dropdown.value;

        filteredAnimals = selectedFilter === 'All' ? animalData : animalData.filter(animal => animal.groupname.toLowerCase() === selectedFilter);
    }

    function search() {
        const searchValue = document.getElementById('searchField').value.trim().toLowerCase();
        if (searchValue === '') {
            filteredAnimals = animalData; // Alle Tiere anzeigen, wenn das Suchfeld leer ist
        } else {
            filteredAnimals = animalData.filter(animal => 
                animal.name.toLowerCase().includes(searchValue) || searchValue.includes(animal.group.toLowerCase()) && searchValue.includes(animal.group_number.toString().toLowerCase()
        )
            );
        }
    }

    
    function showOverlay() {
        document.getElementById('overlay').style.display = 'block';
    }

    function hideOverlay() {
        document.getElementById('overlay').style.display = 'none';
    }
    function deleteCards() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    }

    function addColorsToAnimalData(){
    }
</script>

<main>
    <header>
        <a><img id="logo" src="/images/Logo Quartett.svg" class="backgroundImage"> </a>
        <h1>Tierquartett</h1>
        <nav>
            <ul>
                <li><a id="showOverlayButton" href="#">Filter: <span id="selectedFilter"></span></a></li>
                <li>
                    <label for="searchField" class="hidden">Search</label>
                    <input type="text" id="searchField" placeholder="Search...">
                </li>
            </ul>
        </nav>
    </header>
    <!-- Overlay -->
    <div id="overlay" class="overlay">
        <div class="overlay-content">
            <a href="#" id="closeOverlayButton" class="close">X</a>
            <div class="filter-container">
                <label class="filter" id="filterText"for="animal-group-filter">Filter nach Gruppe:</label>
                <select class="filter" id="animal-group-filter">
                    <option value="All" selected>All</option>
                    <option value="Predators">Predators</option>
                    <option value="Poisonous and Infectious">Poisonous and Infectious</option>
                    <option value="Reptiles">Reptiles</option>
                    <option value="Sea Creatures">Sea Creatures</option>
                    <option value="Marine Giants">Marine Giants</option>
                    <option value="Large Mammals">Large Mammals</option>
                    <option value="Land Mammals">Land Mammals</option>
                    <option value="Birds">Birds</option>
                </select>
            </div>
        </div>
    </div>
  
    <div id=grid>
        {#each filteredAnimals as animal}
            <Card class={animal.groupname.replace(/\s+/g, '')} name={animal.name} groupnumber={animal.group_number} group={animal.group} imagename={animal.name.toLowerCase()} size={animal.max_length} weight={animal.max_weight} age={animal.max_age} deaths={animal.deaths} speed={animal.top_speed} litter_size={animal.litter_size} trivia={animal.trivia}/>
        {/each}
        
        <!-- <Card name="Lion" groupnumber="A1" imagename="lion" size="250cm" weight="225kg" age="16J" deaths="100" speed="74km/h" litter_size="4"/>
        <Card name="Cheetah" groupnumber="A2" imagename="cheetah" size="150cm" weight="59kg" age="14J" deaths="1" speed="100km/h" litter_size="5"/>
        <Card name="Tiger" groupnumber="A3" imagename="tiger" size="290cm" weight="340kg" age="15J" deaths="50" speed="60km/h" litter_size="4"/>
        <Card name="Hyena" groupnumber="A4" imagename="hyena" size="160cm" weight="85kg" age="12J" deaths="12" speed="60km/h" litter_size="3"/>
        <Card name="Wandering Spider" groupnumber="B1" imagename="wandering spider" size="15cm" weight="0.01kg" age="4J" deaths="10" speed="12km/h" litter_size="1840"/>
        <Card name="Scorpion" groupnumber="B2" imagename="scorpion" size="21cm" weight="0.06kg" age="15J" deaths="1000" speed="19km/h" litter_size="50"/>
        <Card name="Mosquito" groupnumber="B3" imagename="mosquito" size="1cm" weight=".000002kg" age=".15J" deaths="750000" speed="2km/h" litter_size="400"/>
        <Card name="Poison Dart Frog" groupnumber="B4" imagename="poison dart frog" size="6cm" weight=".01kg" age="8J" deaths="3 " speed ="15km/h "litter_size ="35"/>
        <Card name="Crocodile"groupnumber ="C1 "imagename ="crocodile"size ="610cm "weight ="1100kg "age ="70J "deaths ="2500 "speed ="29km/h "litter_size ="80 "/>
        <Card name="Cobra"groupnumber ="C2 "imagename ="cobra"size ="550cm "weight ="20kg "age ="20J "deaths ="30000 "speed ="19km/h "litter_size ="40 "/>
        <Card name="Komodo Dragon" groupnumber ="C3"imagename="komodo dragon" size=300cm weight=80kg age=40J deaths=1 speed=18km/h litter_size=30/>
        <Card name="Galapagos Tortoise" groupnumber="C4" imagename="galapagos tortoise" size=130cm weight=300kg age=176J deaths=0 speed=1km/h litter_size=14/>
        <Card name="Swordfish" groupnumber="D1" imagename="swordfish" size=450cm weight=650kg age=15J deaths=0 speed=100km/h litter_size=15000000/>
        <Card name="Snail" groupnumber="D2" imagename="snail" size=90cm weight=14kg age=1J deaths=10000 speed=.01km/h litter_size =20/>
        <Card name="Colossal Squid" groupnumber="D3" imagename="colossal squid" size="1400cm" weight="495.0kg" age="5J" deaths="0" speed="40km/h" litter_size="10000000"/>
        <Card name="Walrus" groupnumber="D4" imagename="walrus" size="360cm" weight="2000.0kg" age="40J" deaths="0" speed="35km/h" litter_size="1"/>
        <Card name="Whale Shark" groupnumber="E1" imagename="whale shark" size="1450cm" weight="12000.0kg" age="75J" deaths="0" speed="5km/h" litter_size="300"/>
        <Card name="White Shark" groupnumber="E2" imagename="white shark" size="600cm" weight="2500.0kg" age="70J" deaths="10" speed="60km/h" litter_size="10"/>
        <Card name="Blue Whale" groupnumber="E3" imagename="blue whale" size="3360cm" weight="200000kg" age="90J" deaths="0" speed="48km/h" litter_size="1"/>
        <Card name="Orca" groupnumber="E4" imagename="orca" size="950cm" weight="6500kg" age="90J" deaths="0" speed="56km/h" litter_size="1"/>
        <Card name="Elephant" groupnumber="F1" imagename="elephant" size="750cm" weight="6500kg" age="65J" deaths="100" speed="40km/h" litter_size="1"/>
        <Card name="Buffalo" groupnumber="F2" imagename="buffalo" size="340cm" weight="1200kg" age="20J" deaths="200" speed="55km/h" litter_size="1"/>
        <Card name="Polar Bear" groupnumber="F3" imagename="polar bear" size="340cm" weight="1000kg" age="30J" deaths ="1"speed ="40km/h"litter_size ="2"/>
        <Card name ="Hippopotamus "groupnumber ="F4"imagename ="hippopotamus"size ="500cm"weight ="4500kg"age ="50J"deaths ="500"speed ="35km/h"litter_size=1/>
        <Card name="Gorilla" groupnumber="G1" imagename="gorilla" size="1.8m" weight="200kg" age="40J" deaths="0" speed="42km/h" litter_size="1"/>
        <Card name="Grizzly" groupnumber="G2" imagename="grizzly" size="3m" weight="680kg" age="30J" deaths="8" speed="62km/h" litter_size="3"/>
        <Card name="Giraffe" groupnumber="G3" imagename="giraffe" size="6m" weight="1900kg" age="25J" deaths="0" speed="55km/h" litter_size="1"/>
        <Card name="Wolf" groupnumber="G4" imagename="wolf" size="1.6m" weight="80kg" age="13J" deaths="2" speed="64km/h" litter_size="6"/>
        <Card name="Ostrich" groupnumber="H1" imagename="ostrich" size="2.8m" weight="160kg" age="40J" deaths="2" speed="70km/h" litter_size="16"/>
        <Card name="Peregrine Falcon" groupnumber="H2" imagename="peregrine falcon" size="1.14m" weight="1.3kg" age="17J" deaths="0" speed="360km/h" litter_size="5"/>
        <Card name="Albatross" groupnumber="H3" imagename="albatross" size="3.5m" weight="12kg" age="80J" deaths="0" speed="85km/h" litter_size="1"/>
        <Card name="Peacock" groupnumber="H4" imagename="peacock" size="2.3m" weight="6kg" age="15J" deaths="0" speed="16km/h" litter_size="12"/>-->
    </div> 
    <footer><p>&copy; 2023 Tierquartett. All rights reserved.</p>
    </footer>
    <div class="backgroundImageBox"><img id="" src="/images/paper.jpg" class="backgroundImage"></div>
    
    <script src="js/main.js"></script>
</main>


<style>
 
</style>
