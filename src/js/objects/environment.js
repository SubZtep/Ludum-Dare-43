import { scene } from "Engine/engine"
import { gizmoMeshes } from "Engine/debug"

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

  gizmoMeshes.push(ground)
}

function createObtacles () {

  let box1 = BABYLON.MeshBuilder.CreateBox("box1", { height: 1, width: 2, depth: 0.5 }, scene)
  //box1.rotation.y = Math.PI / 5
  box1.rotationQuaternion = new BABYLON.Quaternion(0, 0.64, 0, 0.77)
  box1.position = new BABYLON.Vector3(-2.80, 0, 6.49)
  box1.scaling = new BABYLON.Vector3(2.82, 1, 1.20)
  box1.physicsImpostor = new BABYLON.PhysicsImpostor(box1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene)
  gizmoMeshes.push(box1)

  let box2 = BABYLON.MeshBuilder.CreateBox("box2", { height: 1, width: 2, depth: 0.5 }, scene)
  box2.rotationQuaternion = new BABYLON.Quaternion(0, -0.65, 0, 0.76)
  box2.position = new BABYLON.Vector3(0.84, 0, 6.91)
  box2.scaling = new BABYLON.Vector3(2.93, 1, 1.20)
  box2.physicsImpostor = new BABYLON.PhysicsImpostor(box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene)
  gizmoMeshes.push(box2)

  let box3 = BABYLON.MeshBuilder.CreateBox("box3", { height: 1, width: 2, depth: 0.5 }, scene)
  box3.rotationQuaternion = new BABYLON.Quaternion(0, -0.69, 0, 0.73)
  box3.position = new BABYLON.Vector3(2.92, 0, 6.34)
  box3.scaling = new BABYLON.Vector3(0.68, 0.5, 0.53)
  box3.physicsImpostor = new BABYLON.PhysicsImpostor(box3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene)
  gizmoMeshes.push(box3)
}



