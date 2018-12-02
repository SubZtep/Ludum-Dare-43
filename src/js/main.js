import "../scss/main.scss"
import { engine, scene } from "Engine/engine"
import { createCamera } from "Scene/camera"
import { createLight, shadowGenerator } from "Scene/light"
import { createEnvironment } from "Objects/environment"
import { createPlayer, player } from "Objects/player"
import CharacterController from "Classes/CharacterController"
import { getSphere, initPool, throwSpheres } from "Classes/SphereSeeder"
import { initDebug } from "Engine/debug"

function startGame () {
  // Create basic objects
  createCamera()
  createLight()
  createEnvironment()
  createPlayer()

  if (!PRODUCTION) {
    initDebug()
  }


  let cc = new CharacterController(player, scene)

  initPool()

  //throwSpheres()


  // Game loop
  engine.runRenderLoop(() => {
    scene.render()
  })
}

// Wait for the engine
document
  .querySelector("canvas")
  .addEventListener("loaded", startGame, false)
