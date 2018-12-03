/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/main.js","vendors~main~vendor","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/scss/main.scss":
/*!***********************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/scss/main.scss ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\nexports.push([module.i, \"@import url(https://fonts.googleapis.com/css?family=Unlock);\", \"\"]);\n\n// module\nexports.push([module.i, \"/* @font-face {\\n  font-family: 'Unlock';\\n  font-style: normal;\\n  font-weight: 400;\\n  src: local('Unlock Regular'), local('Unlock-Regular'),\\n       url('../../assets/fonts/unlock-v8-latin-regular.woff2') format('woff2'),\\n       url('../../assets/fonts/unlock-v8-latin-regular.woff') format('woff');\\n} */\\nhtml, body {\\n  height: 100%;\\n  width: 100%;\\n  padding: 0;\\n  margin: 0;\\n  overflow: hidden;\\n  position: fixed; }\\n\\ncanvas {\\n  width: 100%;\\n  height: 100%;\\n  margin: 0;\\n  padding: 0; }\\n\\n#loading {\\n  position: fixed;\\n  top: 0;\\n  right: 0;\\n  bottom: 0;\\n  left: 0;\\n  background: radial-gradient(circle, #666 39%, #ccc 40%);\\n  z-index: 5000;\\n  display: grid;\\n  align-content: center;\\n  text-align: center; }\\n  #loading .msg {\\n    margin: 0 auto;\\n    width: 20%;\\n    line-height: 26px;\\n    letter-spacing: 13px;\\n    font-size: 24px;\\n    word-wrap: break-word;\\n    color: #fffa8c;\\n    text-shadow: -26px 0 black, 0px 0 black, -13px 13px 0 black, 13px 13px 0 black; }\\n  #loading.hide {\\n    opacity: 0;\\n    transition: opacity .3s; }\\n\\n/** HUD */\\n#hud {\\n  z-index: 10000;\\n  position: fixed;\\n  top: 0;\\n  right: 0;\\n  bottom: 0;\\n  left: 0; }\\n  #hud .intro {\\n    text-align: center; }\\n    #hud .intro h1 {\\n      font-family: 'Unlock', cursive;\\n      font-size: 52px;\\n      text-align: center;\\n      color: #333;\\n      text-shadow: 0 3px 2px #969696; }\\n    #hud .intro p {\\n      color: #969696; }\\n  #hud .br {\\n    position: absolute;\\n    bottom: 0;\\n    margin: 6px 4px; }\\n  #hud .btn {\\n    padding: 8px 14px;\\n    background-color: rgba(1, 1, 1, 0.6);\\n    font-size: 14px;\\n    color: #eee;\\n    border: 3px solid #666;\\n    border-radius: 32px; }\\n    #hud .btn:hover {\\n      border-color: yellow;\\n      color: yellow;\\n      background-color: black;\\n      cursor: pointer; }\\n  #hud .devBuild {\\n    position: absolute;\\n    bottom: 0;\\n    right: 0;\\n    color: greenyellow;\\n    font-size: 12px;\\n    opacity: .75;\\n    margin: 0 2px; }\\n\\n/** GUI */\\n.dg.ac .dg.a {\\n  float: left; }\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/scss/main.scss?./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js");

/***/ }),

/***/ "./src/js/SETTINGS.js":
/*!****************************!*\
  !*** ./src/js/SETTINGS.js ***!
  \****************************/
/*! exports provided: data */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"data\", function() { return data; });\nconst data = {\n\n  /*\n  ** SETTINGS\n  */\n\n  showDebug: false,\n\n  /*\n  ** SKYBOX\n  */\n\n  SKYBOX: {\n    IntervalTimeout: 10,\n    RotationStart: new BABYLON.Vector3(-3.4, 0, 0),\n    //RotationStep: new BABYLON.Vector3(0.01, 0.001, 0),\n    RotationStep: BABYLON.Vector3.Zero(),\n    Pic: \"skybox/sky/skybox\"\n  },\n\n  /*\n  ** TEXTURES\n  */\n\n  TXT: {\n    Ground: \"textures/bg_scan_starlin_512x512.jpg\",\n\n    Sphere: \"textures/stone.png\",\n    SphereNormal: \"textures/stone-normal-map.png\",\n  },\n}\n\n\n//# sourceURL=webpack:///./src/js/SETTINGS.js?");

/***/ }),

/***/ "./src/js/classes/CharacterController.js":
/*!***********************************************!*\
  !*** ./src/js/classes/CharacterController.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var Engine_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Engine/engine */ \"./src/js/engine/engine.js\");\n/* harmony import */ var Classes_InputManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Classes/InputManager */ \"./src/js/classes/InputManager.js\");\n\n\n\nconst Animations = {\n  Slide: 'slideAnim',\n  Roll: 'rollAnim'\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class extends Classes_InputManager__WEBPACK_IMPORTED_MODULE_1__[\"InputManager\"] {\n\n  constructor (playerObj) {\n    super()\n\n    this.cx = 0\n    this._player = playerObj\n\n    // Setting\n    this._moveSpeed = 5 // Move animation speed\n\n    this._initAnimations()\n    this.initKeyboard()\n\n    //this._initGUI()\n  }\n\n  _initAnimations () {\n    this._anims = {}\n\n    // Slide animation\n    this._anims.slide = {}\n    this._anims.slide.anim = new BABYLON.Animation(\n      \"moveAnim\",\n      \"position\",\n      60,\n      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,\n      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)\n    this._anims.slide.run = null\n\n    // Rotate animation\n    this._anims.roll = {}\n    this._anims.roll.anim = new BABYLON.Animation(\n      \"rollAnim\",\n      \"rotation\",\n      60,\n      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,\n      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)\n    this._anims.roll.run = null\n  }\n\n  _directionToVector3 (dir) {\n    switch (dir) {\n      case Classes_InputManager__WEBPACK_IMPORTED_MODULE_1__[\"Directions\"].Up:\n        return BABYLON.Vector3.Forward()\n      case Classes_InputManager__WEBPACK_IMPORTED_MODULE_1__[\"Directions\"].Down:\n        return BABYLON.Vector3.Backward()\n      case Classes_InputManager__WEBPACK_IMPORTED_MODULE_1__[\"Directions\"].Left:\n        return BABYLON.Vector3.Left()\n      case Classes_InputManager__WEBPACK_IMPORTED_MODULE_1__[\"Directions\"].Right:\n        return BABYLON.Vector3.Right()\n    }\n    return BABYLON.Vector3.Zero()\n  }\n\n  /** Test if the player can move to the specified direction */\n  _canMove (dir) {\n    let pos = this._directionToVector3(dir)\n\n    for (let testX of [-0.5, 0, 0.5]) {\n      let origin = this._player.position.clone()\n      if (dir === Classes_InputManager__WEBPACK_IMPORTED_MODULE_1__[\"Directions\"].Up || dir === Classes_InputManager__WEBPACK_IMPORTED_MODULE_1__[\"Directions\"].Down) {\n        origin.x += testX\n      } else {\n        origin.z += testX\n      }\n      origin.y -= 0.45 // check the ground\n\n      let ray = new BABYLON.Ray(origin, pos, 1.5)\n\n      //FIXME: sometimes check fails, maybe player pos, or just wrong material...\n      // debug\n      //if (origin.z === 0) console.log('ray', [origin.toString(), pos.toString(), this._player.position.toString()])\n\n      // Show raycast helper\n      let rayHelper = BABYLON.RayHelper.CreateAndShow(ray, Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"], new BABYLON.Color3(1, 1, 0.1))\n      rayHelper._renderLine.isPickable = false\n\n\n      const STRiP_DELAY = 35000\n\n      setTimeout(() => rayHelper.dispose(), STRiP_DELAY)\n\n      let hit = Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"].pickWithRay(ray)\n      if (hit.hit) {\n        //TODO: some ux feedback for failed move attempt\n        return false\n      }\n    }\n\n    return true;\n  }\n\n  /** move the player based on state */\n  move () {\n    this._updateGUI()\n\n    if (this.isMoving()) {\n      //console.log('sorry, im already moving')\n      return\n    }\n\n    let dir = this._state.lastDir\n    if (!this._canMove(dir)) return\n\n    if (this._state.special) {\n      this._slide(dir)\n    } else {\n      this._roll(dir)\n    }\n\n    this._updateGUI()\n  }\n\n  /** move the player with slide animation */\n  _slide (dir) {\n    let slide = this._directionToVector3(dir)\n    let newPos = this._player.position.add(slide)\n    let keys = [\n      { frame: 0, value: this._player.position },\n      { frame: 60, value: newPos }\n    ]\n    this._anims.slide.anim.setKeys(keys)\n\n    this._anims.slide.run = Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"].beginDirectAnimation(\n      this._player,\n      [this._anims.slide.anim],\n      0,\n      60,\n      false,\n      this._moveSpeed)\n  }\n\n  /** move the player with roll animation */\n  _roll (dir) {\n    let rot, piv\n\n    switch (dir) {\n      case Classes_InputManager__WEBPACK_IMPORTED_MODULE_1__[\"Directions\"].Up:\n        rot = new BABYLON.Vector3(Math.PI / 2, 0, 0)\n        piv = new BABYLON.Vector3(0, -0.5, 0.5)\n        break\n      case Classes_InputManager__WEBPACK_IMPORTED_MODULE_1__[\"Directions\"].Down:\n        rot = new BABYLON.Vector3(-Math.PI / 2, 0, 0)\n        piv = new BABYLON.Vector3(0, -0.5, -0.5)\n        break\n      case Classes_InputManager__WEBPACK_IMPORTED_MODULE_1__[\"Directions\"].Left:\n        rot = new BABYLON.Vector3(0, 0, Math.PI / 2)\n        piv = new BABYLON.Vector3(-0.5, -0.5, 0)\n        break\n      case Classes_InputManager__WEBPACK_IMPORTED_MODULE_1__[\"Directions\"].Right:\n        rot = new BABYLON.Vector3(0, 0, -Math.PI / 2)\n        piv = new BABYLON.Vector3(0.5, -0.5, 0)\n        break\n      default:\n        return\n    }\n\n    this._player.setPivotPoint(piv)\n\n    let keys = [\n      { frame: 0, value: this._player.rotation },\n      { frame: 60, value: this._player.rotation.add(rot) }\n    ]\n    this._anims.roll.anim.setKeys(keys)\n\n    this._anims.roll.run = Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"].beginDirectAnimation(\n      this._player,\n      [this._anims.roll.anim],\n      0,\n      60,\n      false,\n      this._moveSpeed,\n      () => {\n        this._player.rotation = new BABYLON.Vector3(0, 0, 0)\n        this._player.position = this._player.position.add(this._directionToVector3(dir))\n\n        if (this.isMoveKeyPressed()) this.move()\n      })\n  }\n\n  /** Tells is the player is moving */\n  isMoving () {\n    return this._isAnimRunning('slide') || this._isAnimRunning('roll')\n  }\n\n  _isAnimRunning (name) {\n    return this._anims[name].run !== null &&\n      this._anims[name].run.animationStarted\n  }\n});\n\n\n//# sourceURL=webpack:///./src/js/classes/CharacterController.js?");

/***/ }),

/***/ "./src/js/classes/InputManager.js":
/*!****************************************!*\
  !*** ./src/js/classes/InputManager.js ***!
  \****************************************/
/*! exports provided: Directions, InputManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Directions\", function() { return Directions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InputManager\", function() { return InputManager; });\n/* harmony import */ var dat_gui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dat.gui */ \"./node_modules/dat.gui/build/dat.gui.module.js\");\n\n\nconst Directions = {\n  Up: 0,\n  Down: 1,\n  Left: 2,\n  Right: 3\n}\nclass InputManager {\n\n  constructor () {\n    this._state = {\n      forward: false,\n      backward: false,\n      left: false,\n      right: false,\n      special: false,\n\n      // The current direction\n      lastDir: null,\n\n      // In case of multiple key pressed store the order of key presses\n      dirHistory: []\n    }\n  }\n\n  initKeyboard () {\n    document.addEventListener(\"keydown\", e => {\n      //e.preventDefault()\n      //console.log('KEY Down', e.key)\n      this._setState(e, true)\n      this.move()\n    })\n    document.addEventListener(\"keyup\", e => {\n      //console.log('KEY Up')\n      this._setState(e, false)\n      this.move()\n    })\n  }\n\n  isMoveKeyPressed () {\n    return this._state.forward || this._state.backward || this._state.left || this._state.right\n  }\n\n  _setState (e, setOn = true) {\n    let dir = null\n    switch (e.key) {\n      case \"W\":\n      case \"w\":\n      case \"ArrowUp\":\n        this._state.forward = setOn\n        dir = Directions.Up\n        break\n      case \"S\":\n      case \"s\":\n      case \"ArrowDown\":\n        this._state.backward = setOn\n        dir = Directions.Down\n        break\n      case \"A\":\n      case \"a\":\n      case \"ArrowLeft\":\n        this._state.left = setOn\n        dir = Directions.Left\n        break\n      case \"D\":\n      case \"d\":\n      case \"ArrowRight\":\n        this._state.right = setOn\n        dir = Directions.Right\n        break\n    }\n    this._state.special = e.shiftKey\n\n\n    if (setOn) {\n      // Key pressed\n\n      if (dir !== null) {\n        // Move direction key pressed\n\n        // Add previous (but still active) key to the history\n        if (\n          this._state.lastDir !== null &&\n          (\n            this._state.dirHistory.length === 0 ||\n            this._state.dirHistory[this._state.dirHistory.length-1] !== this._state.lastDir\n          )\n        ) {\n          this._state.dirHistory.push(this._state.lastDir)\n        }\n\n        // Set the new direction\n        this._state.lastDir = dir\n      }\n\n    } else {\n      // Key released\n\n      // If no movement key pressed just reset everything\n      if (!this.isMoveKeyPressed()) {\n        this._state.lastDir = null\n        this._state.dirHistory = []\n        return\n      }\n\n      // Remove relesed key from the history\n      this._state.dirHistory = this._state.dirHistory.filter(hdir => dir !== hdir)\n\n      // Load back last correct direction if direction changed\n      if (\n        this._state.dirHistory.length > 0 &&\n        (\n          (this._state.lastDir === Directions.Up && !this._state.forward) ||\n          (this._state.lastDir === Directions.Down && !this._state.backward) ||\n          (this._state.lastDir === Directions.Left && !this._state.left) ||\n          (this._state.lastDir === Directions.Right && !this._state.right)\n        )\n      ) {\n        this._state.lastDir = this._state.dirHistory.pop()\n      }\n    }\n\n    //console.log([this._state.lastDir, this._state.dirHistory.join(',')])\n  }\n\n  _initGUI () {\n    this._gui = new dat_gui__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GUI()\n\n    this._gui.closed = true\n\n    this._gui.addFolder('Player state')\n    for (let item of Object.keys(this._state)) {\n      if (typeof this._state[item] === 'object') {\n        if (this._state[item] === null) {\n        } else {\n          //this._gui.add(this._state, item, this._state[item])\n        }\n      } else {\n        this._gui.add(this._state, item)\n      }\n    }\n\n    let FizzyText = function (obj) {\n      this.x = obj.x\n      this.y = obj.y\n      this.z = obj.z\n    }\n\n    this._gui.addFolder('Player Position')\n    this._ftPlayerPos = new FizzyText(this._player.position)\n\n    this._gui.add(this._ftPlayerPos, 'x').step(0.5).onChange(val => {\n      this._player.position.x = val\n    })\n    this._gui.add(this._ftPlayerPos, 'y').step(0.5).onChange(val => {\n      this._player.position.y = val\n    })\n    this._gui.add(this._ftPlayerPos, 'z').step(0.5).onChange(val => {\n      this._player.position.z = val\n    })\n\n\n    this._gui.addFolder('Player Rotation')\n    this._ftPlayerRot = new FizzyText(this._player.rotation)\n\n    this._gui.add(this._ftPlayerRot, 'x').onChange(val => {\n      this._player.rotation.x = val\n    })\n    this._gui.add(this._ftPlayerRot, 'y').onChange(val => {\n      this._player.rotation.y = val\n    })\n    this._gui.add(this._ftPlayerRot, 'z').onChange(val => {\n      this._player.rotation.z = val\n    })\n\n\n    this._gui.addFolder('Player Pivot Position')\n    this._ftPlayerPivotPos = new FizzyText(this._player.getPivotPoint())\n\n    //this._gui.add(this._ftPlayerPivotPos, 'x', -0.5, 0.5, 0.5).onChange(val => {\n      this._gui.add(this._ftPlayerPivotPos, 'x').step(0.5).onChange(val => {\n      let piv = this._player.getPivotPoint()\n      piv.x = val\n      this._player.setPivotPoint(piv)\n    })\n    this._gui.add(this._ftPlayerPivotPos, 'y').step(0.5).onChange(val => {\n      let piv = this._player.getPivotPoint()\n      piv.y = val\n      this._player.setPivotPoint(piv)\n    })\n    this._gui.add(this._ftPlayerPivotPos, 'z').step(0.5).onChange(val => {\n      let piv = this._player.getPivotPoint()\n      piv.z = val\n      this._player.setPivotPoint(piv)\n    })\n  }\n\n  _updateGUI () {\n    if (typeof this._gui === 'undefined') return\n\n\n    this._ftPlayerPos.x = this._player.position.x\n    this._ftPlayerPos.y = this._player.position.y\n    this._ftPlayerPos.z = this._player.position.z\n\n    this._ftPlayerRot.x = this._player.rotation.x\n    this._ftPlayerRot.y = this._player.rotation.y\n    this._ftPlayerRot.z = this._player.rotation.z\n\n    let piv = this._player.getPivotPoint()\n    this._ftPlayerPivotPos.x = piv.x\n    this._ftPlayerPivotPos.y = piv.y\n    this._ftPlayerPivotPos.z = piv.z\n\n    for (let c of this._gui.__controllers) {\n      c.updateDisplay()\n    }\n  }\n\n}\n\n\n//# sourceURL=webpack:///./src/js/classes/InputManager.js?");

/***/ }),

/***/ "./src/js/classes/ObjectPool.js":
/*!**************************************!*\
  !*** ./src/js/classes/ObjectPool.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (class {\n\n  constructor () {\n    this.pool = []\n  }\n\n  add (obj) {\n    obj.collisionsEnabled = false\n    obj.physicsImpostor.sleep()\n    obj.setEnabled(false)\n    //FIXME: fall dawn is calculating!!!\n\n    this.pool.push(obj)\n  }\n\n  get () {\n    if (this.pool.length === 0) return null\n\n    let obj = this.pool.pop()\n    obj.setEnabled(true)\n    obj.physicsImpostor.wakeUp()\n    return obj\n  }\n\n  wipe () {\n    let obj\n    while (obj = this.pool.pop()) {\n      obj.dispose()\n    }\n  }\n\n  empty () {\n    return this.pool.length === 0\n  }\n});\n\n\n//# sourceURL=webpack:///./src/js/classes/ObjectPool.js?");

/***/ }),

/***/ "./src/js/classes/SphereSeeder.js":
/*!****************************************!*\
  !*** ./src/js/classes/SphereSeeder.js ***!
  \****************************************/
/*! exports provided: initPool, throwSpheres, getSphere */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initPool\", function() { return initPool; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"throwSpheres\", function() { return throwSpheres; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSphere\", function() { return getSphere; });\n/* harmony import */ var Engine_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Engine/engine */ \"./src/js/engine/engine.js\");\n/* harmony import */ var Scene_light__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Scene/light */ \"./src/js/scene/light.js\");\n/* harmony import */ var Classes_ObjectPool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Classes/ObjectPool */ \"./src/js/classes/ObjectPool.js\");\n/* harmony import */ var Objects_player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Objects/player */ \"./src/js/objects/player.js\");\n/* harmony import */ var JS_SETTINGS__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! JS/SETTINGS */ \"./src/js/SETTINGS.js\");\n\n\n\n\n\n\n/** THE POOL */\nlet _pool = new Classes_ObjectPool__WEBPACK_IMPORTED_MODULE_2__[\"default\"]()\nlet _spheres = []\n\nfunction initPool () {\n\n  Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"].registerBeforeRender(() => {\n    for (let i = _spheres.length - 1; i >= 0; i--) {\n      let obj = _spheres[i]\n\n      if (obj.position.y > -2) {\n        // Sphere is still active\n        if (obj.intersectsMesh(Objects_player__WEBPACK_IMPORTED_MODULE_3__[\"player\"])) {\n          Objects_player__WEBPACK_IMPORTED_MODULE_3__[\"player\"].material.diffuseColor = BABYLON.Color3.Red()\n          Objects_player__WEBPACK_IMPORTED_MODULE_3__[\"player\"].material.emissiveColor = new BABYLON.Color3(0.55, 0, 0) // shadow color(?)\n          Objects_player__WEBPACK_IMPORTED_MODULE_3__[\"player\"].material.alpha = 1\n          //TODO: die!\n        }\n\n      } else {\n        // Straight to the bin\n        _pool.add(obj)\n        _spheres.splice(i, 1)\n      }\n    }\n  })\n}\n\nfunction throwSpheres () {\n  //FIXME: remove after object pool is fixed\n  if (_spheres.length > 0) {\n    for (let s of _spheres) _pool.add(s)\n    _spheres = []\n  }\n  _pool.wipe()\n\n  for (let j = 0; j < 2; j += 0.8) {\n    for (let i = 0; i < 10; i += 1.5) {\n      //let posZ = j + 8 + player.position.z + 15\n      let posZ = j + 8 + 15\n      getSphere(new BABYLON.Vector3(i - 4.1, 5, posZ))\n    }\n  }\n}\n\n\nfunction getSphere (pos) {\n  let sphere1 = null\n\n  if (!_pool.empty()) {\n    sphere1 = _pool.get()\n    sphere1.position = pos\n  } else {\n    let spMat = new BABYLON.StandardMaterial(\"SpMat\", Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n    spMat.diffuseTexture = new BABYLON.Texture(JS_SETTINGS__WEBPACK_IMPORTED_MODULE_4__[\"data\"].TXT.Sphere, Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n    spMat.bumpTexture = new BABYLON.Texture(JS_SETTINGS__WEBPACK_IMPORTED_MODULE_4__[\"data\"].TXT.SphereNormal, Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n    spMat.specularColor = BABYLON.Color3.Black()\n    spMat.emissiveColor = BABYLON.Color3.Black()\n    spMat.ambientColor = BABYLON.Color3.Black()\n\n    sphere1 = BABYLON.MeshBuilder.CreateSphere(\"sphere1\", { diameter: 0.5 }, Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n    sphere1.material = spMat\n    sphere1.position = pos\n    sphere1.physicsImpostor = new BABYLON.PhysicsImpostor(\n      sphere1, BABYLON.PhysicsImpostor.SphereImpostor,\n      { mass: 1, restitution: 0 }, Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n\n    Scene_light__WEBPACK_IMPORTED_MODULE_1__[\"shadowGenerator\"].getShadowMap().renderList.push(sphere1)\n  }\n\n  _spheres.push(sphere1)\n  return sphere1\n}\n\n\n//# sourceURL=webpack:///./src/js/classes/SphereSeeder.js?");

/***/ }),

/***/ "./src/js/engine/assets.js":
/*!*********************************!*\
  !*** ./src/js/engine/assets.js ***!
  \*********************************/
/*! exports provided: assetsManager, initAssetManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"assetsManager\", function() { return assetsManager; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initAssetManager\", function() { return initAssetManager; });\n/* harmony import */ var Engine_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Engine/engine */ \"./src/js/engine/engine.js\");\n/* harmony import */ var JS_SETTINGS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! JS/SETTINGS */ \"./src/js/SETTINGS.js\");\n\n\n\n\n/*\n** LOADING SCREEN\n*/\n\nlet loadingEl = document.querySelector(\"#loading\")\nlet loadingTextEl = loadingEl.querySelector(\".msg\")\nfunction GameLoadingScreen() {\n  this.loadingUIBackgroundColor = \"\"\n  this.loadingUIText = \"\"\n}\nGameLoadingScreen.prototype.displayLoadingUI = () => {}\nGameLoadingScreen.prototype.hideLoadingUI = () => {\n  loadingEl.className = \"hide\"\n  setTimeout(() => loadingEl.parentNode.removeChild(loadingEl), 300)\n}\n\n\n/*\n** ASSET MANAGER\n*/\n\nconst assetFiles = [\n  \"textures/stone.png\",\n  \"textures/stone-normal-map.png\",\n  \"textures/bg_scan_starlin_512x512.jpg\",\n]\n\nlet assetsManager = null\nfunction initAssetManager () {\n\n\tEngine_engine__WEBPACK_IMPORTED_MODULE_0__[\"engine\"].loadingScreen = new GameLoadingScreen()\n\n  assetsManager = new BABYLON.AssetsManager(Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n  assetsManager.onProgress = managerProgress\n  assetsManager.onFinish = managerOnFinish\n\n  assetFiles.map(fn => addTask(fn))\n  for (let sf of [\"_px\", \"_nx\", \"_py\", \"_ny\", \"_pz\", \"_nz\"]) {\n    addTask(`${JS_SETTINGS__WEBPACK_IMPORTED_MODULE_1__[\"data\"].SKYBOX.Pic}${sf}.jpg`)\n  }\n\n  assetsManager.load()\n}\n\nfunction addTask(fn) {\n  let task1 = null,\n      folder = fn.split(\"/\")[0]\n\n  switch (folder) {\n    case \"skybox\":\n    case \"textures\":\n    case \"meshes\":\n      task1 = assetsManager.addTextureTask(\"Task\", fn)\n      break\n    /* case \"meshes\":\n      if (fn.slice(-8) === \".babylon\") {\n        task1 = assetsManager.addMeshTask(\"Task Mesh\", \"\", `assets/meshes/${fn.split(\"/\")[1]}`)\n      } else {\n        task1 = assetsManager.addTextureTask(\"Task\", `assets/${fn}`)\n      }\n      break; */\n    default: return\n  }\n\n  if (task1 !== null) {\n    task1.onSuccess = taskOnSuccess\n    task1.onError = taskOnError\n  }\n}\n\nfunction taskOnSuccess (task) {\n  // Merge broken object\n  /* if (task.name === \"Task Mesh\") {\n    let merge = []\n    for (let b of task.loadedMeshes) {\n      b.computeWorldMatrix(true)\n      merge.push(b)\n    }\n    BABYLON.Mesh.MergeMeshes(merge)\n  } */\n}\n\nfunction taskOnError (task, message, exception) {\n  addLoadingMessage(`ERROR: ${message}`)\n  loadingEl.style.background = \"darkred\"\n}\n\nfunction managerProgress (remainingCount, totalCount, lastFinishedTask) {\n  addLoadingMessage(`${totalCount-remainingCount}/${totalCount}: ${lastFinishedTask.url}`)\n}\n\nfunction managerOnFinish (tasks) {\n  //engine.hideLoadingUI()\n  Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"canvas\"].dispatchEvent(new Event(\"assetsLoaded\"))\n}\n\nfunction addLoadingMessage (text) {\n  loadingTextEl.textContent += \"\\n\"+text\n}\n\n\n//# sourceURL=webpack:///./src/js/engine/assets.js?");

/***/ }),

/***/ "./src/js/engine/debug.js":
/*!********************************!*\
  !*** ./src/js/engine/debug.js ***!
  \********************************/
/*! exports provided: gizmoMeshes, initDebug */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gizmoMeshes\", function() { return gizmoMeshes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initDebug\", function() { return initDebug; });\n/* harmony import */ var babylonjs_inspector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs-inspector */ \"./node_modules/babylonjs-inspector/babylon.inspector.bundle.js\");\n/* harmony import */ var babylonjs_inspector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_inspector__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var Engine_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Engine/engine */ \"./src/js/engine/engine.js\");\n\n\n\nlet gizmoMeshes = []\n\nfunction initDebug () {\n  createGizmoManager()\n  Engine_engine__WEBPACK_IMPORTED_MODULE_1__[\"scene\"].debugLayer.show()\n}\n\nfunction createGizmoManager () {\n  let gizmoManager = new BABYLON.GizmoManager(Engine_engine__WEBPACK_IMPORTED_MODULE_1__[\"scene\"])\n  gizmoManager.positionGizmoEnabled = true\n  gizmoManager.attachableMeshes = gizmoMeshes\n\n  document.onkeydown =  e => {\n    if (e.key == 'w') {\n        gizmoManager.positionGizmoEnabled = !gizmoManager.positionGizmoEnabled\n    }\n    if (e.key == 'e') {\n        gizmoManager.rotationGizmoEnabled = !gizmoManager.rotationGizmoEnabled\n    }\n    if (e.key == 'r') {\n        gizmoManager.scaleGizmoEnabled = !gizmoManager.scaleGizmoEnabled\n    }\n    if (e.key == 'q') {\n        gizmoManager.boundingBoxGizmoEnabled = !gizmoManager.boundingBoxGizmoEnabled\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/engine/debug.js?");

/***/ }),

/***/ "./src/js/engine/engine.js":
/*!*********************************!*\
  !*** ./src/js/engine/engine.js ***!
  \*********************************/
/*! exports provided: canvas, engine, scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"canvas\", function() { return canvas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"engine\", function() { return engine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"scene\", function() { return scene; });\n/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs */ \"./node_modules/babylonjs/babylon.js\");\n/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var JS_SETTINGS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! JS/SETTINGS */ \"./src/js/SETTINGS.js\");\n\n\n\n\nlet canvas   // HTML canvas\nlet engine   // Babylon engine\nlet scene    // Current scene\n\nfunction initEngine () {\n\n  if (babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Engine\"].isSupported()) {\n    // Everything is fine, let's start Babylon\n\n    canvas = document.querySelector(\"canvas\")\n    engine = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Engine\"](canvas, true)\n    engine.enableOfflineSupport = false\n\n\n    /*\n    ** SCENE PROPERTIES\n    */\n    scene = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"](engine)\n    scene.clearColor = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Color3\"](0.11, 0.21, 0.25)\n\n\n    /*\n    ** ADD SKYBOX\n    */\n\n    if ([ 'dds' ].includes(JS_SETTINGS__WEBPACK_IMPORTED_MODULE_1__[\"data\"].SKYBOX.Pic.split('.').pop())) {\n      // .dds file\n      var hdrTexture = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"CubeTexture\"](JS_SETTINGS__WEBPACK_IMPORTED_MODULE_1__[\"data\"].SKYBOX.Pic, scene);\n      scene.createDefaultSkybox(hdrTexture, true, 10000);\n    } else {\n      // 6 faces cubemap\n      var skybox = babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"MeshBuilder\"].CreateBox(\"skyBox\", { size:1000.0 }, scene)\n      var skyboxMaterial = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"StandardMaterial\"](\"skyBox\", scene)\n      skyboxMaterial.backFaceCulling = false\n      skyboxMaterial.reflectionTexture = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"CubeTexture\"](JS_SETTINGS__WEBPACK_IMPORTED_MODULE_1__[\"data\"].SKYBOX.Pic, scene)\n      skyboxMaterial.reflectionTexture.coordinatesMode = babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Texture\"].SKYBOX_MODE\n      skyboxMaterial.diffuseColor = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Color3\"](0, 0, 0)\n      skyboxMaterial.specularColor = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Color3\"](0, 0, 0)\n      skybox.material = skyboxMaterial;\n\n      // Nights & Days\n      skybox.rotation = JS_SETTINGS__WEBPACK_IMPORTED_MODULE_1__[\"data\"].SKYBOX.RotationStart.clone()\n\n      setInterval(() =>\n          skybox.rotation = skybox.rotation.subtract(JS_SETTINGS__WEBPACK_IMPORTED_MODULE_1__[\"data\"].SKYBOX.RotationStep),\n          JS_SETTINGS__WEBPACK_IMPORTED_MODULE_1__[\"data\"].SKYBOX.IntervalTimeout)\n    }\n\n\n    //scene.workerCollisions = true\n\n    // Set physics engine\n    let gravityVector = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, -9.81, -5)\n    //let physicsPlugin = new BABYLON.CannonJSPlugin()\n    let physicsPlugin = new babylonjs__WEBPACK_IMPORTED_MODULE_0__[\"OimoJSPlugin\"]()\n\n    scene.enablePhysics(gravityVector, physicsPlugin)\n\n\n    // Handle resize event (try without it)\n    window.addEventListener(\"resize\", () => engine.resize())\n\n    // Tell to the game, it is time to start\n    canvas.dispatchEvent(new Event(\"engineLoaded\"))\n\n  } else {\n\n    // Make the player disappointed, browser copycat\n    document.write(\"<h1>I'm afraid your Browser is not supported.</h1>\")\n    canvas = engine = scene = null\n  }\n}\n\n// Wait until the page is loaded\ndocument.addEventListener(\"DOMContentLoaded\", initEngine, false)\n\n\n//# sourceURL=webpack:///./src/js/engine/engine.js?");

/***/ }),

/***/ "./src/js/intro.js":
/*!*************************!*\
  !*** ./src/js/intro.js ***!
  \*************************/
/*! exports provided: playIntro, stopIntro */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"playIntro\", function() { return playIntro; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"stopIntro\", function() { return stopIntro; });\nlet hud = document.querySelector(\"#hud\")\n\nfunction playIntro () {\n  hud.querySelector('.fullScreenBtn').style.display = \"none\"\n  hud.querySelector('.intro').style.display = \"block\"\n}\n\nfunction stopIntro () {\n  hud.querySelector('.intro').style.display = \"none\"\n  hud.querySelector('.fullScreenBtn').style.display = \"block\"\n}\n\n\n//# sourceURL=webpack:///./src/js/intro.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ \"./src/scss/main.scss\");\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var Engine_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Engine/engine */ \"./src/js/engine/engine.js\");\n/* harmony import */ var Scene_camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Scene/camera */ \"./src/js/scene/camera.js\");\n/* harmony import */ var Scene_light__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Scene/light */ \"./src/js/scene/light.js\");\n/* harmony import */ var Objects_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! Objects/environment */ \"./src/js/objects/environment.js\");\n/* harmony import */ var Objects_player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! Objects/player */ \"./src/js/objects/player.js\");\n/* harmony import */ var Classes_CharacterController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! Classes/CharacterController */ \"./src/js/classes/CharacterController.js\");\n/* harmony import */ var Classes_SphereSeeder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! Classes/SphereSeeder */ \"./src/js/classes/SphereSeeder.js\");\n/* harmony import */ var Engine_debug__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! Engine/debug */ \"./src/js/engine/debug.js\");\n/* harmony import */ var Engine_assets__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! Engine/assets */ \"./src/js/engine/assets.js\");\n/* harmony import */ var _SETTINGS__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SETTINGS */ \"./src/js/SETTINGS.js\");\n/* harmony import */ var _intro__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./intro */ \"./src/js/intro.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction createButton(context, func) {\n    var button = document.createElement(\"input\");\n    button.type = \"button\";\n    button.value = \"Full Screen\";\n    button.onclick = func;\n    button.setAttribute(\"class\", \"btn br fullScreenBtn\")\n    context.appendChild(button);\n}\n\n\nlet isFullScreen = false\nfunction switchFullscreen () {\n  if (!isFullScreen) {\n      BABYLON.Tools.RequestFullscreen(Engine_engine__WEBPACK_IMPORTED_MODULE_1__[\"canvas\"])\n  } else {\n      BABYLON.Tools.ExitFullscreen()\n  }\n}\n\nfunction startUp () {\n  let hud = document.querySelector(\"#hud\")\n\n  createButton(hud, switchFullscreen )\n\n  // Create basic objects\n  Object(Scene_camera__WEBPACK_IMPORTED_MODULE_2__[\"createCamera\"])()\n  Object(Scene_light__WEBPACK_IMPORTED_MODULE_3__[\"createLight\"])()\n\n  // Game loop\n  Engine_engine__WEBPACK_IMPORTED_MODULE_1__[\"engine\"].runRenderLoop(() => {\n    Engine_engine__WEBPACK_IMPORTED_MODULE_1__[\"scene\"].render()\n  })\n\n  if (true) {\n    let msg = document.createElement(\"div\")\n    msg.setAttribute(\"class\", \"devBuild\")\n    msg.innerText = \"Dev build.\"\n    hud.appendChild(msg)\n\n    if (_SETTINGS__WEBPACK_IMPORTED_MODULE_10__[\"data\"].showDebug) Object(Engine_debug__WEBPACK_IMPORTED_MODULE_8__[\"initDebug\"])()\n  }\n\n  // Start intro\n  Object(_intro__WEBPACK_IMPORTED_MODULE_11__[\"playIntro\"])()\n}\n\n\nfunction startGame () {\n  Object(_intro__WEBPACK_IMPORTED_MODULE_11__[\"stopIntro\"])();\n\n  Object(Objects_environment__WEBPACK_IMPORTED_MODULE_4__[\"createEnvironment\"])()\n  Object(Objects_player__WEBPACK_IMPORTED_MODULE_5__[\"createPlayer\"])()\n  Object(Classes_SphereSeeder__WEBPACK_IMPORTED_MODULE_7__[\"initPool\"])()\n  let cc = new Classes_CharacterController__WEBPACK_IMPORTED_MODULE_6__[\"default\"](Objects_player__WEBPACK_IMPORTED_MODULE_5__[\"player\"], Engine_engine__WEBPACK_IMPORTED_MODULE_1__[\"scene\"])\n\n  setTimeout(() => {\n    Object(Classes_SphereSeeder__WEBPACK_IMPORTED_MODULE_7__[\"throwSpheres\"])(),\n    setInterval(() => Object(Classes_SphereSeeder__WEBPACK_IMPORTED_MODULE_7__[\"throwSpheres\"])(), 5000)\n  }, 2000)\n}\n\n\n\n\n// Booting listeners\nlet listinerOpt = { capture: false, once: true },\n    canvasEl = document.querySelector(\"canvas\")\ncanvasEl.addEventListener(\"engineLoaded\", Engine_assets__WEBPACK_IMPORTED_MODULE_9__[\"initAssetManager\"], listinerOpt)\ncanvasEl.addEventListener(\"assetsLoaded\", startUp, listinerOpt)\ncanvasEl.addEventListener(\"introDone\", startGame, { capture: false })\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ }),

/***/ "./src/js/objects/environment.js":
/*!***************************************!*\
  !*** ./src/js/objects/environment.js ***!
  \***************************************/
/*! exports provided: ground, createEnvironment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ground\", function() { return ground; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createEnvironment\", function() { return createEnvironment; });\n/* harmony import */ var Engine_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Engine/engine */ \"./src/js/engine/engine.js\");\n/* harmony import */ var Engine_debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Engine/debug */ \"./src/js/engine/debug.js\");\n/* harmony import */ var JS_SETTINGS__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! JS/SETTINGS */ \"./src/js/SETTINGS.js\");\n\n\n\n\nconst times = x => f => {\n  if (x > 0) {\n    f()\n    times (x - 1) (f)\n  }\n}\n\n\nlet ground = null\n\nfunction createEnvironment () {\n  createGround()\n  //createObtacles()\n  //createFinishLines()\n  createBizbaszs()\n}\n\nfunction createGround () {\n  // Create Material\n  let gMat = new BABYLON.StandardMaterial('groundmat', Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n\n  // Create Texture\n  let gTxt = new BABYLON.Texture(JS_SETTINGS__WEBPACK_IMPORTED_MODULE_2__[\"data\"].TXT.Ground, Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n  gTxt.vScale = 1.2\n  gMat.diffuseTexture = gTxt\n\n  // Create Mesh\n  ground = BABYLON.MeshBuilder.CreateGround(\"ground\", { width: 30, height: 50 }, Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n  ground.material = gMat\n  ground.position = new BABYLON.Vector3(0.5, 0, 12.28)\n  ground.receiveShadows = true\n\n  // Add Physics\n  ground.physicsImpostor = new BABYLON.PhysicsImpostor(\n          ground, BABYLON.PhysicsImpostor.BoxImpostor,\n          { mass: 0, restitution: 0.3 }, Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n\n  // Add Gizmo\n  Engine_debug__WEBPACK_IMPORTED_MODULE_1__[\"gizmoMeshes\"].push(ground)\n}\n\nfunction createFinishLines () {\n\n  let boxMaterial = new BABYLON.StandardMaterial(\"BoxMat\", Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n  boxMaterial.diffuseTexture = new BABYLON.Texture(\"textures/wood.png\", Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n  boxMaterial.bumpTexture = new BABYLON.Texture(\"textures/wood-normal-map.png\", Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n  boxMaterial.specularColor = BABYLON.Color3.Black()\n  boxMaterial.emissiveColor = BABYLON.Color3.Black()\n  boxMaterial.ambientColor = BABYLON.Color3.Black()\n\n  for (let i = 0; i < 5; i++) {\n    let box1 = BABYLON.MeshBuilder.CreateBox(\"box1\", { height: 0.3, width: 0.3, depth: 5 }, Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n    box1.material = boxMaterial\n    box1.position = new BABYLON.Vector3(i * 2.2 - 3.9, 0, 5)\n    /* box1.rotationQuaternion = box.rotationQuaternion\n    box1.position = box.position.clone()\n    box1.position.x += i * 1\n    box1.position.z += i * 8 */\n    //box1.scaling = box.scaling\n    box1.physicsImpostor = new BABYLON.PhysicsImpostor(\n      box1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n    //gizmoMeshes.push(box1)\n  }\n}\n\nfunction createBizbaszs () {\n  const minX = -3.5\n  const maxX = 4.5\n  const minZ = 10.0\n  const maxZ = 25.0\n\n  times (10) (() => {\n    let x = (Math.random() * (maxX - minX) + minX).toFixed(4)\n    let z = (Math.random() * (maxZ - minZ) + minZ).toFixed(4)\n    let height = (Math.random() * (2 - 0.5) + 0.5).toFixed(4)\n    let diameter = (Math.random() * (2 - 0.5) + 0.5).toFixed(4)\n\n    let mat = new BABYLON.StandardMaterial(\"BizMat\", Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n    mat.diffuseColor = BABYLON.Color3.Random()\n\n    let obj1 = BABYLON.MeshBuilder.CreateCylinder(\"cil1\", { height, diameter }, Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n    obj1.material = mat\n    obj1.position = new BABYLON.Vector3(x, 0, z)\n    obj1.physicsImpostor = new BABYLON.PhysicsImpostor(\n      obj1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5 }, Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n  })\n}\n\nfunction createObtacles () {\n\n  let boxes = [\n    {\n      rotationQuaternion: new BABYLON.Quaternion(0, 0.64, 0, 0.77),\n      position: new BABYLON.Vector3(-2.80, 0, 6.49),\n      scaling: new BABYLON.Vector3(2.82, 1, 1.20)\n    }, {\n      rotationQuaternion: new BABYLON.Quaternion(0, -0.65, 0, 0.76),\n      position: new BABYLON.Vector3(0.84, 0, 6.91),\n      scaling: new BABYLON.Vector3(2.93, 1, 1.20)\n    }, {\n      rotationQuaternion: new BABYLON.Quaternion(0, -0.69, 0, 0.73),\n      position: new BABYLON.Vector3(2.92, 0, 6.34),\n      scaling: new BABYLON.Vector3(0.68, 0.5, 0.53)\n    }\n  ]\n\n  // Create material\n  let boxTexture = new BABYLON.Texture(\"textures/wood.png\", Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n  //boxTexture.uScale = 5\n  //boxTexture.vScale = 5\n\n  let boxMaterial = new BABYLON.StandardMaterial(\"BoxMat\", Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n  boxMaterial.diffuseTexture = boxTexture\n  boxMaterial.bumpTexture = new BABYLON.Texture(\"textures/wood-normal-map.png\", Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n  boxMaterial.specularColor = BABYLON.Color3.Black()\n  boxMaterial.emissiveColor = BABYLON.Color3.Black()\n  boxMaterial.ambientColor = BABYLON.Color3.Black()\n\n  for (let i = 0; i < 3; i++) {\n    boxes.forEach(box => {\n      let box1 = BABYLON.MeshBuilder.CreateBox(\"box1\", { height: 1, width: 2, depth: 0.5 }, Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n      box1.material = boxMaterial\n      box1.rotationQuaternion = box.rotationQuaternion\n      box1.position = box.position.clone()\n      box1.position.x += i * 1\n      box1.position.z += i * 8\n      box1.scaling = box.scaling\n      box1.physicsImpostor = new BABYLON.PhysicsImpostor(box1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n      Engine_debug__WEBPACK_IMPORTED_MODULE_1__[\"gizmoMeshes\"].push(box1)\n    })\n  }\n}\n\nfunction createFence () {\n\n  // Create fence\n  /* let height = 1\n\n  let fenceMat = new BABYLON.StandardMaterial('groundmat', scene)\n  fenceMat.diffuseColor = BABYLON.Color3.Blue()\n\n  let fence1 = BABYLON.MeshBuilder.CreateBox(\"Fence\", { width: ground._width, height, depth: 0.1 }, scene)\n  fence1.material = fenceMat\n  fence1.position = new BABYLON.Vector3(0.5, 0, (ground.position.z + ground._height / 2))\n\n  let fence2 = BABYLON.MeshBuilder.CreateBox(\"Fence\", { width: 0.1, height, depth: ground._height }, scene)\n  fence2.material = fenceMat\n  fence2.position = new BABYLON.Vector3(ground._width / 2 + 0.5, 0, ground._height / 2 - 1.6)\n  fence2.physicsImpostor = new BABYLON.PhysicsImpostor(fence2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene)\n\n  let fence3 = BABYLON.MeshBuilder.CreateBox(\"Fence\", { width: ground._width, height, depth: 0.1 }, scene)\n  fence3.material = fenceMat\n  fence3.position = new BABYLON.Vector3(0.5, 0, (ground.position.z - ground._height / 2))\n\n  let fence4 = BABYLON.MeshBuilder.CreateBox(\"Fence\", { width: 0.1, height, depth: ground._height }, scene)\n  fence4.material = fenceMat\n  fence4.position = new BABYLON.Vector3(-ground._width / 2 + 0.5, 0, ground._height / 2 - 1.6)\n  fence4.physicsImpostor = new BABYLON.PhysicsImpostor(fence4, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene) */\n\n  //gizmoMeshes.push(fence1, fence2, fence3, fence4)\n}\n\n\n//# sourceURL=webpack:///./src/js/objects/environment.js?");

/***/ }),

/***/ "./src/js/objects/player.js":
/*!**********************************!*\
  !*** ./src/js/objects/player.js ***!
  \**********************************/
/*! exports provided: player, createPlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"player\", function() { return player; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createPlayer\", function() { return createPlayer; });\n/* harmony import */ var Engine_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Engine/engine */ \"./src/js/engine/engine.js\");\n/* harmony import */ var Scene_light__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Scene/light */ \"./src/js/scene/light.js\");\n/* harmony import */ var Scene_camera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Scene/camera */ \"./src/js/scene/camera.js\");\n\n\n\n\nlet player = null\n\nfunction createPlayer () {\n\n  let playerMaterial = new BABYLON.StandardMaterial('playermat', Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"]);\n  playerMaterial.diffuseColor = new BABYLON.Color3(0.36, 0.37, 0.34)\n  //playerMaterial.alpha = 0.8\n\n  player = BABYLON.MeshBuilder.CreateBox(\n    \"player\",\n    {\n      width: 1,\n      height: 1,\n      depth: 1,\n      //updatable: true\n    },\n    Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n  player.material = playerMaterial\n  player.position.y = 0.5\n  player.isPickable = false // no hit myself with ray(cast)\n\n  Scene_light__WEBPACK_IMPORTED_MODULE_1__[\"shadowGenerator\"].getShadowMap().renderList.push(player)\n\n  //console.log(shadowGenerator.getShadowMap().renderList)\n\n  Scene_camera__WEBPACK_IMPORTED_MODULE_2__[\"camera\"].lockedTarget = player\n}\n\n\n//# sourceURL=webpack:///./src/js/objects/player.js?");

/***/ }),

/***/ "./src/js/scene/camera.js":
/*!********************************!*\
  !*** ./src/js/scene/camera.js ***!
  \********************************/
/*! exports provided: camera, createCamera */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"camera\", function() { return camera; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createCamera\", function() { return createCamera; });\n/* harmony import */ var Engine_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Engine/engine */ \"./src/js/engine/engine.js\");\n\n\nlet camera = null\n\nfunction createCamera () {\n  createArcCamera()\n  //createFollowCamera()\n\n  //new BABYLON.BlackAndWhitePostProcess(\"bandw\", 1.0, camera) // black&white\n\n  /* var kernel = 32.0;\n  var postProcess0 = new BABYLON.BlurPostProcess(\"Horizontal blur\", new BABYLON.Vector2(1.0, 0), kernel, 1.0, camera);\n  var postProcess1 = new BABYLON.BlurPostProcess(\"Vertical blur\", new BABYLON.Vector2(0, 1.0), kernel, 1.0, camera); */\n\n  var postProcess = new BABYLON.ImageProcessingPostProcess(\"processing\", 1.0, camera);\n  postProcess.vignetteWeight = 10;\n  postProcess.vignetteStretch = 2;\n  postProcess.vignetteColor = new BABYLON.Color4(0, 0.3, 0, 0);\n  postProcess.vignetteEnabled = true;\n\n  /* var postProcess = new BABYLON.ImageProcessingPostProcess(\"processing\", 1.0, camera);\n  postProcess.exposure = 0.2 */\n}\n\nfunction createFollowCamera () {\n  camera = new BABYLON.FollowCamera(\n    \"Camera\",\n    new BABYLON.Vector3(0, 10, -10),\n    Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n\n  camera.radius = 10\n  camera.heightOffset = 10\n  camera.rotationOffset = 180\n  camera.cameraAcceleration = 0.001\n  camera.maxCameraSpeed = 10\n}\n\nfunction createArcCamera () {\n  camera = new BABYLON.ArcRotateCamera(\n    \"Camera\",\n    -Math.PI / 2,\n    Math.PI / 8,\n    50, //15,\n    new BABYLON.Vector3(0, 0, 3),\n    Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n  camera.attachControl(Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"canvas\"], true)\n}\n\n\n//# sourceURL=webpack:///./src/js/scene/camera.js?");

/***/ }),

/***/ "./src/js/scene/light.js":
/*!*******************************!*\
  !*** ./src/js/scene/light.js ***!
  \*******************************/
/*! exports provided: light, shadowGenerator, createLight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"light\", function() { return light; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"shadowGenerator\", function() { return shadowGenerator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createLight\", function() { return createLight; });\n/* harmony import */ var Engine_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Engine/engine */ \"./src/js/engine/engine.js\");\n\n\nlet light = null\nlet shadowGenerator = null\n\nfunction createLight () {\n  /* light = new BABYLON.PointLight(\n                \"light\",\n                new BABYLON.Vector3(0, 5, -5),\n                scene) */\n  light = new BABYLON.DirectionalLight(\"DirectionalLight\", new BABYLON.Vector3(0.3, -1, 0.1), Engine_engine__WEBPACK_IMPORTED_MODULE_0__[\"scene\"])\n  light.diffuse = new BABYLON.Color3(0.8, 0.8, 0.8);\n  //light.specular = new BABYLON.Color3(0, 1, 0);\n\n  light.intensity = 0.9\n  light.position = new BABYLON.Vector3(0, 10, 10)\n\n  shadowGenerator = new BABYLON.ShadowGenerator(1024, light)\n  shadowGenerator.setTransparencyShadow(true)\n\n  shadowGenerator.bias = 0.00001;\n  shadowGenerator.normalBias = 0.01\n\n  shadowGenerator.setDarkness(0.4)\n\n}\n\n\n//# sourceURL=webpack:///./src/js/scene/light.js?");

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./main.scss */ \"./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/scss/main.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/scss/main.scss?");

/***/ })

/******/ });