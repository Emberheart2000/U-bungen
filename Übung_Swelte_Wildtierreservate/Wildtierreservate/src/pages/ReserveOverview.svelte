<script>
  import Reserve from "../components/Reserve.svelte";
  import { getRandomInt } from "../assets/utils";
  import { get } from "svelte/store";

  let reserveCount = getRandomInt(1, 5);
</script>

<div id="reserveWrapper">
    <!-- <Reservat name="Panda" height="200" width="200" />
    <Reservat name="Löwe" height="100" width="200" /> -->
    {#each Array(reserveCount) as _, i}
      <Reserve
        width={getRandomInt(150, 300)}
        height={getRandomInt(150, 300)}
        plants={getRandomInt(0, 100)}
        hyenas={getRandomInt(2, 6)}
        gnus={getRandomInt(4, 10)}
      />
    {/each}
  </div>

  <style>
  #reserveWrapper {
    display: flex;
    max-width: 1200px;
    margin: auto;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1em;
  }
  </style>