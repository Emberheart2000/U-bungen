<script>
    import { getRandomInt } from "../assets/utils";
</script>

<div 
class="hyena" 
style="
top: {getRandomInt(0,85)}%; 
left: {getRandomInt(0,85)}%;
">
</div>

<style>
.hyena {
    background-image: url('./images/hyenas.png');
    background-size: cover;
    background-color: rgb(245, 226, 151);
    height: 20px;
    width: 20px;
    border: 5px solid rgb(245, 226, 151);
    border-radius: 50%;
    position: absolute;
}
</style>