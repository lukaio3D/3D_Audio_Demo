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

const Vorhang1 = document.getElementById("Vorhang1");
const Vorhang2 = document.getElementById("Vorhang2");
const Vorhang3 = document.getElementById("Vorhang3");
const Vorhang4 = document.getElementById("Vorhang4");
const Vorhaenge = [Vorhang1, Vorhang2, Vorhang3, Vorhang4]
const soundBall = document.getElementById("soundBall");

function BallClickFunktion() {
  console.log("Moin");
}

