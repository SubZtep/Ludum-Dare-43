import { scene } from "Engine/engine"
import { shadowGenerator } from "Scene/light"
import { camera } from "Scene/camera"

export let player = null

export function createPlayer () {

  let playerMaterial = new BABYLON.StandardMaterial('playermat', scene);
  playerMaterial.diffuseColor = new BABYLON.Color3(0.36, 0.37, 0.34)
  playerMaterial.alpha = 0.8

  player = BABYLON.MeshBuilder.CreateBox(
    "player",
    {
      width: 1,
      height: 1,
      depth: 1,
      updatable: true
    },
    scene)
  player.material = playerMaterial
  player.isPickable = false // no hit myself with ray(cast)
  player.position.y = 0.5

  shadowGenerator.getShadowMap().renderList.push(player)

  //console.log(shadowGenerator.getShadowMap().renderList)

  camera.lockedTarget = player
}
