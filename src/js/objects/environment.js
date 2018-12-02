import { scene } from "Engine/engine"

export let ground = null

export function createEnvironment () {

  let groundMaterial = new BABYLON.StandardMaterial('groundmat', scene);
  groundMaterial.diffuseColor = new BABYLON.Color3(0.82, 0.89, 0.95)
  //groundMaterial.diffuseColor = BABYLON.Color3.Green()
  //groundMaterial.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1)
  //groundMaterial.alpha = 0.5

  ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene)
  ground.material = groundMaterial

  ground.receiveShadows = true


  ground.physicsImpostor = new BABYLON.PhysicsImpostor(
    ground,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0.9 },
    scene)

}
