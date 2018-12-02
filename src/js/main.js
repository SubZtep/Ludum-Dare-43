import "../scss/main.scss"
import { engine, scene } from "Engine/engine"
import { createCamera } from "Scene/camera"
import { createLight, shadowGenerator } from "Scene/light"
import { createEnvironment } from "Objects/environment"
import { createPlayer, player } from "Objects/player"
import CharacterController from "Classes/CharacterController"


function startGame () {
  // Create basic objects
  createCamera()
  createLight()
  createEnvironment()
  //createPlayer()

  //let cc = new CharacterController(player, scene)


  var _box = BABYLON.MeshBuilder.CreateBox("myBox", {height: 1, width: 2, depth: 0.5}, scene)
  _box.rotation.y = -0.9
  _box.position.z = -3
  _box.physicsImpostor = new BABYLON.PhysicsImpostor(_box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene)

  var _box2 = BABYLON.MeshBuilder.CreateBox("myBox", {height: 1, width: 2, depth: 0.5}, scene)
  _box2.rotation.y = 0.7
  _box2.position.z = 0
  _box2.physicsImpostor = new BABYLON.PhysicsImpostor(_box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene)



  var _sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", { diameter: 0.5 }, scene)
  _sphere.position = new BABYLON.Vector3(-2, .5, -3)

  _sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
    _sphere,
    BABYLON.PhysicsImpostor.SphereImpostor,
    { mass: 1, restitution: 0.9 },
    scene)

  _sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(4, 0, 0))


  /* var _light = new BABYLON.DirectionalLight("*dir00", new BABYLON.Vector3(0, -1, -1), scene);
  _light.position = new BABYLON.Vector3(0,10,10);

  _light.intensity = 0.7;
  let _shadowGenerator = new BABYLON.ShadowGenerator(1024, _light);

  //var _ground = BABYLON.Mesh.CreateGround("ground1", 30, 30, 2, scene);
  //_ground.receiveShadows = true;

  var _sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
  _shadowGenerator.getShadowMap().renderList.push(_sphere);
  _sphere.position.y = 1; */





  // Game loop
  engine.runRenderLoop(() => {
    scene.render()


    _sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(4, 0, 0))

    // Add some code here...
  })
}

// Wait for the engine
document
  .querySelector("canvas")
  .addEventListener("loaded", startGame, false)
