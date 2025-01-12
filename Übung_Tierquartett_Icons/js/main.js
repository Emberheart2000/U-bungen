colors = ['#fed1b7', '#f3dab8', '#c0d6c9', '#cbe8f9', '#f8f5f1', '#b5daf2', '#d1cef8', '#bbf4f3', '#e0f8ce', '#e8edfc', '#b5f2c6', '#e5c1f5', '#c8eaba', '#fdfaf9', '#f5ffef', '#c6f5e4', '#ecc4b4', '#fbd2da', '#e9c3dd', '#e5bdcf'];
const animalNames = ['Lion', 'Cheetah', 'Tiger','Hyena', 'Wandering Spider', 'Scorpion', 'Mosquito', 'Poison Dart Frog','Crocodile','Cobra','Komodo Dragon','Galapagos Tortoise','Swordfish', 'Snail', 'Colossal Squid', 'Walrus', 'Whale Shark', 'White Shark', 'Blue Whale', 'Orca', 'Elephant', 'Buffalo', 'Polar Bear', 'Hippopotamus', 'Gorilla', 'Grizzly', 'Giraffe', 'Wolf', 'Ostrich', 'Peregrine Falcon', 'Albatross', 'Peacock']; // Beispiel-Tiernamen

let randomAnimalName = 'Cheetah'; // Standard-Tiername

document.addEventListener('DOMContentLoaded', function () {
    function init() {
        console.log('Die Seite wurde vollständig geladen.');
        setupClickHandler();
        dataprep(randomAnimalName);
    }

    function dataprep(animalName) {
        fetch('data/animaldata.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Netzwerkantwort war nicht ok');
                }
                return response.json();
            })
            .then(data => {
                const animal = data.find(animal => animal.name === animalName); // Finde das Tier im Datensatz
                if (animal) {
                    const characteristics = [
                        { setting: 'Properties', name: 'Size', attribute: 'max_length', id: 'size' },
                        { setting: 'Properties', name: 'Weight', attribute: 'max_weight', id: 'weight' },
                        { setting: 'Properties', name: 'Age', attribute: 'max_age', id: 'age' },
                        { setting: 'Properties', name: 'Speed', attribute: 'top_speed', id: 'speed' },
                        { setting: 'Properties', name: 'Deaths', attribute: 'deaths', id: 'deaths' },
                        { setting: 'Properties', name: 'Litter', attribute: 'litter_size', id: 'litter' },
                        { setting: 'Trivia', name: 'Trivia', attribute: 'trivia', id: 'trivia' },
                        { setting: 'Group', name: 'Groupclass', attribute: 'group',number: 'group_number', id: 'group' },
                        { setting: 'Header', name: 'Name', attribute: 'name', id: 'animalName' },
                    ];

                    characteristics.forEach(item => {
                        const element = document.getElementById(item.id);
                        if (element) {
                            if (item.setting === 'Properties') {
                                element.textContent = `${animal[item.attribute]}`;
                            } else if (item.setting === 'Trivia') {
                                element.textContent = `${animal[item.attribute]}`;
                            } else if (item.setting === 'Group') {
                                element.textContent = `${animal[item.attribute]}${animal[item.number]}`;
                                switch (animal[item.attribute]) {
                                    case 'A':
                                        element.style.backgroundColor = colors[0];
                                        break;
                                    case 'B':
                                        element.style.backgroundColor = colors[1];
                                        break;
                                    case 'C':
                                        element.style.backgroundColor = colors[2];
                                        break;
                                    case 'D':
                                        element.style.backgroundColor = colors[3];
                                        break;
                                    case 'E':
                                        element.style.backgroundColor = colors[4];
                                        break;
                                    case 'F':
                                        element.style.backgroundColor = colors[5];
                                        break;
                                    case 'G':
                                        element.style.backgroundColor = colors[6];
                                        break;
                                    case 'H':
                                        element.style.backgroundColor = colors[7];
                                        break;
                                }
                                
                            } else if (item.setting === 'Header') {
                                element.textContent = `${animal[item.attribute]}`;
                            }
                        }
                    });
                    //Bilder ändern
                    const animalImage = document.getElementById('animal-image');
                    animalImage.src = `images/${animal.name.toLowerCase()}.png`;
                    animalImage.alt = animal.name_german;
                } else {
                    console.error('Gepard nicht gefunden');
                }
            })
            .catch(error => {
                console.error('Es gab ein Problem mit dem Fetch-Vorgang:', error);
            });
    }
    function setupClickHandler() {
        document.addEventListener('click', function() {
            const randomAnimalName = animalNames[Math.floor(Math.random() * animalNames.length)];
            console.log('Zufälliger Tiername:', randomAnimalName);
            dataprep(randomAnimalName);
        });
    }

    init();
});
