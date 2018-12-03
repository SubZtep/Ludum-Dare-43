import { scene } from "Engine/engine"
import { player } from "Objects/player"
import { throwSpheres } from "Classes/SphereSeeder"

let spriteManagerHand

export function handAppear () {

  spriteManagerHand = new BABYLON.SpriteManager(
                              "handManager",
                              "textures/hand.png",
                              2,
                              { width: 630, height: 268 },
                              scene)

  let hand1 = new BABYLON.Sprite("hand", spriteManagerHand)
  //hand.size = 100
  hand1.width = 63.0
  hand1.height = 26.8

  hand1.position = new BABYLON.Vector3(80, 10, -15)


  var animationBox = new BABYLON.Animation(
          "myAnimation",
          "position.x",
          100,
          BABYLON.Animation.ANIMATIONTYPE_FLOAT,
          BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)


  let keys = [
    { frame: 0, value: 100 },
    { frame: 50, value: 80 },
    { frame: 70, value: 85 },
    { frame: 100, value: 0 }
  ]

  animationBox.setKeys(keys)

  hand1.animations = [animationBox]

  scene.beginAnimation(hand1, 0, 100, false, 1, () => {
    throwSpheres()
    setTimeout(() =>
      scene.beginAnimation(hand1, 100, 0, false, 1.5), 1000)
  })

}
