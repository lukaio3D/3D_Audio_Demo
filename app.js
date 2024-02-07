// Intro 
const introDOM = document.getElementById("introDOM")
const sceneDOM = document.getElementById("sceneDOM")
const startButton = document.getElementById("startButton")

startButton.onclick = () => {
  introDOM.remove()
  sceneDOM.style.visibility = "block"
  keyboard3D.components.sound.playSound()
}

// 3D Anwendung

//Elemente aus dem DOM holen
const Vorhang1 = document.getElementById("Vorhang1");
const Vorhang2 = document.getElementById("Vorhang2");
const Vorhang3 = document.getElementById("Vorhang3");
const Vorhang4 = document.getElementById("Vorhang4");
const soundBall = document.getElementById("soundBall");
const keyboard3D = document.getElementById("Keyboard3D");
const pianoSound = document.getElementById("pianoSound");
const dialogBox = document.getElementById("dialogBox");
const theBigDOM = document.getElementById("theBigDOM");

//Variablen in Anwendung
const Vorhaenge = [Vorhang1, Vorhang2, Vorhang3, Vorhang4];
let vorhangMitSound = "Vorhang2";

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
      keyboard3D.setAttribute(
        "animation",
        "property: position; to: -1 0.3 0; easing: easeInOutQuad; dur: 7000;"
      );
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

//Events
Vorhang1.onclick = VorhangHandler.bind(Vorhang1);
Vorhang2.onclick = VorhangHandler.bind(Vorhang2);
Vorhang3.onclick = VorhangHandler.bind(Vorhang3);
Vorhang4.onclick = VorhangHandler.bind(Vorhang4);

//Ausführungslogik
SchreibeDialog(
  "Hallo Besucher, <br> hinter einem der Vorhänge ist ein Sound versteckt. Können Sie ihn finden?"
);
setTimeout(() => {
  SchreibeDialog(
    "Klicken Sie auf den Vorhang hinter dem sich der Sound befindet"
  );
}, 7000);
