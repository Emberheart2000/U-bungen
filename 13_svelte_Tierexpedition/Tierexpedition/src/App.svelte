<script>
    import { Router } from 'svelte-spa-router';
    import Home from './pages/Home.svelte';
    import About from './pages/About.svelte';
    import NotFound from './pages/NotFound.svelte';
    import Game from './pages/Game.svelte';

    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
    import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
    

    let scene, camera, renderer, controls, particleSystem, raycaster, mouse;
    let floor, model;
    let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;

    function init() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Sanfte Bewegungen
        controls.enablePan = false; // Deaktiviert das Verschieben der Kamera
        controls.enableZoom = true; // Zoom bleibt aktiv
        controls.minDistance = 1; // Mindestabstand beim Zoomen
        controls.maxDistance = 100; // Maximaler Abstand beim Zoomen
        controls.update();

        camera.position.set(0, 5, 5); // Kamera leicht über dem Boden positionieren
        camera.lookAt(0, 0, 0); // Kamera auf den Ursprung ausrichten

        // Hintergrundfarbe setzen
        renderer.setClearColor(0x87ceeb); // Himmelblau

        // Hintergrundtextur laden
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('desert_sky2.jpg', (texture) => {
            scene.background = texture;
        });

        // Lichtquellen hinzufügen
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Weiches Umgebungslicht
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Richtungslicht
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        // Raycaster und Maus
        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();

        // Initiale Textur und Modell laden
        loadFloorTexture('desert.jpg');
        loadModel('/scorpion/scene.gltf', 0.003, 0, 0, 0);

        // Staubpartikel hinzufügen
        addDustParticles();

        //Mehrere Planes mit PNG-Texturen hinzufügen
        // addRandomPlanes(10, 'Stein.svg', 2.5);
        // addRandomPlanes(5, 'termites.svg');
        // addRandomPlanes(10, 'bush.png', 10);
        // addRandomPlanes(10, 'tree.png', 25);
        // addRandomPlanes(15, 'cactus.png', 6);
        // addRandomPlanes(30, 'pyramid.png', 10);

        // SVG-Illustrationen laden und zur Szene hinzufügen
        //loadSVG(5, 'pyramid.svg', 0.05, 100,4,50);
        loadSVG(10, 'stone.svg', 0.03, 100,3,50);
        loadSVG(10, 'acazia.svg',0.1, 100,13.5,50);
        loadSVG(10, 'bush.svg', 0.04, 100,5.5,50);
        loadSVG(10, 'cactus.svg', 0.03, 100,2.6,50);
        loadSVG(1, 'termites.svg', 0.03, 0,2.8,10);

        animate();
    }

    function loadFloorTexture(texturePath, texturescale = 3) {
        const floorGeometry = new THREE.PlaneGeometry(200, 100);
        const textureLoader = new THREE.TextureLoader();
        const floorTexture = textureLoader.load(
            texturePath, // Pfad zur Textur
            (texture) => {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(texturescale, texturescale); // Skalierung der Textur anpassen
                console.log('Textur erfolgreich geladen');
            },
            undefined,
            (err) => {
                console.error('Fehler beim Laden der Textur:', err);
            }
        );
        const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
        if (floor) {
            scene.remove(floor);
        }
        floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = Math.PI / 2; // Boden horizontal ausrichten
        floor.position.y = 0; // Boden auf y=0 setzen
        scene.add(floor);
    }

    function loadModel(modelPath, scale=1, posx=0, posy=0, posz=0) {
        const loader = new GLTFLoader();
        loader.load(
            modelPath, // Pfad zu Ihrem 3D-Modell
            (gltf) => {
                if (model) {
                    scene.remove(model);
                }
                model = gltf.scene;
                model.position.set(posx, posy, posz); // Setzen Sie die Position des Modells
                model.scale.set(scale, scale, scale); // Skalierung des Modells
                scene.add(model);
                console.log('Modell erfolgreich geladen');
            },
            undefined,
            (error) => {
                console.error('Fehler beim Laden des Modells:', error);
            }
        );
    }

    function addRandomPlanes(count=10, texturePath, scale = 5) {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(texturePath);

        for (let i = 0; i < count; i++) {
            const planeGeometry = new THREE.PlaneGeometry(1, 1);
            const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, transparent: true });
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.scale.set(scale, scale, scale); // Skalierung des Planes
            // Zufällige Position setzen
            plane.position.set(
                Math.random() * 100-50, // x-Position zwischen -10 und 10
                0,     // y-Position zwischen 0 und 5
                Math.random() * 50  // z-Position zwischen -10 und 10
            );

            // Zufällige Rotation setzen
            plane.rotation.set(
                0, // x-Rotation
                THREE.MathUtils.degToRad(Math.random() * 20), // y-Rotation
                0  // z-Rotation
            );

            scene.add(plane);
        }
    }

    function loadSVG(count, svgPath, scale=0.03, posx=100, posy=3, posz=100) {
        for (let i = 0; i < count; i++) {
        const loader = new SVGLoader();
        loader.load(
            svgPath,
            (data) => {
                const paths = data.paths;
                const group = new THREE.Group();

                paths.forEach((path) => {
                    const material = new THREE.MeshBasicMaterial({
                        color: path.color,
                        side: THREE.DoubleSide,
                        depthWrite: false,
                        transparent: true,
                        opacity: 1.0,
                    });

                    const shapes = SVGLoader.createShapes(path);
                    shapes.forEach((shape) => {
                        const geometry = new THREE.ShapeGeometry(shape);
                        const mesh = new THREE.Mesh(geometry, material);
                        group.add(mesh);
                    });
                });

                group.position.set(Math.random()*posx-posx/2, posy, Math.random()*posz); // Setzen Sie die Position der Gruppe
                group.scale.set(scale, scale, scale); // Skalierung der Gruppe
                group.rotation.set(0, 0, Math.PI); // Rotation der Gruppe
                scene.add(group);
                console.log('SVG erfolgreich geladen');
            },
            undefined,
            (error) => {
                console.error('Fehler beim Laden der SVG:', error);
            }
        );
        }
    }

    function addDustParticles() {
        const particleCount = 100;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = Math.random() * 200 - 100; // x-Position
            positions[i * 3 + 1] = Math.random() * 50; // y-Position
            positions[i * 3 + 2] = Math.random() * 200 - 100; // z-Position
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: 0xC2B280,
            size: 0.3,
            transparent: true,
            opacity: 0.5
        });

        particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);
    }

    function onMouseClick(event) {
        // Mausposition normalisieren
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Raycaster aktualisieren
        raycaster.setFromCamera(mouse, camera);

        // Überprüfen, ob der Skorpion getroffen wurde
        const intersects = raycaster.intersectObject(model, true);
        if (intersects.length > 0) {
            console.log('Skorpion angeklickt!');
            // Hier können Sie weitere Aktionen ausführen, wenn der Skorpion angeklickt wird
        }
    }

    // Animationsschleife
    function animate() {
        requestAnimationFrame(animate);

        const step = 0.1;
        if (moveForward) camera.position.z -= step;
        if (moveBackward) camera.position.z += step;
        if (moveLeft) camera.position.x -= step;
        if (moveRight) camera.position.x += step;

        // Partikelbewegung aktualisieren
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] -= 0.1; // y-Position verringern (Staub fällt nach unten)
            positions[i] += Math.random() * 0.5 - 0.1; // x-Position zufällig ändern
            if (positions[i + 1] < 0 || positions[i] > 100) {
                positions[i + 1] = 50; // Partikel zurück nach oben setzen, wenn sie den Boden erreichen
                positions[i] = Math.random() * 200 - 100; // x-Position zufällig setzen
            }
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;

        controls.update(); // Dämpfung anwenden
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

        // Mausklick-Event hinzufügen
        document.addEventListener('click', onMouseClick);
    });
</script>

<main>
    <!-- Hier wird die 3D-Szene gerendert -->
    <button on:click={() => loadFloorTexture('rainforest.jpg',10)}>Neue Bodentextur laden</button>
    <button on:click={() => loadModel('poison_frog.glb',0.05)}>Neues Modell laden</button>
</main>

<Router>
    <Home path="/" />
    <About path="/about" />
    <Animals path="/animals" />
  </Router>