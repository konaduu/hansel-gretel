import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { Timer } from 'three/addons/misc/Timer.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js'
import {Sky} from 'three/addons/objects/Sky.js'
// Debug
const gui = new GUI()

/** Creating a Canvas */
const canvas = document.querySelector('canvas.webgl')

/** rendering a Scene */
const scene = new THREE.Scene()

/** changing a background colour  */ 
    // scene.background = new THREE.Color( '#0F8F9B' );

/** Texture */

const textureLoader = new THREE.TextureLoader()

// Floor
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/brown_mud_leaves_01_1k/brown_mud_leaves_01_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./floor/brown_mud_leaves_01_1k/brown_mud_leaves_01_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/brown_mud_leaves_01_1k/brown_mud_leaves_01_disp_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/brown_mud_leaves_01_1k/brown_mud_leaves_01_disp_1k.jpg')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8,8)
floorARMTexture.repeat.set(8,8)
floorNormalTexture.repeat.set(8,8)
floorDisplacementTexture.repeat.set(8,8)


floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping



// wall texture
const wallColorTexture = textureLoader.load('./wall/red_plaster_weathered_1k/red_plaster_weathered_diff_1k.jpg')
const wallARMTexture = textureLoader.load('./wall/red_plaster_weathered_1k/red_plaster_weathered_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('./wall/red_plaster_weathered_1k/red_plaster_weathered_nor_gl_1k.jpg')
const wallDisplacementTexture = textureLoader.load('./wall/gravel_road_1k/gravel_road_disp_1k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace


// roof
const roofColorTexture = textureLoader.load('./roof/grey_roof_01_1k/grey_roof_01_diff_1k.jpg')
const roofARMTexture = textureLoader.load('./roof/grey_roof_01_1k/grey_roof_01_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('./roof/grey_roof_01_1k/grey_roof_01_nor_gl_1k.jpg')
const roofDisplacementTexture = textureLoader.load('./roof/grey_roof_01_1k/grey_roof_01_disp_1k.jpg')


// const roofColorTexture = textureLoader.load('./roof/square_concrete_pavers_1k/square_concrete_pavers_diff_1k.jpg')
// const roofARMTexture = textureLoader.load('./roof/square_concrete_pavers_1k/square_concrete_pavers_arm_1k.jpg')
// const roofNormalTexture = textureLoader.load('./roof/square_concrete_pavers_1k/square_concrete_pavers_nor_gl_1k.jpg')
// const roofDisplacementTexture = textureLoader.load('./roof/square_concrete_pavers_1k/square_concrete_pavers_disp_1k.jpg')

roofColorTexture.colorSpace = THREE.SRGBColorSpace


roofColorTexture.repeat.set(3,1)
roofARMTexture.repeat.set(3,1)
roofNormalTexture.repeat.set(3,1)
roofDisplacementTexture.repeat.set(3,1)


roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping
roofDisplacementTexture.wrapS = THREE.RepeatWrapping



roofColorTexture.wrapT = THREE.RepeatWrapping
roofARMTexture.wrapT = THREE.RepeatWrapping
roofNormalTexture.wrapT = THREE.RepeatWrapping
roofDisplacementTexture.wrapT = THREE.RepeatWrapping

// door
const doorColorTexture = textureLoader.load('./door/wooden_garage_door_1k/wooden_garage_door_diff_1k.jpg')
// const doorAlphaTexture = textureLoader.load('./door/wooden_garage_door_1k/door_alpha.jpg')
const doorARMTexture = textureLoader.load('./door/wooden_garage_door_1k/wooden_garage_door_arm_1k.jpg')
const doorNormalTexture = textureLoader.load('./door/wooden_garage_door_1k/wooden_garage_door_nor_gl_1k.jpg')
const doorDisplacementTexture = textureLoader.load('./door/wooden_garage_door_1k/wooden_garage_door_disp_1k.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace


// candy
const candyColorTexture = textureLoader.load('./candy/Candy_001/Candy_001_basecolor.jpg')
const candyARMTexture = textureLoader.load('./candy/Candy_001/Candy_001_ambientOcclusion.jpg')
const candyNormalTexture = textureLoader.load('./candy/Candy_001/Candy_001_normal.jpg')
const candyRoughnessTexture = textureLoader.load('./candy/Candy_001/Candy_001_roughness.jpg')

candyColorTexture.colorSpace = THREE.SRGBColorSpace


/** Creating a Group in a house container */
const houseGroup = new THREE.Group()
scene.add(houseGroup)

/** Walls */ 
const walls = new THREE.Group(

)
const wallMaterial = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    map:wallColorTexture,
    aoMap:wallARMTexture,
    roughnessMap:wallARMTexture,
    metalnessMap:wallARMTexture,
    normalMap:wallNormalTexture,

})

const wallOne = new THREE.Mesh(
    new THREE.CircleGeometry(2, 5),
    wallMaterial
)

const wallTwo = new THREE.Mesh(
    new THREE.CircleGeometry(2, 5),
    wallMaterial
)

wallTwo.position.z = -3

const wallThree = new THREE.Mesh(
    new THREE.PlaneGeometry(2.3, 3 ),
    wallMaterial
)
wallThree.position.z = -1.47 
wallThree.position.x = 1.33
wallThree.position.y = -0.94
wallThree.rotation.x = Math.PI / 180 * 90;
wallThree.rotation.y = Math.PI / 180 * 54.42;

const wallFour = new THREE.Mesh(
    new THREE.PlaneGeometry( 2.3, 3 ),
    wallMaterial
)
wallFour.position.z = -1.47 
wallFour.position.x = -1.62
wallFour.position.y = 0
wallFour.rotation.x = Math.PI / 180 * -90;
wallFour.rotation.y = Math.PI / 180 * 90.5; 

walls.add(wallOne,wallTwo,wallThree,wallFour)
walls.position.y = 1.52,
walls.rotation.z =0.31

gui
    .add(wallThree.position, 'x')
    .min(-3)
    .max(2.5)
    .step(0.01)
    .name('wall-debug')
houseGroup.add(walls)

/** Creating a roof */
const roofs = new THREE.Group(

)

const roofMaterial = new THREE.MeshStandardMaterial({ 
    side: THREE.DoubleSide,
    map:roofColorTexture,
    aoMap:roofARMTexture,
    roughnessMap:roofARMTexture,
    metalnessMap:roofARMTexture,
    normalMap:roofNormalTexture,
    displacementScale:0.3,
    displacementBias:-0.2,

  
})
const roofOne = new THREE.Mesh(
    new THREE.PlaneGeometry( 2.43, 3.07,100,100 ),
    roofMaterial
)
roofOne.position.x = 1
roofOne.position.y = 2.8
roofOne.position.z = -1.49

roofOne.rotation.x = Math.PI / 180 * 90;
// roofOne.rotation.y = 0.63
roofOne.rotation.y = 2.51


const roofTwo = new THREE.Mesh(
    new THREE.PlaneGeometry( 2.41, 3.07, 100,100 ),
    roofMaterial
)
roofTwo.position.x = -0.96
roofTwo.position.y = 2.83
roofTwo.position.z = -1.49
roofTwo.rotation.x = Math.PI / 180 * 90;
roofTwo.rotation.y = 0.63



roofs.add(roofOne,roofTwo)
// roofs.rotation.y = 1.62

gui.add(roofOne.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
gui.add(roofOne.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementScale')
gui
    .add(roofOne.position, 'x')
    .min(-3)
    .max(4.5)
    .step(0.01)
    .name('position-x')

    gui
    .add(roofOne.position, 'y')
    .min(-3)
    .max(4.5)
    .step(0.01)
    .name('position-y')

    gui
    .add(roofOne.position, 'z')
    .min(-3)
    .max(4.5)
    .step(0.01)
    .name('position-z')

    gui
    .add(roofOne.rotation, 'y')
    .min(-3)
    .max(4.5)
    .step(0.01)
    .name('rotation-y')


houseGroup.add(roofs)


/** creating a door  */
const door = new THREE.Mesh(
    new RoundedBoxGeometry( 1, 1.4, 0.2, 3, 3 ),
    new THREE.MeshStandardMaterial({
        map:doorColorTexture,
        aoMap:doorARMTexture,
        roughnessMap:doorARMTexture,
        metalnessMap:doorARMTexture,
        normalMap:doorNormalTexture,
     })
)
door.position.y = 0.6

houseGroup.add(door);



/** candy right */
const candyRight = new THREE.Group()

const candyCaneOne = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.02, 0.02, 0.8, 32 ),
    new THREE.MeshStandardMaterial()
)
candyCaneOne.position.x = 1.7
candyCaneOne.position.y = 0.2
candyCaneOne.position.z = 0.2
candyCaneOne.rotation.z = -19

const candyCircleOne = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.29, 0.29, 0.06, 32),
    new THREE.MeshStandardMaterial({color: 0xee486b , side: THREE.DoubleSide})
)
candyCircleOne.position.x = 1.74
candyCircleOne.position.y = 0.5
candyCircleOne.position.z = 0.2
candyCircleOne.rotation.x = Math.PI / 180 * 90;


const candyCaneTwo = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.02, 0.02, 0.8, 32 ),
    new THREE.MeshStandardMaterial()
)
candyCaneTwo.position.x = 1.54
candyCaneTwo.position.y = 0.2
candyCaneTwo.position.z = 0.3
candyCaneTwo.rotation.z = 0.1

const candyCircleTwo = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.2, 0.2, 0.06, 32 ),
    new THREE.MeshStandardMaterial({color: 0x2fc763 , side: THREE.DoubleSide})
)
candyCircleTwo.position.x = 1.49
candyCircleTwo.position.y = 0.5
candyCircleTwo.position.z = 0.3
candyCircleTwo.rotation.x = Math.PI / 180 * 90;


candyRight.add(candyCaneOne,candyCircleOne,candyCaneTwo,candyCircleTwo)

/**candy left  */
const candyLeft = new THREE.Group()

const candyCanecandyLeftOne = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.02, 0.02, 0.8, 32 ),
    new THREE.MeshStandardMaterial()
)
candyCanecandyLeftOne.position.x = -1.7
candyCanecandyLeftOne.position.y = 0.2
candyCanecandyLeftOne.position.z = 0.3
candyCanecandyLeftOne.rotation.z = 19.36

const candyCircleLeftOne = new THREE.Mesh(
    // new THREE.CylinderGeometry( 0.2, 0.2, 0.06, 32 ),
    new THREE.SphereGeometry( 0.199, 32, 16 ),
    new THREE.MeshStandardMaterial({   
        map:candyColorTexture,
        aoMap:candyARMTexture ,
        roughnessMap:candyRoughnessTexture,
        normalMap:candyNormalTexture, 
        side: THREE.DoubleSide})
)
candyCircleLeftOne.position.x = -1.83
candyCircleLeftOne.position.y = 0.5
candyCircleLeftOne.position.z = 0.3
candyCircleLeftOne.rotation.x = Math.PI / 180 * 90;


const candyCaneLeftTwo = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.02, 0.02, 0.8, 32 ),
    new THREE.MeshStandardMaterial()
)
candyCaneLeftTwo.position.x = -1.54
candyCaneLeftTwo.position.y = 0.2
candyCaneLeftTwo.position.z = 0.2
candyCaneLeftTwo.rotation.z = 3

const candyCircleLeftTwo = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.29, 0.29, 0.06, 32 ),
    new THREE.MeshStandardMaterial({color: 0x1b43d5 , side: THREE.DoubleSide})
)
candyCircleLeftTwo.position.x = -1.49
candyCircleLeftTwo.position.y = 0.7
candyCircleLeftTwo.position.z = 0.2
candyCircleLeftTwo.rotation.x = Math.PI / 180 * 90;


candyLeft.add(candyCanecandyLeftOne,candyCircleLeftOne,candyCaneLeftTwo,candyCircleLeftTwo)

houseGroup.add(candyRight,candyLeft)




/** Creating a circle window */
const circleWindow = new THREE.Mesh(
    new THREE.CircleGeometry( 0.3, 20),
    new THREE.MeshStandardMaterial({
        // color:0xfdc358
        color:0x3b281d
     })
)

circleWindow.position.y = 2.6
circleWindow.position.z = 0.1
houseGroup.add(circleWindow)


/** Marble stones */
// Half a sphere
const phiStart = 0;
const phiEnd = Math.PI * 2;
const thetaStart = 0;
const thetaEnd = Math.PI / 2;


const marbleStoneGeometry = new THREE.SphereGeometry(0.19, 20, 8, phiStart, phiEnd, thetaStart, thetaEnd);

const marbleStones = new THREE.Group();
scene.add(marbleStones);

for (let i = 0; i < 50; i++) {
    // angle is the function to randomly assign the grave around the house but not inside or close to the house 
    const angle = Math.random() * Math.PI * 2;
    // make the circle bigger 
    const radius = 3 + Math.random() * 4;
    
    // to aid in forming a constant circle position in loop
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    
    // Generate a random color
    const color = new THREE.Color(Math.random(), Math.random(), Math.random());
    
    // Create a new material with the random color
    const marbleStoneMaterial = new THREE.MeshStandardMaterial({ color: color, side: THREE.DoubleSide });
    
    // Mesh
    const marbleStone = new THREE.Mesh(marbleStoneGeometry, marbleStoneMaterial);
    marbleStone.position.z = 0.5;
    marbleStone.position.y = -0.14;
    marbleStone.position.x = x;
    marbleStone.position.z = z;
    // marbleStone.rotation.x = (Math.random() - 0.5) * 0.4;
    marbleStone.rotation.y = (Math.random() - 0.5) * 0.4;
    marbleStone.rotation.z = (Math.random() - 0.5) * 0.4;
    
    marbleStones.add(marbleStone);
}




/** Creating a floor */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        alphaMap:floorAlphaTexture,
        transparent: true,
        map:floorColorTexture,
        aoMap:floorARMTexture,
        roughnessMap:floorARMTexture,
        metalnessMap:floorARMTexture,
        normalMap:floorNormalTexture,
        displacementMap:floorDisplacementTexture,
        displacementScale:0.3,
        displacementBias:-0.2,
    })
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/** Creating Lights */

// Ambient light
const ambientLight = new THREE.AmbientLight('#FFFFE8', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#FFFFE8', 0.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// door light
const doorLight = new THREE.PointLight('#ff7d46', 3)
houseGroup.add(doorLight)
doorLight.position.set(-0.02, 2.56, 0.54)

/**Ghosts */
const ghost1 = new THREE.PointLight('#8800ff', 3)
const ghost2 = new THREE.PointLight('#ff0088', 3)
const ghost3 = new THREE.PointLight('#ff0000', 3)
scene.add(ghost1, ghost2, ghost3)


/** Defining scene size  */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // update sizes
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight


    // update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()


    // update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**Shadows */
// rendere
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap


// cast and receive shadows
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
walls.castShadow = true 
walls.receiveShadowShadow = true 
roofs.castShadow = true
floor.receiveShadow = true

for(const CandyLeftGroup of candyLeft.children){
    CandyLeftGroup.castShadow = true
    CandyLeftGroup.receiveShadow = true
};

for(const CandyRightGroup of candyRight.children){
    CandyRightGroup.castShadow = true
    CandyRightGroup.receiveShadow = true
};

// mappings
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.far = 20
directionalLight.shadow.camera.near = 1

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

/** SKy */

const sky = new Sky()
sky.scale.setScalar( 450000 );
scene.add(sky)

sky.material.uniforms['turbidity'].value = 20
sky.material.uniforms['rayleigh'].value = 0.558
sky.material.uniforms['mieCoefficient'].value = 0.009
sky.material.uniforms['mieDirectionalG'].value = 0.999998
sky.material.uniforms['sunPosition'].value.set(15, 180, 0.5)

scene.fog = new THREE.FogExp2('#d1efff', 0.1)


/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()


    // Ghost
    const ghostOneAngle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghostOneAngle) * 4
    ghost1.position.z = Math.sin(ghostOneAngle) * 4
    ghost1.position.y = Math.sin(ghostOneAngle) * Math.sin(ghostOneAngle * 2.34) * Math.sin(ghostOneAngle * 3.45)

    const ghostTwoAngle = - elapsedTime * 0.38
    ghost2.position.x = Math.cos(ghostTwoAngle) * 5
    ghost2.position.z = Math.sin(ghostTwoAngle) * 5
    ghost2.position.y = Math.sin(ghostTwoAngle) * Math.sin(ghostTwoAngle * 2.34) * Math.sin(ghostTwoAngle * 3.45)


    const ghostThreeAngle = elapsedTime * 0.23
    ghost3.position.x = Math.cos(ghostThreeAngle) * 6
    ghost3.position.z = Math.sin(ghostThreeAngle) * 6
    ghost3.position.y = Math.sin(ghostThreeAngle) * Math.sin(ghostThreeAngle * 2.34) * Math.sin(ghostThreeAngle * 3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()