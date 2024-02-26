//Elemente aus dem DOM holen

//3D Elemente
const ambienceSound = document.getElementById("ambienceSound");
const successSound = document.getElementById("successSound");
const scene = document.getElementById("scene");
const Vorhang1 = document.getElementById("Vorhang1");
const Vorhang2 = document.getElementById("Vorhang2");
const Vorhang3 = document.getElementById("Vorhang3");
const Vorhang4 = document.getElementById("Vorhang4");
const vorhang1ClickCollider = document.getElementById("vorhang1ClickCollider");
const vorhang2ClickCollider = document.getElementById("vorhang2ClickCollider");
const vorhang3ClickCollider = document.getElementById("vorhang3ClickCollider");
const vorhang4ClickCollider = document.getElementById("vorhang4ClickCollider");
const ghost3D = document.getElementById("ghost3D");
const robot3D = document.getElementById("robot3D");
const krabbe3D = document.getElementById("grab3D");
const dinosaur3D = document.getElementById("dinosaur3D");
const ghostParent = document.getElementById("ghostParent");

//DOM Elemente
const introDOM = document.getElementById("introDOM");
const creditDOM = document.getElementById("creditDOM");
const sceneDOM = document.getElementById("overlay");
const startButton = document.getElementById("startButton");
const loadingNotice = document.getElementById("loadingNotice");
const dialogBox = document.getElementById("dialogBox");
const sceneDOMButton = document.getElementById("sceneDOMButton")
const theBigDOM = document.getElementById("theBigDOM");
const korrekteVersucheDOM = document.getElementById("korrekteVersucheDOM");
const fehlVersucheDOM = document.getElementById("fehlVersucheDOM");
const trophy1 = document.getElementById("trophy1");
const trophy2 = document.getElementById("trophy2");
const trophy3 = document.getElementById("trophy3");
const cross1 = document.getElementById("cross1");
const cross2 = document.getElementById("cross2");
const cross3 = document.getElementById("cross3");
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
let soundInteration = 0;
const ghostSoundMemory = ["#ghostSound1", "#ghostSound2", "#ghostSound3"];
const trophys = [trophy1, trophy2, trophy3];
const crosses = [cross1, cross2, cross3];

//Ladeprozess abwarten
scene.addEventListener("loaded", () => {
  loadingNotice.style.display = "none";
  startButton.style.display = "block";
});

// Intro
startButton.onclick = () => {
  introDOM.remove();
  ambienceSound.play();
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
  }, 19500);
};

sceneDOM.style.visibility = "none";

//Funktionen
const toggleCredits = () => {
  if (!creditDOM.style.display) creditDOM.style.display = "flex";
  else {
    creditDOM.style.display = null;
  }
};

const playGhostSound = () => {
  ghost3D.setAttribute(
    "sound",
    "src: " + ghostSoundMemory[soundInteration] + "; loop: true;"
  );
    ghost3D.components.sound.playSound();
    soundInteration++;
    console.log("Play Ghost Sound")
};

const loadGhostSound = () => {

};

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
  trophys[korrektGeraten].setAttribute("src", "src/img/trophy.png");
  korrektGeraten++;
  SchreibeDialog("Du hast mich gefunden. Klasse gemacht!");
};

const Fehlversuch = () => {
  crosses[falschGeraten].src = "src/img/red-cross.png";
  falschGeraten++;
  SchreibeDialog(
    "Du hast den falschen Vorhang erwischt. Höre noch mal genauer hin!"
  );
};

const deaktiviereVorhaenge = () => {
  vorhang1ClickCollider.classList.remove("collidable");
  vorhang2ClickCollider.classList.remove("collidable");
  vorhang3ClickCollider.classList.remove("collidable");
  vorhang4ClickCollider.classList.remove("collidable");
};

const aktiviereVorhaenge = () => {
  vorhang1ClickCollider.classList.add("collidable");
  vorhang2ClickCollider.classList.add("collidable");
  vorhang3ClickCollider.classList.add("collidable");
  vorhang4ClickCollider.classList.add("collidable");
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
      KorrekterVersuch();
      checkGameState();
      ghost3D.components.sound.stopSound();
      successSound.play();
      ghost3D.setAttribute(
        "animation__position",
        "property: position; to: 0 1 -1.5; easing: easeInOutQuad; dur: 5000;"
      );
    }, 5000);
    setTimeout(() => {
      VorhangSchließen(this);
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
  ambienceSound.pause();
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
vorhang1ClickCollider.onclick = VorhangHandler.bind(Vorhang1);
vorhang2ClickCollider.onclick = VorhangHandler.bind(Vorhang2);
vorhang3ClickCollider.onclick = VorhangHandler.bind(Vorhang3);
vorhang4ClickCollider.onclick = VorhangHandler.bind(Vorhang4);
