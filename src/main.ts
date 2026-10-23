const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("aria-label", "Face with spiky hair and freckles");
face.setAttribute("role", "img");
face.setAttribute("aria-label", "A neutral face");

const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
head.setAttribute("cx", "100");
head.setAttribute("cy", "100");
head.setAttribute("rx", "78");
head.setAttribute("ry", "86");
head.setAttribute("fill", "#f3cf87");
head.setAttribute("stroke", "#302c29");
head.setAttribute("stroke-width", "4");

//Spiky hair: each spike is a tapering row of circles fanned over the top.
const spikeCount = 18;
const hairColors = ["#302c29", "#4a3f5c", "#563b67"];
for (let s = 0; s < spikeCount; s++) {
  const angle = Math.PI * (1.06 + 0.88 * (s / (spikeCount - 1))) +
    (Math.random() - 0.5) * 0.08;
  // 6 to 10 beads per spike, so 18 spikes always give at least 108 circles.
  const beadCount = 6 + Math.floor(Math.random() * 5);
  const color = hairColors[s % hairColors.length];
  for (let j = 0; j < beadCount; j++) {
    const reach = j * 4.5;
    const bead = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    bead.setAttribute("cx", String(100 + (74 + reach) * Math.cos(angle)));
    bead.setAttribute("cy", String(100 + (82 + reach) * Math.sin(angle)));
    // Taper from fat at the root to thin at the tip.
    bead.setAttribute("r", String(4.5 - (j / beadCount) * 3.3));
    bead.setAttribute("fill", color);
    face.append(bead);
  }
}

face.append(head);

const leftEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
leftEye.setAttribute("cx", "72");
leftEye.setAttribute("cy", "82");
leftEye.setAttribute("rx", "6");
leftEye.setAttribute("ry", "9");
leftEye.setAttribute("fill", "#302c29");
face.append(leftEye);

const rightEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
rightEye.setAttribute("cx", "128");
rightEye.setAttribute("cy", "82");
rightEye.setAttribute("rx", "6");
rightEye.setAttribute("ry", "9");
rightEye.setAttribute("fill", "#302c29");
face.append(rightEye);

const nose = document.createElementNS("http://www.w3.org/2000/svg", "line");
nose.setAttribute("x1", "100");
nose.setAttribute("y1", "96");
nose.setAttribute("x2", "96");
nose.setAttribute("y2", "112");
nose.setAttribute("stroke", "#302c29");
nose.setAttribute("stroke-width", "4");
nose.setAttribute("stroke-linecap", "round");
face.append(nose);

const mouth = document.createElementNS("http://www.w3.org/2000/svg", "line");
mouth.setAttribute("x1", "75");
mouth.setAttribute("y1", "137");
mouth.setAttribute("x2", "125");
mouth.setAttribute("y2", "137");
mouth.setAttribute("stroke", "#302c29");
mouth.setAttribute("stroke-width", "4");
mouth.setAttribute("stroke-linecap", "round");
face.append(mouth);

// ~20 freckles scattered over both cheeks and the nose.
const freckleZones = [
  { x: 66, y: 112, spread: 12, count: 8 }, // left cheek
  { x: 134, y: 112, spread: 12, count: 8 }, // right cheek
  { x: 99, y: 104, spread: 6, count: 4 }, // nose
];
for (const zone of freckleZones) {
  for (let k = 0; k < zone.count; k++) {
    const freckleAngle = Math.random() * Math.PI * 2;
    const freckleDistance = Math.sqrt(Math.random()) * zone.spread;
    const freckle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    freckle.setAttribute(
      "cx",
      String(zone.x + freckleDistance * Math.cos(freckleAngle)),
    );
    freckle.setAttribute(
      "cy",
      String(zone.y + freckleDistance * Math.sin(freckleAngle)),
    );
    freckle.setAttribute("r", String(1.1 + Math.random() * 0.8));
    freckle.setAttribute("fill", "#b5703f");
    face.append(freckle);
  }
}

portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
