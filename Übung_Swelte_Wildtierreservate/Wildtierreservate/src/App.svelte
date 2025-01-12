<script>
  import Router from "svelte-spa-router";

  import LandingPage from "./pages/LandingPage.svelte";
  import ReserveOverview from "./pages/ReserveOverview.svelte";
  import AnimalQuartett from "./pages/AnimalQuartett.svelte";

  const routes = {
    "/": LandingPage,
    "/reserve": ReserveOverview,
    "/animalquartett": AnimalQuartett,
  };
</script>

<header>
  <h1>Programmieren != passion</h1>
  <nav>
    <a href="#/"> Home</a>
    <a href="#/reserve">Reservate</a>
    <a href="#/animalquartett">Tierquartett</a>
  </nav>
</header>
<main>
  <Router {routes} />
</main>

<style>
  
</style>
