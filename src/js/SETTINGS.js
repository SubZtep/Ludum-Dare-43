export const data = {

  /*
  ** SETTINGS
  */

  showDebug: false,
  showIntro: false,

  /*
  ** SKYBOX
  */

  SKYBOX: {
    IntervalTimeout: 10,
    RotationStart: new BABYLON.Vector3(-3.4, 0, 0),
    //RotationStep: new BABYLON.Vector3(0.01, 0.001, 0),
    RotationStep: BABYLON.Vector3.Zero(),
    Pic: "skybox/sky/skybox"
  },

  /*
  ** TEXTURES
  */

  TXT: {
    Ground: "textures/bg_scan_starlin_512x512.jpg",

    Sphere: "textures/stone.png",
    SphereNormal: "textures/stone-normal-map.png",
  },
}
