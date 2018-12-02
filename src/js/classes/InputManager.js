import dat from "dat.gui"

export /* Enums */ const Directions = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3
}
export class InputManager {

  constructor () {
    this._state = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      special: false,
      lastDir: null,
      dirHistory: []
    }
  }

  initKeyboard () {
    document.addEventListener("keydown", e => {
      //console.log('KEY Down')
      this._setState(e, true)
      this.move()
    })
    document.addEventListener("keyup", e => {
      //console.log('KEY Up')
      this._setState(e, false)
      this.move()
    })
  }

  isMoveKeyPressed () {
    return this._state.forward || this._state.backward || this._state.left || this._state.right
  }

  _setState (e, setOn = true) {
    switch (e.key) {
      case "W":
      case "w":
        this._state.forward = setOn
        if (setOn) this._state.lastDir = Directions.Up
        break
      case "S":
      case "s":
        this._state.backward = setOn
        if (setOn) this._state.lastDir = Directions.Down
        break
      case "A":
      case "a":
        this._state.left = setOn
        if (setOn) this._state.lastDir = Directions.Left
        break
      case "D":
      case "d":
        this._state.right = setOn
        if (setOn) this._state.lastDir = Directions.Right
        break
    }
    this._state.special = e.shiftKey

    if (setOn) {
      if (this._state.dirHistory.length === 0 ||
          this._state.dirHistory[this._state.dirHistory.length-1] !== this._state.lastDir) {
        this._state.dirHistory.push(this._state.lastDir)
      }
    } else {

      if (!this.isMoveKeyPressed()) {
        this._state.lastDir = null
        this._state.dirHistory = []
        return
      }

      if (
        this._state.dirHistory.length > 0 && (
          (this._state.lastDir === Directions.Up && !this._state.forward) ||
          (this._state.lastDir === Directions.Down && !this._state.backward) ||
          (this._state.lastDir === Directions.Left && !this._state.left) ||
          (this._state.lastDir === Directions.Right && !this._state.right)
        )
      ) {
        //FIXME: usually buggy the history roll back
        //console.log(this._state.dirHistory)
        this._state.dirHistory.pop() // the released key
        this._state.lastDir = this._state.dirHistory.pop()
        //console.log(this._state.dirHistory)
      }
    }
  }

  _initGUI () {
    this._gui = new dat.GUI()

    this._gui.addFolder('Player state')
    for (let item of Object.keys(this._state)) {
      if (typeof this._state[item] === 'object') {
        if (this._state[item] === null) {
        } else {
          this._gui.add(this._state, item, this._state[item])
        }
      } else {
        this._gui.add(this._state, item)
      }
    }

    let FizzyText = function (obj) {
      this.x = obj.x
      this.y = obj.y
      this.z = obj.z
    }

    this._gui.addFolder('Player Position')
    this._ftPlayerPos = new FizzyText(this._player.position)

    this._gui.add(this._ftPlayerPos, 'x').step(0.5).onChange(val => {
      this._player.position.x = val
    })
    this._gui.add(this._ftPlayerPos, 'y').step(0.5).onChange(val => {
      this._player.position.y = val
    })
    this._gui.add(this._ftPlayerPos, 'z').step(0.5).onChange(val => {
      this._player.position.z = val
    })


    this._gui.addFolder('Player Rotation')
    this._ftPlayerRot = new FizzyText(this._player.rotation)

    this._gui.add(this._ftPlayerRot, 'x').onChange(val => {
      this._player.rotation.x = val
    })
    this._gui.add(this._ftPlayerRot, 'y').onChange(val => {
      this._player.rotation.y = val
    })
    this._gui.add(this._ftPlayerRot, 'z').onChange(val => {
      this._player.rotation.z = val
    })


    this._gui.addFolder('Player Pivot Position')
    this._ftPlayerPivotPos = new FizzyText(this._player.getPivotPoint())

    //this._gui.add(this._ftPlayerPivotPos, 'x', -0.5, 0.5, 0.5).onChange(val => {
      this._gui.add(this._ftPlayerPivotPos, 'x').step(0.5).onChange(val => {
      let piv = this._player.getPivotPoint()
      piv.x = val
      this._player.setPivotPoint(piv)
      this._helper.position = piv
    })
    this._gui.add(this._ftPlayerPivotPos, 'y').step(0.5).onChange(val => {
      let piv = this._player.getPivotPoint()
      piv.y = val
      this._player.setPivotPoint(piv)
      this._helper.position = piv
    })
    this._gui.add(this._ftPlayerPivotPos, 'z').step(0.5).onChange(val => {
      let piv = this._player.getPivotPoint()
      piv.z = val
      this._player.setPivotPoint(piv)
      this._helper.position = piv
    })
  }

  _updateGUI () {
    if (typeof this._gui === 'undefined') return


    this._ftPlayerPos.x = this._player.position.x
    this._ftPlayerPos.y = this._player.position.y
    this._ftPlayerPos.z = this._player.position.z

    this._ftPlayerRot.x = this._player.rotation.x
    this._ftPlayerRot.y = this._player.rotation.y
    this._ftPlayerRot.z = this._player.rotation.z

    let piv = this._player.getPivotPoint()
    this._ftPlayerPivotPos.x = piv.x
    this._ftPlayerPivotPos.y = piv.y
    this._ftPlayerPivotPos.z = piv.z

    this._helper.position = piv

    for (let c of this._gui.__controllers) {
      c.updateDisplay()
    }
  }

}
