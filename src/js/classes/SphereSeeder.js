import { scene } from "Engine/engine"
import { shadowGenerator } from "Scene/light"

/** THE POOL */
let spherePool = []


export function initPool () {

  scene.registerBeforeRender(() => {
    spherePool.forEach(item => {
      //console.log('yo', item.position.y)
      if (item.position.y < -5) {

        item.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero())

        item.position.x = Math.floor(Math.random() * 5) - 2
        item.position.y = 1 // height
        item.position.z = 8
      }

    })
  })

}




export function getSphere (pos = new BABYLON.Vector3(-2, .5, -3)) {

  let sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", { diameter: 0.5 }, scene)
  sphere1.position = pos

  sphere1.physicsImpostor = new BABYLON.PhysicsImpostor(
    sphere1,
    BABYLON.PhysicsImpostor.SphereImpostor,
    { mass: 1, restitution: 0.9 },
    scene)

  //_sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, -1))

  shadowGenerator.getShadowMap().renderList.push(sphere1)


  spherePool.push(sphere1)
  //console.log('spherePool', spherePool)

  return sphere1
}
