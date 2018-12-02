import { scene } from "Engine/engine"
import 'babylonjs-inspector'

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

  let box1 = BABYLON.MeshBuilder.CreateBox("box1", { height: 1, width: 2, depth: 0.5 }, scene)
  box1.rotation.y = Math.PI / 5
  box1.position = new BABYLON.Vector3(-1, 0, 5)
  box1.physicsImpostor = new BABYLON.PhysicsImpostor(box1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene)

  let box2 = BABYLON.MeshBuilder.CreateBox("box2", { height: 1, width: 2, depth: 0.5 }, scene)
  box2.rotation.y = -Math.PI / 5
  box2.position = new BABYLON.Vector3(1.5, 0, 6)
  box2.physicsImpostor = new BABYLON.PhysicsImpostor(box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene)

  if (!PRODUCTION) {
    createGizmoManager([box1, box2])
  }
}


function createGizmoManager (meshes) {

  scene.debugLayer.show()

  let gizmoManager = new BABYLON.GizmoManager(scene)
  gizmoManager.boundingBoxGizmoEnabled = true
  gizmoManager.attachableMeshes = meshes

  document.onkeydown =  e => {
    if (e.key == 'w') {
        gizmoManager.positionGizmoEnabled = !gizmoManager.positionGizmoEnabled
    }
    if (e.key == 'e') {
        gizmoManager.rotationGizmoEnabled = !gizmoManager.rotationGizmoEnabled
    }
    if (e.key == 'r') {
        gizmoManager.scaleGizmoEnabled = !gizmoManager.scaleGizmoEnabled
    }
    if (e.key == 'q') {
        gizmoManager.boundingBoxGizmoEnabled = !gizmoManager.boundingBoxGizmoEnabled
    }
  }
}
