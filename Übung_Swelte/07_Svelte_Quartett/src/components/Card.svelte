<script>
    export let name;
    export let group;
    export let groupnumber;
    export let imagename;
    export let size;
    export let weight;
    export let age;
    export let speed;
    export let deaths;
    export let litter_size;
    export let trivia;
</script>

<div id="animal" class="animalCard">
    <img id="animal-image" src="/images/{imagename}.png" alt="Tierbild" class="Tierbild">
    <div class="cardHeader">
        <div id="group" class="group">{group}{groupnumber}</div>
        <h4 id="animalName">{name}</h4>
    </div>
    <div class="stats">
        <div id="sizeIconBox" class="iconBox">
            <img id="sizeIcon" src="src/assets/icons/ruler.png" alt="Size Icon" class="Icon sizeIcon">
            <div id="size" class="Kategorie">{size}</div>
        </div>
        <div id="weightIconBox" class="iconBox">
            <img id="weightIcon" src="src/assets/icons/weighing-machine.png" alt="Weight Icon" class="Icon">
            <div id="weight" class="Kategorie">{weight}</div>
        </div>
        <div id="ageIconBox" class="iconBox">
            <img id="ageIcon" src="src/assets/icons/hourglass.png" alt="Age Icon" class="Icon ageIcon">
            <div id="age" class="Kategorie">{age}</div>
        </div>
        <div id="speedIconBox" class="iconBox">
            <img id="speedIcon" src="src/assets/icons/deadline.png" alt="Speed Icon" class="Icon speedIcon">
            <div id="speed" class="Kategorie">{speed}</div>
        </div>
        <div id="deathsIconBox" class="iconBox">
            <img id="deathsIcon" src="src/assets/icons/skull-and-bones.png" alt="Deaths Icon" class="Icon deathIcon">
            <div id="deaths" class="Kategorie">{deaths}</div>
        </div>
        <div id="litterIconBox" class="iconBox">
            <img id="litterIcon" src="src/assets/icons/animal.png" alt="Litter Icon" class="Icon litterIcon">
            <div id="litter" class="Kategorie">{litter_size}</div>
        </div>
    </div>
    <div class="trivia"><p id="trivia" class="triviaContent">{trivia}</p></div>
</div>

<style>

</style>
