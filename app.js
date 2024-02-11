//Elemente aus dem DOM holen

//3D Elemente
const scene = document.getElementById("scene");
const Vorhang1 = document.getElementById("Vorhang1");
const Vorhang2 = document.getElementById("Vorhang2");
const Vorhang3 = document.getElementById("Vorhang3");
const Vorhang4 = document.getElementById("Vorhang4");
const soundBall = document.getElementById("soundBall");
const ghost3D = document.getElementById("ghost3D");
const ghostParent = document.getElementById("ghostParent");
const pianoSound = document.getElementById("pianoSound");

//DOM Elemente
const introDOM = document.getElementById("introDOM");
const sceneDOM = document.getElementById("overlay");
const startButton = document.getElementById("startButton");
const loadingNotice = document.getElementById("loadingNotice");
const dialogBox = document.getElementById("dialogBox");
const theBigDOM = document.getElementById("theBigDOM");
const korrekteVersucheDOM = document.getElementById("korrekteVersucheDOM");
const fehlVersucheDOM = document.getElementById("fehlVersucheDOM");
const winnerDOM = document.getElementById("winnerDOM");
const loserDOM = document.getElementById("loserDOM");

//Variablen in Anwendung
let vorhangMitSound;
let korrektGeraten = 0;
let falschGeraten = 0;
const Vorhaenge = [Vorhang1, Vorhang2, Vorhang3, Vorhang4];
const rotationsGhostParent = [
  -540, -450, -360, -270, -180, -90, 0, 90, 180, 270, 360, 450, 540,
];

//Ladeprozess abwarten
scene.addEventListener("play", () => {
  loadingNotice.style.display = "none"
  startButton.style.display = "block"
  console.log("Scene has loaded")
})

// Intro
startButton.onclick = () => {
  introDOM.remove();
  sceneDOM.style.visibility = "flex";
  ghost3D.components.sound.playSound();
  SchreibeDialog(
    "Hallo Besucher, <br> hinter einem der Vorhänge ist ein Sound versteckt. Können Sie ihn finden?"
  );
  setTimeout(() => {
    hideGhost();
  }, 3000);
};

sceneDOM.style.visibility = "none";

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

const KorrekterVersuch = () => {
  korrektGeraten++;
  checkGameState();
  korrekteVersucheDOM.innerHTML = "Richtig geraten: " + korrektGeraten;
  SchreibeDialog("Sie haben den Sound gefunden, Glückwunsch!");
};

const Fehlversuch = () => {
  falschGeraten++;
  checkGameState();
  fehlVersucheDOM.innerHTML = "Falsch geraten: " + falschGeraten;
  SchreibeDialog(
    "Das war leider falsch! Hören Sie genau hin und finden Sie den richtigen Vorhang"
  );
};

const deaktiviereVorhaenge = () => {
  Vorhang1.classList.remove("collidable");
  Vorhang2.classList.remove("collidable");
  Vorhang3.classList.remove("collidable");
  Vorhang4.classList.remove("collidable");
};

const aktiviereVorhaenge = () => {
  Vorhang1.classList.add("collidable");
  Vorhang2.classList.add("collidable");
  Vorhang3.classList.add("collidable");
  Vorhang4.classList.add("collidable");
};

function VorhangHandler() {
  //Richtiger Vorhang gewählt
  if (this.id === vorhangMitSound) {
    deaktiviereVorhaenge();
    SchreibeDialog("");
    VorhangOeffnen(this);
    setTimeout(() => {
      ghost3D.setAttribute(
        "animation__position",
        "property: position; to: 0 1 -1.5; easing: easeInOutQuad; dur: 5000;"
      );
    }, 5000);
    setTimeout(() => {
      VorhangSchließen(this);
      KorrekterVersuch();
    }, 11000);
    setTimeout(() => {
      hideGhost();
    }, 15000);
  }
  //falscher Vorhang gewählt
  else {
    deaktiviereVorhaenge();
    SchreibeDialog("");
    VorhangOeffnen(this);
    setTimeout(() => {
      Fehlversuch();
      VorhangSchließen(this);
      aktiviereVorhaenge();
    }, 11000);
  }
}

function hideGhost() {
  let randomRotation =
    rotationsGhostParent[
      Math.floor(Math.random() * rotationsGhostParent.length)
    ];
  switch (randomRotation) {
    case -360:
    case 0:
    case 360:
      vorhangMitSound = Vorhang1.id;
      break;
    case -270:
    case 90:
    case 450:
      vorhangMitSound = Vorhang2.id;
      break;
    case -540:
    case -180:
    case 180:
    case 540:
      vorhangMitSound = Vorhang3.id;
      break;
    case -450:
    case -90:
    case 270:
      vorhangMitSound = Vorhang4.id;
      break;
    default:
      vorhangMitSound = none;
      console.log("Es wurde kein Vorhang als korrekt zugewiesen");
  }
  SchreibeDialog("Der Geist versteckt sich, einen Moment Geduld!");
  ghost3D.object3D.visible = false;
  ghost3D.setAttribute(
    "animation__position",
    "property: position; to: 0 1 -4; easing: easeInOutQuad; dur: 7000"
  );
  ghostParent.setAttribute(
    "animation__rotation",
    "property: rotation; to: 0 " +
      randomRotation +
      " 0 ; easing: easeInOutQuad; dur: 7000"
  );
  setTimeout(() => {
    ghost3D.object3D.visible = true;
    aktiviereVorhaenge();
    SchreibeDialog("Klicke auf den Vorhang hinter dem sich der Geist verbirgt");
  }, 7000);
}

const checkGameState = () => {
  if (korrektGeraten >= 3) {
    winnerDOM.style.display = "flex";
  } else if (falschGeraten >= 3) {
    loserDOM.style.display = "flex";
  }
};

const reloadApp = () => {
  location.reload();
};

//Events
Vorhang1.onclick = VorhangHandler.bind(Vorhang1);
Vorhang2.onclick = VorhangHandler.bind(Vorhang2);
Vorhang3.onclick = VorhangHandler.bind(Vorhang3);
Vorhang4.onclick = VorhangHandler.bind(Vorhang4);
