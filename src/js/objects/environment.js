import { scene } from "Engine/engine"

export let ground = null

export function createEnvironment () {
  createGround()
  createObtacles()
}

function createGround () {
  let groundMaterial = new BABYLON.StandardMaterial('groundmat', scene)
  groundMaterial.diffuseColor = new BABYLON.Color3(0.82, 0.89, 0.95)
  //groundMaterial.diffuseColor = BABYLON.Color3.Green()
  //groundMaterial.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1)
  //groundMaterial.alpha = 0.5

  /* let groundTexture = new BABYLON.Texture("../assets/wood.png", scene)
  groundTexture.uScale = 5
  groundTexture.vScale = 5
  groundMaterial.diffuseTexture = groundTexture
  groundMaterial.bumpTexture = new BABYLON.Texture("../assets/wood-normal-map.png", scene) */

  ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 12 }, scene)
  ground.material = groundMaterial

  ground.position = new BABYLON.Vector3(0, 0, 4)

  ground.receiveShadows = true

  ground.physicsImpostor = new BABYLON.PhysicsImpostor(
    ground,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0.9 },
    scene)
}

function createObtacles () {

  /* var _box = BABYLON.MeshBuilder.CreateBox("myBox", {height: 1, width: 2, depth: 0.5}, scene)
  _box.rotation.y = -0.9
  _box.position.z = -3
  _box.physicsImpostor = new BABYLON.PhysicsImpostor(_box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene)

  var _box2 = BABYLON.MeshBuilder.CreateBox("myBox", {height: 1, width: 2, depth: 0.5}, scene)
  _box2.rotation.y = 0.7
  _box2.position.z = 0
  _box2.physicsImpostor = new BABYLON.PhysicsImpostor(_box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene) */

  let box1 = BABYLON.MeshBuilder.CreateBox("box1", { height: 1, width: 2, depth: 0.5 }, scene)
  box1.rotation.y = Math.PI / 5
  box1.position = new BABYLON.Vector3(-1, 0, 5)
  box1.physicsImpostor = new BABYLON.PhysicsImpostor(box1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene)

  let box2 = BABYLON.MeshBuilder.CreateBox("box2", { height: 1, width: 2, depth: 0.5 }, scene)
  box2.rotation.y = -Math.PI / 5
  box2.position = new BABYLON.Vector3(1.5, 0, 6)
  box2.physicsImpostor = new BABYLON.PhysicsImpostor(box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene)
}
