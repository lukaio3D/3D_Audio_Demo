//Elemente aus dem DOM holen

//3D Elemente
const ambienceSound = document.getElementById("ambienceSound");
const scene = document.getElementById("scene");
const Vorhang1 = document.getElementById("Vorhang1");
const Vorhang2 = document.getElementById("Vorhang2");
const Vorhang3 = document.getElementById("Vorhang3");
const Vorhang4 = document.getElementById("Vorhang4");
const ghost3D = document.getElementById("ghost3D");
const robot3D = document.getElementById("robot3D");
const krabbe3D = document.getElementById("grab3D");
const dinosaur3D = document.getElementById("dinosaur3D");
const ghostParent = document.getElementById("ghostParent");

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
let vorhangMitDino;
let vorhangMitRoboter;
let vorhangMitKrabbe;
let korrektGeraten = 0;
let falschGeraten = 0;
const Vorhaenge = [Vorhang1, Vorhang2, Vorhang3, Vorhang4];
const rotationsGhostParent = [
  -540, -450, -360, -270, -180, -90, 0, 90, 180, 270, 360, 450, 540,
];

//Ladeprozess abwarten
scene.addEventListener("loaded", () => {
  loadingNotice.style.display = "none";
  startButton.style.display = "block";
});

// Intro
startButton.onclick = () => {
  introDOM.remove();
  ambienceSound.play();
  ghost3D.components.sound.playSound();
  sceneDOM.style.visibility = "flex";
  SchreibeDialog(
    "Hallo Besucher, ich mache mich gleich unsichtbar und verstecke mich hinter einem Vorhang."
  );
  setTimeout(() => {
    SchreibeDialog(
      "Du kannst mich hören wenn ich mich im Raum bewege und hinter dem Vorhang verstecke."
    );
  }, 6500);
  setTimeout(() => {
    SchreibeDialog(
      "Rate dreimal mein Versteck richtig und du hast gewonnen. </br> Wenn du dreimal falsch rätst, hast du verloren."
    );
  }, 13000);
  setTimeout(() => {
    hideGhost();
    ambienceSound.pause();
  }, 19500);
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
  korrekteVersucheDOM.innerHTML = "Richtig geraten: " + korrektGeraten;
  SchreibeDialog("Du hast mich gefunden. Klasse gemacht!");
};

const Fehlversuch = () => {
  falschGeraten++;
  fehlVersucheDOM.innerHTML = "Falsch geraten: " + falschGeraten;
  SchreibeDialog(
    "Du hast den falschen Vorhang erwischt. Höre noch mal genauer hin!"
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
  //Vorhang mit Geist gewählt
  if (this.id === vorhangMitSound) {
    ghost3D.object3D.visible = true;
    ghost3D.setAttribute("animation-mixer", "");
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
      checkGameState();
    }, 11000);
    setTimeout(() => {
      hideGhost();
    }, 15000);
  }
  //Vorhang mit Dino gewählt
  else if (this.id === vorhangMitDino) {
    dinosaur3D.setAttribute("animation-mixer", "");
    dinosaur3D.object3D.visible = true;
    deaktiviereVorhaenge();
    SchreibeDialog("");
    VorhangOeffnen(this);
    setTimeout(() => {
      Fehlversuch();
      dinosaur3D.components.sound.playSound();
    }, 3000);
    setTimeout(() => {
      dinosaur3D.components.sound.playSound();
      VorhangSchließen(this);
      aktiviereVorhaenge();
      checkGameState();
    }, 11000);
    setTimeout(() => {
      dinosaur3D.object3D.visible = false;
      dinosaur3D.removeAttribute("animation-mixer");
    }, 20000);
  }
  //Vorhang mit Krabbe gewählt
  else if (this.id === vorhangMitKrabbe) {
    krabbe3D.setAttribute("animation-mixer", "");
    krabbe3D.object3D.visible = true;
    deaktiviereVorhaenge();
    SchreibeDialog("");
    VorhangOeffnen(this);
    setTimeout(() => {
      Fehlversuch();
      krabbe3D.components.sound.playSound();
    }, 3000);
    setTimeout(() => {
      VorhangSchließen(this);
      aktiviereVorhaenge();
      checkGameState();
    }, 11000);
    setTimeout(() => {
      krabbe3D.object3D.visible = false;
      krabbe3D.removeAttribute("animation-mixer");
    }, 20000);
  }
  //Vorhang mit Roboter gewählt
  else if (this.id === vorhangMitRoboter) {
    robot3D.setAttribute("animation-mixer", "");
    robot3D.object3D.visible = true;
    deaktiviereVorhaenge();
    SchreibeDialog("");
    VorhangOeffnen(this);
    setTimeout(() => {
      Fehlversuch();
      robot3D.components.sound.playSound();
    }, 3000);
    setTimeout(() => {
      VorhangSchließen(this);
      aktiviereVorhaenge();
      checkGameState();
    }, 11000);
    setTimeout(() => {
      robot3D.object3D.visible = false;
      robot3D.removeAttribute("animation-mixer");
    }, 20000);
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
      checkGameState();
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
      vorhangMitRoboter = Vorhang2.id;
      vorhangMitDino = Vorhang3.id;
      vorhangMitKrabbe = Vorhang4.id;
      break;
    case -270:
    case 90:
    case 450:
      vorhangMitSound = Vorhang2.id;
      vorhangMitRoboter = Vorhang3.id;
      vorhangMitDino = Vorhang4.id;
      vorhangMitKrabbe = Vorhang1.id;
      break;
    case -540:
    case -180:
    case 180:
    case 540:
      vorhangMitSound = Vorhang3.id;
      vorhangMitRoboter = Vorhang4.id;
      vorhangMitDino = Vorhang1.id;
      vorhangMitKrabbe = Vorhang2.id;
      break;
    case -450:
    case -90:
    case 270:
      vorhangMitSound = Vorhang4.id;
      vorhangMitRoboter = Vorhang1.id;
      vorhangMitDino = Vorhang2.id;
      vorhangMitKrabbe = Vorhang3.id;
      break;
    default:
      vorhangMitSound = none;
      console.log("Es wurde kein Vorhang als korrekt zugewiesen");
  }
  SchreibeDialog("Ich suche mein Versteck, höre genau hin!");
  ghost3D.object3D.visible = false;
  ghost3D.removeAttribute("animation-mixer");
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
    aktiviereVorhaenge();
    SchreibeDialog("Bin versteckt. Mach dich auf die Suche!");
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
