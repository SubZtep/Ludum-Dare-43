import { canvas, scene } from "Engine/engine"

export let camera = null

export function createCamera () {

  camera = new BABYLON.ArcRotateCamera(
    "Camera",
    -Math.PI / 2,
    Math.PI / 8,
    15,
    new BABYLON.Vector3(0, 0, 3),
    scene)

  /*
    "Camera",
    3 * Math.PI / 4,
    Math.PI / 4,
    4,
    BABYLON.Vector3.Zero(),
  */

  //camera.setPosition(new BABYLON.Vector3(0, 0, 0))



  camera.attachControl(canvas, true)

  //camera.inputs.attachInput(camera.inputs.attached.mouse)
  //camera.setTarget(new BABYLON.Vector3(0, 0, 10))
}
