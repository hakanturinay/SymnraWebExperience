import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { Vector3 } from 'three';
let isWeb = true
let minZoom = 2
let maxZoom = 4
let cameraPos = new THREE.Vector3(0, 1.75, -3.5)
let point0Pos = new THREE.Vector3(0, 0.85, 0.4)
let point1Pos = new THREE.Vector3(1.2, 0, -0.7)
let point2Pos = new THREE.Vector3(-1.1, 0.15, -0.4)
let point3Pos = new THREE.Vector3(-1.7, 0.8, 0.45)
let point4Pos = new THREE.Vector3(-0.5, 0.8,-0.2)
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  isWeb = false
  document.getElementById('qr-code-id').style.display = "none"
  minZoom = 4
  maxZoom = 8 
  cameraPos.x = 0.1162963826866886
  cameraPos.y = 2.3266749445489436
  cameraPos.z = -7.653303786847961
  point0Pos = new THREE.Vector3(0.1, 1, 0.5)
  point1Pos = new THREE.Vector3(1.35, 0, -0.7)
  point2Pos = new THREE.Vector3(-0.8, 0.2, -0.4)
  point3Pos = new THREE.Vector3(-1.7, 0.9, 0.45)
  point4Pos = new THREE.Vector3(-0.5, 0.85,-0.2)
  // cameraPos = Vector3(8.762859172227242e-16,3.5777087639996643,-7.155417527999327)
}else{
  isWeb = true
  minZoom = 2
  maxZoom = 4 

}
/**
 * Loaders
 */
const loadingBarElement = document.querySelector('.loading-bar')
// Texture loader
const textureLoader = new THREE.TextureLoader()

let sceneReady = false
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        // Wait a little
        window.setTimeout(() =>
        {
            // Animate overlay
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

            // Update loadingBarElement
            loadingBarElement.classList.add('ended')
             loadingBarElement.style.transform = ''
        }, 500)

        window.setTimeout(() =>
        {
            document.getElementById('logo').classList.add('fade-in')
            document.getElementById('nominated-logo').classList.add('fade-in')
            document.getElementById('bottom-buttons').classList.add('fade-in')
            sceneReady = true

        }, 2500)
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        // Calculate the progress and update the loadingBarElement
        const progressRatio = itemsLoaded / itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
)
const gltfLoader = new GLTFLoader(loadingManager)
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)

/**
 * Base
 */
// Debug
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms:
    {
        uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
 
            gl_FragColor = vec4(0.086, 0.086, 0.094, uAlpha);
        }
    `
})

const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            // child.material.envMap = environmentMap
            child.material.envMapIntensity = debugObject.envMapIntensity
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/3/px.jpg',
    '/textures/environmentMaps/3/nx.jpg',
    '/textures/environmentMaps/3/py.jpg',
    '/textures/environmentMaps/3/ny.jpg',
    '/textures/environmentMaps/3/pz.jpg',
    '/textures/environmentMaps/3/nz.jpg'
])

environmentMap.colorSpace = THREE.SRGBColorSpace
// environmentMap.mapping = THREE.EquirectangularReflectionMapping;
// scene.background = environmentMap
scene.environment = environmentMap

debugObject.envMapIntensity = 2

/**
 * Models
 */
var model
var mixer
/**
 * Textures
 */


 const glassMaterial = new THREE.MeshStandardMaterial({color:0x000000,transparent:true,opacity:0.3,
    side:THREE.DoubleSide})
    const bottleMaterial = new THREE.MeshStandardMaterial({color:0x3d3f42,transparent:true,opacity:0.35,
      side:THREE.DoubleSide})
    
var animations
const planeSize = 0.5;
const geometry = new THREE.PlaneGeometry(planeSize, planeSize);
var videoBriskSmokeSide = document.createElement('video')
videoBriskSmokeSide.src = "/videos/Coffee_Steam_Long_Version.mp4"
var videoTextureBriskSmokeSide = new THREE.VideoTexture(videoBriskSmokeSide)

videoBriskSmokeSide.setAttribute('preload', 'auto')

videoBriskSmokeSide.setAttribute('muted', 'true')
videoBriskSmokeSide.setAttribute('playsinline', '')
videoBriskSmokeSide.setAttribute('webkit-playsinline', '')
// videoBriskSmokeSide.setAttribute('loop', 'true')
// videoTextureBriskSmokeSide.minFilter = THREE.LinearFilter
// videoTextureBriskSmokeSide.magFilter = THREE.LinearFilter
// videoTextureBriskSmokeSide.format = THREE.RGBFormat
// videoTextureBriskSmokeSide.crossOrigin = 'anonymous'
// Step 3: Create a material for the plane
const smokeMaterial = new THREE.MeshBasicMaterial({ map: videoTextureBriskSmokeSide, side: THREE.DoubleSide });
// smokeMaterial.blending = THREE.AdditiveBlending
smokeMaterial.alphaMap = videoTextureBriskSmokeSide
smokeMaterial.transparent = true
smokeMaterial.opacity =0
// Step 4: Create a mesh using the geometry and material
const planeMesh = new THREE.Mesh(geometry, smokeMaterial);

// Step 5: Add the mesh to the scene
scene.add(planeMesh);

gltfLoader.load(
    '/models/ALLINONE_KITCHEN_V11.glb',
    (gltf) =>
    {
        model = gltf.scene;
        gltf.scene.scale.set(1.75, 1.75, 1.75)
        gltf.scene.position.y -=0.85
        gltf.scene.position.x +=0.15
        gltf.scene.rotation.y = Math.PI 
        var bottle = model.getObjectByName('Cylinder003');
        bottle.material = bottleMaterial
        bottle.renderOrder = -1;
        bottle.material.needsUpdate = true
        bottle.material.depthWrite = false
        planeMesh.position.copy( model.getObjectByName('Pan_Pivot').position );
        planeMesh.position.x -=0.65
        planeMesh.position.z -=0.38
        planeMesh.position.y +=0.05
        planeMesh.rotation.x = Math.PI/6
        planeMesh.renderOrder = -1;
        // planeMesh.position.z +=3
        /**
         * GLASS ICIN KULLANIRIZ
         */
        model.traverse((object) => {

          if (object.isMesh && object.material && object.material.name === 'Glass' ) {
            // console.log( object.material )
            object.position.y +=0.0005
            object.renderOrder = -1;
            object.material= glassMaterial
            // flatColorObject.material.side =THREE.DoubleSide
            object.material.needsUpdate = true;
          }

        })

        // Access the animations
        animations = gltf.animations;
        console.log(animations)
        // Create an animation mixer
        mixer = new THREE.AnimationMixer(model);
        scene.add(gltf.scene)
        updateAllMaterials()
    }
)
gltfLoader.load(
    '/models/last.glb',
    (gltf) =>
    {
  
        gltf.scene.scale.set(1.75, 1.75, 1.75)
        gltf.scene.position.y -=0.95
        gltf.scene.rotation.y = Math.PI
        console.log(gltf.scene.children[0].material)
        gltf.scene.children[0].material.receiveShadow = true
       
        scene.add(gltf.scene)
    
    }
)
//AXIS HELPER
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

/**
 * Points of interest
 */
 const raycaster = new THREE.Raycaster()
 const points = [
     {
         position: point0Pos,
         element: document.querySelector('.point-0')
     },
     {
         position: point1Pos,
         element: document.querySelector('.point-1')
     },
     {
         position: point2Pos,
         element: document.querySelector('.point-2')
     },
     {
         position: point3Pos,
         element: document.querySelector('.point-3')
     },
     {
      position: point4Pos,
      element: document.querySelector('.point-4')
  },
 ]

/**
 * Run Specific Animations
 */

 const animationFlags = [false, false, false, false, false, false];
 const reverseAnimationFlags = [false, false, false, false, false, false];
 const animationCompleted = [false, false, false, false, false, false];
 
 function runSpecificAnimation(animationName, index, pointIndex) {
   if (animationFlags[index] || reverseAnimationFlags[index] || animationCompleted[index]) {
     return;
   }
   animationFlags[index] = true;
 
   const clip = animations.find((clip) => clip.name === animationName);
   const action = mixer.clipAction(clip);
   action.reset();
   action.clampWhenFinished = true;
   action.timeScale = 1;
   action.setLoop(THREE.LoopOnce);
   points.forEach((point, i) => {
     if (i !== pointIndex) {
       point.element.style.display = 'none';
     }
   });
   action.play();
 
   const finishedListener = function (event) {
     if (event.action === action) {
       animationFlags[index] = false;
       animationCompleted[index] = true;
       mixer.removeEventListener('finished', finishedListener);
     }
   };
   document.getElementById('content').classList.add('fade-in')
   document.getElementById('content').classList.remove('fade-out')
   mixer.addEventListener('finished', finishedListener);
 }
 
 function reverseSpecificAnimation(animationName, index, pointIndex) {
   if (reverseAnimationFlags[index] || animationFlags[index] || !animationCompleted[index]) {
     return;
   }
   reverseAnimationFlags[index] = true;
 
   const clip = animations.find((clip) => clip.name === animationName);
   const action = mixer.clipAction(clip);
 
   if (action.time === 0) {
     action.time = action.getClip().duration;
   }
   action.paused = false;
   action.setLoop(THREE.LoopOnce);
   action.timeScale = -1;
   action.clampWhenFinished = true;
 
   action.play();
 
   const finishedListener = function (event) {
     if (event.action === action) {
       reverseAnimationFlags[index] = false;
       animationCompleted[index] = false;
       points.forEach((point) => {
         point.element.style.display = 'block';
       });
       mixer.removeEventListener('finished', finishedListener);
     }
   };
   document.getElementById('content').classList.remove('fade-in')
   document.getElementById('content').classList.add('fade-out')
   mixer.addEventListener('finished', finishedListener);
 }
 
 let counterDrawer = 0;
 let counterChair = 0;
 let counterPaddleBox = 0;
 let counterSideDrawer = 0;
 let counterSteakPan = 0;
 let counterAllAnimation = 0;
 
 function handleDrawerClick() {
   if (animationFlags.some((flag) => flag) || reverseAnimationFlags.some((flag) => flag)) {
     return;
   }
 
   if (counterDrawer === 0) {
     counterDrawer++;
     points[1].element.classList.add('clicked');
     runSpecificAnimation("MainBelow_Drawer.001", 0, 1);
     runSpecificAnimation("MainUpper_Drawer.001", 1, 1);
   } else {
     counterDrawer--;
     points[1].element.classList.remove('clicked');
     reverseSpecificAnimation("MainBelow_Drawer.001", 0, 1);
     reverseSpecificAnimation("MainUpper_Drawer.001", 1, 1);
   }
 }
 
 function handleChairClick() {
   if (animationFlags.some((flag) => flag) || reverseAnimationFlags.some((flag) => flag)) {
     return;
   }
 
   if (counterChair === 0) {
     counterChair++;
     points[2].element.classList.add('clicked');
     runSpecificAnimation("BarStool_01.001", 2, 2);
     runSpecificAnimation("BarStool_02.002", 3, 2);
   } else {
     counterChair--;
     points[2].element.classList.remove('clicked');
     reverseSpecificAnimation("BarStool_01.001", 2, 2);
     reverseSpecificAnimation("BarStool_02.002", 3, 2);
   }
 }
 
 function handlePaddleBoxClick() {
   if (animationFlags.some((flag) => flag) || reverseAnimationFlags.some((flag) => flag)) {
     return;
   }
 
   if (counterPaddleBox === 0) {
     counterPaddleBox++;
     points[0].element.classList.add('clicked');
    
     runSpecificAnimation("Davlumbaz.001", 4, 0);
   } else {
     counterPaddleBox--;
     points[0].element.classList.remove('clicked');
     reverseSpecificAnimation("Davlumbaz.001", 4, 0);
   }
 }
 
 function handleSideDrawerClick() {
   if (animationFlags.some((flag) => flag) || reverseAnimationFlags.some((flag) => flag)) {
     return;
   }
 
   if (counterSideDrawer === 0) {
     counterSideDrawer++;
     points[3].element.classList.add('clicked');
    
     runSpecificAnimation("SideDrawer", 5, 3);
   } else {
     counterSideDrawer--;
     points[3].element.classList.remove('clicked');
     reverseSpecificAnimation("SideDrawer", 5, 3);
   }
 }

 
 const steakAudio = document.getElementById('steakSound');

 function handleSteakPan() {
  if (animationFlags.some((flag) => flag) || reverseAnimationFlags.some((flag) => flag)) {
    return;
  }

  if (counterSteakPan === 0) {
    counterSteakPan++;
    steakAudio.play()
    points[4].element.classList.add('clicked');
    runSpecificAnimation("Pan_Animation", 6, 4);
    runSpecificAnimation("Steak_Animation", 7, 4);
    setTimeout(() => {
      smokeMaterial.opacity =0.35
      videoBriskSmokeSide.play()
      videoBriskSmokeSide.loop = true
    }, 750);

  } else {
    counterSteakPan--;
    steakAudio.pause();
    steakAudio.currentTime = 0;
    points[4].element.classList.remove('clicked');
    reverseSpecificAnimation("Pan_Animation", 6, 4);
    reverseSpecificAnimation("Steak_Animation", 7, 4);
    setTimeout(() => {
      smokeMaterial.opacity =0
      videoBriskSmokeSide.pause()
      // videoBriskSmokeSide.loop = true
    }, 500);
  }
}
 
 function handleRunAllAnimationClick() {
   if (animationFlags.some((flag) => flag) || reverseAnimationFlags.some((flag) => flag)) {
     return;
   }
   for(var i = 0; i<points.length; i++){
    points[i].element.classList.remove('clicked');
   }

   if (counterAllAnimation === 0) {
     counterAllAnimation++;
     runSpecificAnimation("MainBelow_Drawer.001", 0);
     runSpecificAnimation("MainUpper_Drawer.001", 1);
     runSpecificAnimation("BarStool_01.001", 2);
     runSpecificAnimation("BarStool_02.002", 3);
     runSpecificAnimation("Davlumbaz.001", 4);
     runSpecificAnimation("SideDrawer", 5);
     runSpecificAnimation("Pan_Animation", 6);
    runSpecificAnimation("Steak_Animation", 7);
    setTimeout(() => {
      smokeMaterial.opacity =0.35
      videoBriskSmokeSide.play()
      videoBriskSmokeSide.loop = true
    }, 750);

   } else {
     counterAllAnimation--;
     reverseSpecificAnimation("MainBelow_Drawer.001", 0);
     reverseSpecificAnimation("MainUpper_Drawer.001", 1);
     reverseSpecificAnimation("BarStool_01.001", 2);
     reverseSpecificAnimation("BarStool_02.002", 3);
     reverseSpecificAnimation("Davlumbaz.001", 4);
     reverseSpecificAnimation("SideDrawer", 5);
     reverseSpecificAnimation("Pan_Animation", 6);
     reverseSpecificAnimation("Steak_Animation", 7);
     setTimeout(() => {
      smokeMaterial.opacity =0
      videoBriskSmokeSide.reset()
      // videoBriskSmokeSide.loop = true
    }, 500);
   }
 }
 
 document.getElementById("scene-drawer").addEventListener("click", handleDrawerClick);
 document.getElementById("scene-chair").addEventListener("click", handleChairClick);
 document.getElementById("scene-paddleBox").addEventListener("click", handlePaddleBoxClick);
 document.getElementById("scene-sideDrawer").addEventListener("click", handleSideDrawerClick);
 document.getElementById("run-all-animation").addEventListener("click", handleRunAllAnimationClick);
 document.getElementById("scene-Steak&Pan").addEventListener("click", handleSteakPan);
const qrButton = document.getElementById('qr-button-id');
const qrCodeElement = document.getElementById('qr-code-id');
let qrButtonHandler = 0;

qrButton.addEventListener('click', function() {
  if(!isWeb){

    const otherWebsiteURL = 'https://hakanqreal.github.io/SymnraAR/';
  
    // Open the other website in a new tab/window
    window.open(otherWebsiteURL, '_blank');
    return
  }
  qrButtonHandler = (qrButtonHandler + 1) % 2;

  qrCodeElement.classList.toggle('fade-in', qrButtonHandler === 1);
  qrCodeElement.classList.toggle('fade-out', qrButtonHandler !== 1);
});

 const volumeButton = document.getElementById('volumeButton');
 const volumeSpan = document.getElementById('volume-span');
 const audioEmbed = document.getElementById('audioEmbed');
 
 let currentIcon = 'volume_up';


 volumeButton.addEventListener('click', function() {
   if (currentIcon === 'volume_up') {
    volumeSpan.textContent = 'volume_off';
    currentIcon = 'volume_off';
    audioEmbed.pause()
   } else {
    volumeSpan.textContent = 'volume_up';
    currentIcon = 'volume_up';
    audioEmbed.play() 
   }
 });
 
 /**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(2048 , 2048)
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 2, -0.25)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 100)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
camera.position.set( cameraPos.x,
  cameraPos.y ,cameraPos.z)
scene.add(camera)
// const helper = new THREE.CameraHelper( camera );
// scene.add( helper );
// Controls
const controls = new OrbitControls(camera, canvas)

controls.maxPolarAngle = Math.PI/2;
controls.maxAzimuthAngle = Math.PI *1.35;  
controls.minAzimuthAngle = Math.PI /1.5
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.zoomSpeed = 0.75; // Decrease the zoom speed for smoother zooming
controls.enableRotate = true;
controls.rotateSpeed = 0.5; // Decrease the rotation speed for smoother rotation

controls.minDistance = minZoom; // Set the minimum distance to zoom in
controls.maxDistance = maxZoom; // Set the maximum distance to zoom out


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})

renderer.useLegacyLights = false
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.setClearColor(0x161618, 1 );
renderer.outputEncoding = THREE.sRGBEncoding

/**
 * Animate
 */
 const clock = new THREE.Clock();
const tick = () =>
{

    // Update controls
    controls.update()
    // requestAnimationFrame(animate);

    // // Update the animation mixer
    if (mixer) {
        const delta = clock.getDelta(); // delta is the time between frames
        mixer.update(delta);
      }

    // Update points only when the scene is ready
    if(sceneReady)
    {
      // var meatPos = model.getObjectByName('Pan_Pivot').position
      // planeMesh.position.copy( meatPos.x-0.65,meatPos.y,meatPos.z-0.5  );
        // Go through each point
        for(const point of points)
        {
            // Get 2D screen position
            const screenPosition = point.position.clone()
            screenPosition.project(camera)
    
            // Set the raycaster
            raycaster.setFromCamera(screenPosition, camera)
            const intersects = raycaster.intersectObjects(scene.children, true)
 
            // No intersect found
            if(intersects.length === 0)
            {
                // Show
                point.element.classList.add('visible')
            }

            // Intersect found
            else
            {
                // Get the distance of the intersection and the distance of the point
                const intersectionDistance = intersects[0].distance
                const pointDistance = point.position.distanceTo(camera.position)
                // Intersection is close than the point
                if(intersectionDistance < pointDistance-0.5)
                {
                    // Hide
                    point.element.classList.remove('visible')
                }
                // Intersection is further than the point
                else
                {
                    // Show
                    point.element.classList.add('visible')
                }
            }
    
            const translateX = screenPosition.x * sizes.width * 0.5
            const translateY = - screenPosition.y * sizes.height * 0.5
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
