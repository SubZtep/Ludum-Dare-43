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

      // The current direction
      lastDir: null,

      // In case of multiple key pressed store the order of key presses
      dirHistory: []
    }
  }

  initKeyboard () {
    document.addEventListener("keydown", e => {
      //e.preventDefault()
      //console.log('KEY Down', e.key)
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
    let dir = null
    switch (e.key) {
      case "W":
      case "w":
      case "ArrowUp":
        this._state.forward = setOn
        dir = Directions.Up
        break
      case "S":
      case "s":
      case "ArrowDown":
        this._state.backward = setOn
        dir = Directions.Down
        break
      case "A":
      case "a":
      case "ArrowLeft":
        this._state.left = setOn
        dir = Directions.Left
        break
      case "D":
      case "d":
      case "ArrowRight":
        this._state.right = setOn
        dir = Directions.Right
        break
    }
    this._state.special = e.shiftKey


    if (setOn) {
      // Key pressed

      if (dir !== null) {
        // Move direction key pressed

        // Add previous (but still active) key to the history
        if (
          this._state.lastDir !== null &&
          (
            this._state.dirHistory.length === 0 ||
            this._state.dirHistory[this._state.dirHistory.length-1] !== this._state.lastDir
          )
        ) {
          this._state.dirHistory.push(this._state.lastDir)
        }

        // Set the new direction
        this._state.lastDir = dir
      }

    } else {
      // Key released

      // If no movement key pressed just reset everything
      if (!this.isMoveKeyPressed()) {
        this._state.lastDir = null
        this._state.dirHistory = []
        return
      }

      // Remove relesed key from the history
      this._state.dirHistory = this._state.dirHistory.filter(hdir => dir !== hdir)

      // Load back last correct direction if direction changed
      if (
        this._state.dirHistory.length > 0 &&
        (
          (this._state.lastDir === Directions.Up && !this._state.forward) ||
          (this._state.lastDir === Directions.Down && !this._state.backward) ||
          (this._state.lastDir === Directions.Left && !this._state.left) ||
          (this._state.lastDir === Directions.Right && !this._state.right)
        )
      ) {
        this._state.lastDir = this._state.dirHistory.pop()
      }
    }

    //console.log([this._state.lastDir, this._state.dirHistory.join(',')])
  }

  _initGUI () {
    this._gui = new dat.GUI()

    this._gui.addFolder('Player state')
    for (let item of Object.keys(this._state)) {
      if (typeof this._state[item] === 'object') {
        if (this._state[item] === null) {
        } else {
          //this._gui.add(this._state, item, this._state[item])
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
