export function AddSphere () {


  var _sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", { diameter: 0.5 }, scene)
  _sphere.position = new BABYLON.Vector3(-2, .5, -3)

  _sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
    _sphere,
    BABYLON.PhysicsImpostor.SphereImpostor,
    { mass: 1, restitution: 0.9 },
    scene)

  _sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(4, 0, 0))

}
