let hud = document.querySelector("#hud")

export function playIntro () {
  hud.querySelector('.fullScreenBtn').style.display = "none"
  hud.querySelector('.intro').style.display = "block"
}

export function stopIntro () {
  hud.querySelector('.intro').style.display = "none"
  hud.querySelector('.fullScreenBtn').style.display = "block"
}
