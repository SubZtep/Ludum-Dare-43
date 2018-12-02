import { scene } from "Engine/engine"
import { gizmoMeshes } from "Engine/debug"

const times = x => f => {
  if (x > 0) {
    f()
    times (x - 1) (f)
  }
}


export let ground = null

export function createEnvironment () {
  createGround()
  //createObtacles()
  createFinishLines()
  createBizbaszs()
}

function createGround () {
  let groundMaterial = new BABYLON.StandardMaterial('groundmat', scene)
  groundMaterial.diffuseColor = new BABYLON.Color3(0.62, 0.69, 0.75)
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
    { mass: 0, restitution: 0.3 },
    scene)

  //gizmoMeshes.push(ground)

  // Create fence
  let height = 1

  let fenceMat = new BABYLON.StandardMaterial('groundmat', scene)
  fenceMat.diffuseColor = BABYLON.Color3.Blue()

  let fence1 = BABYLON.MeshBuilder.CreateBox("Fence", { width: ground._width, height, depth: 0.1 }, scene)
  fence1.material = fenceMat
  fence1.position = new BABYLON.Vector3(0.5, 0, (ground.position.z + ground._height / 2))

  let fence2 = BABYLON.MeshBuilder.CreateBox("Fence", { width: 0.1, height, depth: ground._height }, scene)
  fence2.material = fenceMat
  fence2.position = new BABYLON.Vector3(ground._width / 2 + 0.5, 0, ground._height / 2 - 1.6)
  fence2.physicsImpostor = new BABYLON.PhysicsImpostor(fence2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene)

  let fence3 = BABYLON.MeshBuilder.CreateBox("Fence", { width: ground._width, height, depth: 0.1 }, scene)
  fence3.material = fenceMat
  fence3.position = new BABYLON.Vector3(0.5, 0, (ground.position.z - ground._height / 2))

  let fence4 = BABYLON.MeshBuilder.CreateBox("Fence", { width: 0.1, height, depth: ground._height }, scene)
  fence4.material = fenceMat
  fence4.position = new BABYLON.Vector3(-ground._width / 2 + 0.5, 0, ground._height / 2 - 1.6)
  fence4.physicsImpostor = new BABYLON.PhysicsImpostor(fence4, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene)

  //gizmoMeshes.push(fence1, fence2, fence3, fence4)
}

function createFinishLines () {

  let boxMaterial = new BABYLON.StandardMaterial("BoxMat", scene)
  boxMaterial.diffuseTexture = new BABYLON.Texture("assets/textures/wood.png", scene)
  boxMaterial.bumpTexture = new BABYLON.Texture("assets/textures/wood-normal-map.png", scene)
  boxMaterial.specularColor = BABYLON.Color3.Black()
  boxMaterial.emissiveColor = BABYLON.Color3.Black()
  boxMaterial.ambientColor = BABYLON.Color3.Black()

  for (let i = 0; i < 5; i++) {
    let box1 = BABYLON.MeshBuilder.CreateBox("box1", { height: 0.3, width: 0.3, depth: 5 }, scene)
    box1.material = boxMaterial

    box1.position = new BABYLON.Vector3(i * 2.2 - 3.9, 0, 5)

    /* box1.rotationQuaternion = box.rotationQuaternion
    box1.position = box.position.clone()
    box1.position.x += i * 1
    box1.position.z += i * 8 */
    //box1.scaling = box.scaling
    box1.physicsImpostor = new BABYLON.PhysicsImpostor(box1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene)
    //gizmoMeshes.push(box1)
  }
}

function createBizbaszs () {
  // x: -3.5 <-> 4.5
  // z: 10 <-> 25
  const minX = -3.5
  const maxX = 4.5
  const minZ = 10.0
  const maxZ = 25.0


  times (10) (() => {
    let x = (Math.random() * (maxX - minX) + minX).toFixed(4)
    let z = (Math.random() * (maxZ - minZ) + minZ).toFixed(4)
    let height = (Math.random() * (2 - 0.5) + 0.5).toFixed(4)
    let diameter = (Math.random() * (2 - 0.5) + 0.5).toFixed(4)

    let mat = new BABYLON.StandardMaterial("BizMat", scene)
    mat.diffuseColor = BABYLON.Color3.Random()

    let obj1 = BABYLON.MeshBuilder.CreateCylinder("cil1", { height, diameter }, scene)
    obj1.material = mat
    obj1.position = new BABYLON.Vector3(x, 0, z)
    obj1.physicsImpostor = new BABYLON.PhysicsImpostor(obj1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5 }, scene)
  })

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

  // Create material
  let boxTexture = new BABYLON.Texture("assets/textures/wood.png", scene)
  //boxTexture.uScale = 5
  //boxTexture.vScale = 5

  let boxMaterial = new BABYLON.StandardMaterial("BoxMat", scene)
  boxMaterial.diffuseTexture = boxTexture
  boxMaterial.bumpTexture = new BABYLON.Texture("assets/textures/wood-normal-map.png", scene)
  boxMaterial.specularColor = BABYLON.Color3.Black()
  boxMaterial.emissiveColor = BABYLON.Color3.Black()
  boxMaterial.ambientColor = BABYLON.Color3.Black()

  for (let i = 0; i < 3; i++) {
    boxes.forEach(box => {
      let box1 = BABYLON.MeshBuilder.CreateBox("box1", { height: 1, width: 2, depth: 0.5 }, scene)
      box1.material = boxMaterial
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
