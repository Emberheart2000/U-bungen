<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

    let scene, camera, renderer, controls;
    let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;

    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enablePan = false; // Deaktiviert das Panning mit der Maus
        controls.enableRotate = false; // Deaktiviert das Rotieren mit der Maus
        controls.enableZoom = true; // Zoom mit der Maus erlauben
        //controls.target.set(0, 0, 0); // Setzt das Ziel der Kamera auf den Ursprung
        camera.position.set(0, 5, 5); // Kamera leicht über dem Boden positionieren
        camera.lookAt(camera.position.x+10, 0, 0); // Kamera auf den Ursprung ausrichten
        controls.update();

        // Beispiel: Einfache Box hinzufügen
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Zielobjekt hinzufügen
        const targetGeometry = new THREE.BoxGeometry(1, 1, 1);
        const targetMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const targetCube = new THREE.Mesh(targetGeometry, targetMaterial);
        targetCube.position.set(0, 0, 0); // Position des Zielobjekts
        scene.add(targetCube);

        // Boden hinzufügen
        const floorGeometry = new THREE.PlaneGeometry(100, 100);
        const textureLoader = new THREE.TextureLoader();
        const floorTexture = textureLoader.load(
            'ground.jpg', // Relativer Pfad zur Textur
            (texture) => {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(3, 3); // Skalierung der Textur anpassen
                console.log('Textur erfolgreich geladen');
            },
            undefined,
            (err) => {
                console.error('Fehler beim Laden der Textur:', err);
            }
        );
        const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = Math.PI / 2; // Boden horizontal ausrichten
        floor.position.y = 0; // Boden auf y=0 setzen
        scene.add(floor);

        animate();
    }

    // Animationsschleife
    function animate() {
        requestAnimationFrame(animate);

        const step = 0.1;
        if (moveForward) camera.position.z -= step;
        if (moveBackward) camera.position.z += step;
        if (moveLeft) camera.position.x -= step;
        if (moveRight) camera.position.x += step;

        // Konsolenausgabe zur Überprüfung der Kameraausrichtung
        console.log(`Camera Position: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`);
        console.log(`Camera LookAt: x=0, y=0, z=0`);

        controls.update();
        renderer.render(scene, camera);
    }

    // Initialisierung beim Laden der Komponente
    onMount(() => {
        init();

        // Kontextmenü deaktivieren
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });

        // Tastatursteuerung hinzufügen
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'w':
                    moveForward = true;
                    break;
                case 's':
                    moveBackward = true;
                    break;
                case 'a':
                    moveLeft = true;
                    break;
                case 'd':
                    moveRight = true;
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'w':
                    moveForward = false;
                    break;
                case 's':
                    moveBackward = false;
                    break;
                case 'a':
                    moveLeft = false;
                    break;
                case 'd':
                    moveRight = false;
                    break;
            }
        });
    });
</script>

<main>
    <!-- Hier wird die 3D-Szene gerendert -->
</main>