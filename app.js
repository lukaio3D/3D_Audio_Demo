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

//Elemente aus dem DOM holen
const Vorhang1 = document.getElementById("Vorhang1");
const Vorhang2 = document.getElementById("Vorhang2");
const Vorhang3 = document.getElementById("Vorhang3");
const Vorhang4 = document.getElementById("Vorhang4");
const Vorhaenge = [Vorhang1, Vorhang2, Vorhang3, Vorhang4];
const soundBall = document.getElementById("soundBall");
const keyboard3D = document.getElementById("Keyboard3D");
const dialogBox = document.getElementById("dialogBox");

const soundComponent = keyboard3D.getAttribute("sound__birdwhistle3d");

const SchreibeDialog = (dialogtext) => (dialogBox.innerHTML = dialogtext);

const WelcomeUser = () => {
  SchreibeDialog(
    "Hallo Besucher, <br> hinter einem der Vorhänge ist ein Sound versteckt. Können Sie ihn finden?"
  );
  setTimeout(() => {
    keyboard3D.components.sound__birdwhistle3d.playSound();
  }, 3000);

  setTimeout(() => {
    SchreibeDialog(
      "Klicken Sie auf den Vorhang hinter dem sich der Sound befindet"
    );
  }, 7000);
};

const VorhangHandler = () => {};

//Ausführungslogik
WelcomeUser();

Vorhang1.onclick = () => {
  SchreibeDialog("");
  VorhangOeffnen(Vorhang1);
  setTimeout(() => {
    SchreibeDialog(
      "Das war leider falsch! Hören Sie genau hin und finden Die den richtigen Vorhang"
    );
  }, 10000);
  setTimeout(() => {
    VorhangSchließen(Vorhang1);
  }, 11000);
};

Vorhang4.onclick = () => {
  SchreibeDialog("");
  VorhangOeffnen(Vorhang4);
  setTimeout(() => {
    SchreibeDialog(
      "Das war leider falsch! Hören Sie genau hin und finden Die den richtigen Vorhang"
    );
  }, 10000);
  setTimeout(() => {
    VorhangSchließen(Vorhang4);
  }, 11000);
};

Vorhang3.onclick = () => {
  SchreibeDialog("");
  VorhangOeffnen(Vorhang3);
  setTimeout(() => {
    SchreibeDialog(
      "Das war leider falsch! Hören Sie genau hin und finden Die den richtigen Vorhang"
    );
  }, 10000);
  setTimeout(() => {
    VorhangSchließen(Vorhang3);
  }, 11000);
};

Vorhang2.onclick = () => {
  SchreibeDialog("");
  VorhangOeffnen(Vorhang2);
  setTimeout(() => {
    SchreibeDialog("Sie haben den Sound gefunden, Glückwunsch!");
  }, 5000);
  setTimeout(() => {
    keyboard3D.setAttribute(
      "animation",
      "property: position; to: -1 0.3 0; easing: easeInOutQuad; dur: 7000;"
    );
  }, 5000);
};
