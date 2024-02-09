//Elemente aus dem DOM holen
const introDOM = document.getElementById("introDOM");
const sceneDOM = document.getElementById("overlay");
const scene = document.getElementById("scene");
const startButton = document.getElementById("startButton");
const Vorhang1 = document.getElementById("Vorhang1");
const Vorhang2 = document.getElementById("Vorhang2");
const Vorhang3 = document.getElementById("Vorhang3");
const Vorhang4 = document.getElementById("Vorhang4");
const soundBall = document.getElementById("soundBall");
const ghost3D = document.getElementById("ghost3D");
const ghostParent = document.getElementById("ghostParent")
const pianoSound = document.getElementById("pianoSound");
const dialogBox = document.getElementById("dialogBox");
const theBigDOM = document.getElementById("theBigDOM");

//Variablen in Anwendung
const Vorhaenge = [Vorhang1, Vorhang2, Vorhang3, Vorhang4];
let vorhangMitSound = "Vorhang2";
const placesGhost = [
  {
    name: "Start",
    position: "0 1 -1.5"
  },
  {
    name: "Versteck1",
    position: "0 1 -4"
  }
];

const rotationsGhostParent = [-540, -450, -360, -270, -180, -90, 0, 90, 180, 270, 360, 450, 540]

// Intro
startButton.onclick = () => {
  introDOM.remove();
  sceneDOM.style.visibility = "flex";
  ghost3D.components.sound.playSound();
  SchreibeDialog(
    "Hallo Besucher, <br> hinter einem der Vorhänge ist ein Sound versteckt. Können Sie ihn finden?"
  );
  setTimeout(() => {
    SchreibeDialog(
      "Klicken Sie auf den Vorhang hinter dem sich der Sound befindet"
    );
  }, 7000);
};

sceneDOM.style.visibility = "none";

// 3D Anwendung


//Funktionen
const VorhangSchließen = (vorhangName) => {
  vorhangName.setAttribute("animation-mixer", {
    clip: "VorhangZu",
    loop: "once",
    clampWhenFinished: true,
  });
};

function VorhangOeffnen(vorhangName) {
  vorhangName.setAttribute("animation-mixer", {
    clip: "VorhangAuf",
    loop: "once",
    clampWhenFinished: true,
  });
}

const SchreibeDialog = (dialogtext) => (dialogBox.innerHTML = dialogtext);

function VorhangHandler() {
  if (this.id === vorhangMitSound) {
    SchreibeDialog("");
    VorhangOeffnen(this);
    setTimeout(() => {
      SchreibeDialog("Sie haben den Sound gefunden, Glückwunsch!");
    }, 5000);
    setTimeout(() => {
      ghost3D.setAttribute(
        "animation",
        "property: position; to: -1 0.3 0; easing: easeInOutQuad; dur: 7000;"
      );
    }, 5000);
    setTimeout(() => {
      ghost3D.setAttribute("visible", "true");
    }, 5000);
  } else {
    SchreibeDialog("");
    VorhangOeffnen(this);
    setTimeout(() => {
      SchreibeDialog(
        "Das war leider falsch! Hören Sie genau hin und finden Die den richtigen Vorhang"
      );
    }, 10000);
    setTimeout(() => {
      VorhangSchließen(this);
    }, 11000);
  }
}

function hideGhost() {
  let randomRotation = rotationsGhostParent[Math.floor(Math.random()*rotationsGhostParent.length)]
  ghost3D.object3D.visible = false
  ghost3D.setAttribute("animation__position", "property: position; to: 0 1 -4; easing: easeInOutQuad; dur: 7000");
  ghostParent.setAttribute("animation__rotation", "property: rotation; to: 0 " + randomRotation*3 + " 0 ; easing: easeInOutQuad; dur: 7000");
  setTimeout(() => {
    ghost3D.object3D.visible = true
  }, 7000)
}

//Events
Vorhang1.onclick = VorhangHandler.bind(Vorhang1);
Vorhang2.onclick = VorhangHandler.bind(Vorhang2);
Vorhang3.onclick = VorhangHandler.bind(Vorhang3);
Vorhang4.onclick = VorhangHandler.bind(Vorhang4);

//Ausführungslogik

setTimeout(() => {
  hideGhost();
}, 3000);
