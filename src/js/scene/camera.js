import { canvas, scene } from "Engine/engine"

export let camera = null

export function createCamera () {
  createArcCamera()
  //createFollowCamera()
}

function createFollowCamera () {
  camera = new BABYLON.FollowCamera(
    "Camera",
    new BABYLON.Vector3(0, 10, -10),
    scene)

  camera.radius = 10
  camera.heightOffset = 10
  camera.rotationOffset = 180
  camera.cameraAcceleration = 0.001
  camera.maxCameraSpeed = 10
}

function createArcCamera () {
  camera = new BABYLON.ArcRotateCamera(
    "Camera",
    -Math.PI / 2,
    Math.PI / 8,
    15,
    new BABYLON.Vector3(0, 0, 3),
    scene)
  camera.attachControl(canvas, true)
}
