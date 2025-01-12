<script>
  let selectedValue;
  let bodies = [];

  function handleSelectionChange(event) {
    selectedValue = event.target.value;
    console.log(`${selectedValue} is selected`);
    fetchBodies();
  }

  async function fetchBodies() {
    try {
      const response = await fetch(
        `https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,${selectedValue}&data=id,bodyType,englishName`
      );
      const data = await response.json();
      console.log(data);
      bodies = data.bodies;
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  }

</script>

<select on:change={handleSelectionChange}>
  <option value="Planet">Planets</option>
  <option value="Moon">Moons</option>
  <option value="Dwarf Planet">Dwarf Planets</option>
</select>

<p>{#if bodies.length >0}
  found {bodies.length} bodies
  {:else}
  no bodies found
  {/if}
</p>