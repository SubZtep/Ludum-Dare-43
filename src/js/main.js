import "../scss/main.scss"
import { engine, scene } from "Engine/engine"
import { createCamera } from "Scene/camera"
import { createLight, shadowGenerator } from "Scene/light"
import { createEnvironment } from "Objects/environment"
import { createPlayer, player } from "Objects/player"
import CharacterController from "Classes/CharacterController"
import { getSphere, initPool } from "Classes/SphereSeeder"

function startGame () {
  // Create basic objects
  createCamera()
  createLight()
  createEnvironment()
  createPlayer()

  let cc = new CharacterController(player, scene)

  initPool()


  for (let j = 0; j < 5; j += 0.8) {
    for (let i = 0; i < 5; i += 0.6) {
      getSphere(new BABYLON.Vector3(i - 2.5, 1, j + 8))
    }
  }

  /* let s = getSphere(new BABYLON.Vector3(0.5, 1, 8))
  let s2 = getSphere(new BABYLON.Vector3(1.5, 1, 8)) */

  // Game loop
  engine.runRenderLoop(() => {
    scene.render()


    // Add some code here...
  })
}

// Wait for the engine
document
  .querySelector("canvas")
  .addEventListener("loaded", startGame, false)
