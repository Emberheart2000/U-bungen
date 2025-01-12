<script>
  import Hyena from "./Hyena.svelte";
  import Gnu from "./Gnu.svelte";

    export let width;
    export let height;
    export let plants;
    export let hyenas = 1;
    export let gnus = 2;

    function generateHyenasArray(hyenas) {
        return Array.from({ length: hyenas }, (_, i) => `Hyena ${i + 1}`);
    }

    const hyenasArray = generateHyenasArray(hyenas);

    function mapColor(value, start = [243, 245, 159], end = [54, 99, 12]) {
        value = value / 100;
        const r = start[0] + (end[0] - start[0]) * value;
        const g = start[1] + (end[1] - start[1]) * value;
        const b = start[2] + (end[2] - start[2]) * value;
        return `rgb(${r}, ${g}, ${b})`;
    } 
    const reserveColor = mapColor(plants);

</script>



<!-- HTML -->
<div 
    class="reserve" 
    style="height: {height}px; width: {width}px; background-color: {reserveColor};"
>
{#each Array(hyenas) as _, i}
    <Hyena/>
{/each}

{#each Array(gnus) as _, i}
    <Gnu/>
{/each}
<div class="counter">{gnus + hyenas}</div>
</div>

    
<style>
    .reserve {
        border: 5px solid brown;
        border-radius: 10px;
        position: relative;
        overflow: hidden;
    }
    .counter{
        position: absolute;
        top: 0;
        right: 0;
        background-color: black;
        color: white;
        padding: 5px;
        border-radius: 50%;
        height: 30px;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>