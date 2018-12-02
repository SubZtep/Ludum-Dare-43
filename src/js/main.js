import "../scss/main.scss"
import { engine, scene } from "Engine/engine"
import { createCamera } from "Scene/camera"
import { createLight, shadowGenerator } from "Scene/light"
import { createEnvironment } from "Objects/environment"
import { createPlayer, player } from "Objects/player"
import CharacterController from "Classes/CharacterController"
import { getSphere, initPool, throwSpheres } from "Classes/SphereSeeder"
import { initDebug } from "Engine/debug"
import { initAssetManager } from "Engine/assets"

function startGame () {
  // Create basic objects
  createCamera()
  createLight()
  createEnvironment()
  createPlayer()
  initPool()
  if (!PRODUCTION) {
    initDebug()
  }

  let cc = new CharacterController(player, scene)

  setTimeout(() => {
    throwSpheres()
    setInterval(() => {
      throwSpheres()
    }, 5000)
  }, 2000)


  // Game loop
  engine.runRenderLoop(() => {
    scene.render()
  })
}


// Booting listeners
let listinerOptions = {
  capture: false,
  once: true
}
let canvasEl = document.querySelector("canvas")
canvasEl.addEventListener("engineLoaded", initAssetManager, listinerOptions)
canvasEl.addEventListener("assetsLoaded", startGame, listinerOptions)
