three-toy: Minimal Three.js Demo

Overview

A minimal Three.js demonstration showing a spinning Icosahedron geometry with a wireframe toggle.

Quick-create Command (static-demo)

Use the saved command template static-demo to create a new static GitHub demo repository:

### static-demo: create a new static demo repo

```sh
gh repo create my-demo --public
cd my-demo
echo "<h1>My Demo</h1>" > index.html
git add .
git commit -m "init"
gh repo view --web  # configure remote if needed
```

This template is stored under the alias static-demo for future use.

##### Project Setup

Scaffold the project using Vite (vanilla template) or manually as a static folder.

###### With Vite
```sh
npx create-vite@latest three-toy --template vanilla
cd three-toy
npm install three
```

###### Manual Setup
```sh
mkdir three-toy && cd three-toy
echo "<!DOCTYPE html><html><body><h1>three-toy</h1></body></html>" > index.html
npm init -y
npm install three
```

###### Source Code

index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>three-toy</title>
  <style>
    body, html { margin: 0; padding: 0; overflow: hidden; }
  </style>
</head>
<body>
  <script type="module" src="main.js"></script>
</body>
</html>
```

main.js
```js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(1, 1);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

camera.position.z = 3;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Wireframe toggle on 'w' key
window.addEventListener('keydown', (e) => {
  if (e.key === 'w') {
    mesh.material.wireframe = !mesh.material.wireframe;
  }
});

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();
```

Development
	•	Start development server (with Vite):npm run dev
	•	For manual setup, serve index.html via a static server.

Production Build (optional)
If using Vite:
```sh
npm run build
npx serve dist
```

###### Deployment to GitHub Pages

Enable GitHub Actions in the three-toy repository. Create .github/workflows/deploy.

```yaml
name: Deploy static site to Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/checkout@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .  # or 'dist' if building
      - uses: actions/deploy-pages@v4
```

	•	Ensure Settings › Pages › Custom domain in this repo is blank.
	•	The hub repository ecorkran.github.io (custom domain projects.erikcorkran.
        com) will serve this project at /three-toy/.


###### Path Configuration

All asset paths in index.html must be relative:
```html
<script type="module" src="main.js"></script>
```

Relative paths ensure correct resolution under the /three-toy/ sub-path.

###### Troubleshooting
•	Missing environment: add environment: name: github-pages under the deploy job.
•	404 under /three-toy/: confirm hub repo is named ecorkran.github.io with
	custom domain projects.erikcorkran.com.
•	Blank canvas: verify main.js loads without 404 in the browser network
	inspector.

