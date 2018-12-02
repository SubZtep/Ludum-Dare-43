import { scene } from "Engine/engine"
import { shadowGenerator } from "Scene/light"
import ObjectPool from "Classes/ObjectPool"

/** THE POOL */
let _pool = new ObjectPool()
let _spheres = []

export function initPool () {

  scene.registerBeforeRender(() => {

    for (let i = _spheres.length - 1; i >= 0; i--) {
      let obj = _spheres[i]
      if (obj.position.y < -2) {
        _pool.add(obj)
        _spheres.splice(i, 1)
      }
    }

    //console.log('_spheres', _spheres)
    //console.log('_pool', _pool.pool)
    console.log('_spheres, _pool', [_spheres.length, _pool.pool.length])

    if (_spheres.length === 0) throwSpheres()

  })
}


export function throwSpheres () {
  for (let j = 0; j < 5; j += 0.8) {
    for (let i = 0; i < 5; i += 0.6) {
      getSphere(new BABYLON.Vector3(i - 2.5, 1, j + 8))
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
      { mass: 1, restitution: 0.9 },
      scene)
    shadowGenerator.getShadowMap().renderList.push(sphere1)
  }

  _spheres.push(sphere1)

  return sphere1
}
