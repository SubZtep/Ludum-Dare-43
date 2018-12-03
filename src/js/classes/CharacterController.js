import { scene } from "Engine/engine"
import { Directions, InputManager } from "Classes/InputManager"

const Animations = {
  Slide: 'slideAnim',
  Roll: 'rollAnim'
}

export default class extends InputManager {

  constructor (playerObj) {
    super()

    this.cx = 0
    this._player = playerObj

    // Setting
    this._moveSpeed = 5 // Move animation speed

    this._initAnimations()
    this.initKeyboard()

    //this._initGUI()
  }

  _initAnimations () {
    this._anims = {}

    // Slide animation
    this._anims.slide = {}
    this._anims.slide.anim = new BABYLON.Animation(
      "moveAnim",
      "position",
      60,
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
    this._anims.slide.run = null

    // Rotate animation
    this._anims.roll = {}
    this._anims.roll.anim = new BABYLON.Animation(
      "rollAnim",
      "rotation",
      60,
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
    this._anims.roll.run = null
  }

  _directionToVector3 (dir) {
    switch (dir) {
      case Directions.Up:
        return BABYLON.Vector3.Forward()
      case Directions.Down:
        return BABYLON.Vector3.Backward()
      case Directions.Left:
        return BABYLON.Vector3.Left()
      case Directions.Right:
        return BABYLON.Vector3.Right()
    }
    return BABYLON.Vector3.Zero()
  }

  /** Test if the player can move to the specified direction */
  _canMove (dir) {
    let pos = this._directionToVector3(dir)

    for (let testX of [-0.5, 0, 0.5]) {
      let origin = this._player.position.clone()
      if (dir === Directions.Up || dir === Directions.Down) {
        origin.x += testX
      } else {
        origin.z += testX
      }
      origin.y -= 0.45 // check the ground

      let ray = new BABYLON.Ray(origin, pos, 1.5)

      //FIXME: sometimes check fails, maybe player pos, or just wrong material...
      // debug
      //if (origin.z === 0) console.log('ray', [origin.toString(), pos.toString(), this._player.position.toString()])

      // Show raycast helper
      let rayHelper = BABYLON.RayHelper.CreateAndShow(ray, scene, new BABYLON.Color3(1, 1, 0.1))
      rayHelper._renderLine.isPickable = false


      const STRiP_DELAY = 35000

      setTimeout(() => rayHelper.dispose(), STRiP_DELAY)

      let hit = scene.pickWithRay(ray)
      if (hit.hit) {
        //TODO: some ux feedback for failed move attempt
        return false
      }
    }

    return true;
  }

  /** move the player based on state */
  move () {
    this._updateGUI()

    if (this.isMoving()) {
      //console.log('sorry, im already moving')
      return
    }

    let dir = this._state.lastDir
    if (!this._canMove(dir)) return

    if (this._state.special) {
      this._slide(dir)
    } else {
      this._roll(dir)
    }

    this._updateGUI()
  }

  /** move the player with slide animation */
  _slide (dir) {
    let slide = this._directionToVector3(dir)
    let newPos = this._player.position.add(slide)
    let keys = [
      { frame: 0, value: this._player.position },
      { frame: 60, value: newPos }
    ]
    this._anims.slide.anim.setKeys(keys)

    this._anims.slide.run = scene.beginDirectAnimation(
      this._player,
      [this._anims.slide.anim],
      0,
      60,
      false,
      this._moveSpeed)
  }

  /** move the player with roll animation */
  _roll (dir) {
    let rot, piv

    switch (dir) {
      case Directions.Up:
        rot = new BABYLON.Vector3(Math.PI / 2, 0, 0)
        piv = new BABYLON.Vector3(0, -0.5, 0.5)
        break
      case Directions.Down:
        rot = new BABYLON.Vector3(-Math.PI / 2, 0, 0)
        piv = new BABYLON.Vector3(0, -0.5, -0.5)
        break
      case Directions.Left:
        rot = new BABYLON.Vector3(0, 0, Math.PI / 2)
        piv = new BABYLON.Vector3(-0.5, -0.5, 0)
        break
      case Directions.Right:
        rot = new BABYLON.Vector3(0, 0, -Math.PI / 2)
        piv = new BABYLON.Vector3(0.5, -0.5, 0)
        break
      default:
        return
    }

    this._player.setPivotPoint(piv)

    let keys = [
      { frame: 0, value: this._player.rotation },
      { frame: 60, value: this._player.rotation.add(rot) }
    ]
    this._anims.roll.anim.setKeys(keys)

    this._anims.roll.run = scene.beginDirectAnimation(
      this._player,
      [this._anims.roll.anim],
      0,
      60,
      false,
      this._moveSpeed,
      () => {
        this._player.rotation = new BABYLON.Vector3(0, 0, 0)
        this._player.position = this._player.position.add(this._directionToVector3(dir))

        if (this.isMoveKeyPressed()) this.move()
      })
  }

  /** Tells is the player is moving */
  isMoving () {
    return this._isAnimRunning('slide') || this._isAnimRunning('roll')
  }

  _isAnimRunning (name) {
    return this._anims[name].run !== null &&
      this._anims[name].run.animationStarted
  }
}
