import { scene } from "Engine/engine"

export let sphere = null

export function createSphere () {
  sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2 },
    scene)
}
