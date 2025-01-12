<script>
    import { getRandomInt } from "../assets/utils";
</script>

<div 
class="gnu" 
style="
top: {getRandomInt(0,85)}%; 
left: {getRandomInt(0,85)}%;
">
</div>

<style>
.gnu {
    background-image: url('./images/hyenas.png');
    background-size: cover;
    background-color: rgb(184, 184, 184);
    height: 30px;
    width: 30px;
    border: 5px solid rgb(184, 184, 184);
    border-radius: 50%;
    position: absolute;
}
</style>