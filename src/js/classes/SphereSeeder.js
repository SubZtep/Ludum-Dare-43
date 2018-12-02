import { scene } from "Engine/engine"
import { shadowGenerator } from "Scene/light"
import ObjectPool from "Classes/ObjectPool"
import { player } from "Objects/player"

/** THE POOL */
let _pool = new ObjectPool()
let _spheres = []

export function initPool () {

  scene.registerBeforeRender(() => {
    for (let i = _spheres.length - 1; i >= 0; i--) {
      let obj = _spheres[i]

      if (obj.position.y > -2) {
        // Sphere is still active
        if (obj.intersectsMesh(player)) {
          player.material.diffuseColor = BABYLON.Color3.Red()
          player.material.emissiveColor = new BABYLON.Color3(0.55, 0, 0) // shadow color(?)
          player.material.alpha = 1
          //TODO: die!
        }

      } else {
        // Straight to the bin
        _pool.add(obj)
        _spheres.splice(i, 1)
      }
    }
  })
}

export function throwSpheres () {
  //FIXME: remove after object pool is fixed
  if (_spheres.length > 0) {
    for (let s of _spheres) _pool.add(s)
    _spheres = []
  }
  _pool.wipe()

  for (let j = 0; j < 2; j += 0.8) {
    for (let i = 0; i < 10; i += 1.5) {
      let posZ = j + 8 + player.position.z
      getSphere(new BABYLON.Vector3(i - 4, 1, posZ))
    }
  }
}


export function getSphere (pos) {
  let sphere1 = null

  if (!_pool.empty()) {
    sphere1 = _pool.get()
    sphere1.position = pos
  } else {
    sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", { diameter: 0.5 }, scene)
    sphere1.position = pos
    sphere1.physicsImpostor = new BABYLON.PhysicsImpostor(
      sphere1,
      BABYLON.PhysicsImpostor.SphereImpostor,
      { mass: 1, restitution: 0 },
      scene)

    shadowGenerator.getShadowMap().renderList.push(sphere1)
  }
  _spheres.push(sphere1)

  return sphere1
}
