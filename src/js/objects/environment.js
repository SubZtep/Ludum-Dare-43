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

  ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 28 }, scene)
  ground.material = groundMaterial
  ground.position = new BABYLON.Vector3(0.5, 0, 12.28)
  ground.receiveShadows = true

  ground.physicsImpostor = new BABYLON.PhysicsImpostor(
    ground,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0 },
    scene)

  gizmoMeshes.push(ground)

  // Create fence
  let fence1 = BABYLON.MeshBuilder.CreateBox("Fence", { width: ground._width, height: 0.1, depth: 0.1 }, scene)
  fence1.position = new BABYLON.Vector3(0.5, 0, (ground.position.z + ground._height / 2 + 0.5))
  let fence2 = BABYLON.MeshBuilder.CreateBox("Fence", { width: 0.1, height: 0.1, depth: ground._height }, scene)
  fence2.position = new BABYLON.Vector3(ground._width / 2 + 1, 0, ground._height / 2 - 1.6)
  let fence3 = BABYLON.MeshBuilder.CreateBox("Fence", { width: ground._width, height: 0.1, depth: 0.1 }, scene)
  fence3.position = new BABYLON.Vector3(0.5, 0, (ground.position.z - ground._height / 2 - 0.5))
  let fence4 = BABYLON.MeshBuilder.CreateBox("Fence", { width: 0.1, height: 0.1, depth: ground._height }, scene)
  fence4.position = new BABYLON.Vector3(-ground._width / 2, 0, ground._height / 2 - 1.6)
  gizmoMeshes.push(fence1, fence2, fence3, fence4)
}

function createObtacles () {

  let boxes = [
    {
      rotationQuaternion: new BABYLON.Quaternion(0, 0.64, 0, 0.77),
      position: new BABYLON.Vector3(-2.80, 0, 6.49),
      scaling: new BABYLON.Vector3(2.82, 1, 1.20)
    }, {
      rotationQuaternion: new BABYLON.Quaternion(0, -0.65, 0, 0.76),
      position: new BABYLON.Vector3(0.84, 0, 6.91),
      scaling: new BABYLON.Vector3(2.93, 1, 1.20)
    }, {
      rotationQuaternion: new BABYLON.Quaternion(0, -0.69, 0, 0.73),
      position: new BABYLON.Vector3(2.92, 0, 6.34),
      scaling: new BABYLON.Vector3(0.68, 0.5, 0.53)
    }
  ]

  for (let i = 0; i < 3; i++) {
    boxes.forEach(box => {
      let box1 = BABYLON.MeshBuilder.CreateBox("box1", { height: 1, width: 2, depth: 0.5 }, scene)
      box1.rotationQuaternion = box.rotationQuaternion
      box1.position = box.position.clone()
      box1.position.x += i * 1
      box1.position.z += i * 8
      box1.scaling = box.scaling
      box1.physicsImpostor = new BABYLON.PhysicsImpostor(box1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene)
      gizmoMeshes.push(box1)
    })
  }

}



