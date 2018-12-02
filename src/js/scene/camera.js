import { canvas, scene } from "Engine/engine"

export let camera = null

export function createCamera () {

  camera = new BABYLON.ArcRotateCamera(
    "Camera",
    3 * Math.PI / 4,
    Math.PI / 4,
    4,
    BABYLON.Vector3.Zero(),
    scene)

  camera.attachControl(canvas, true)
  //camera.inputs.attachInput(camera.inputs.attached.mouse)

  //camera.setTarget(new BABYLON.Vector3(0, 0, 10))
}
