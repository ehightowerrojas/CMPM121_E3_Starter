const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("role", "img");
face.setAttribute(
  "aria-label",
  "A soft, nervous face",
);

// Radial gradient for the head: warm peach in the middle to cool lilac at the edges.
const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
const headShade = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "radialGradient",
);
headShade.setAttribute("id", "head-shade");
headShade.setAttribute("cx", "50%");
headShade.setAttribute("cy", "45%");
headShade.setAttribute("r", "60%");
const shadeStops = [
  { offset: "0%", color: "#ffd9b8" },
  { offset: "55%", color: "#f5c2a8" },
  { offset: "100%", color: "#c3a3d9" },
];
for (const stop of shadeStops) {
  const stopElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop",
  );
  stopElement.setAttribute("offset", stop.offset);
  stopElement.setAttribute("stop-color", stop.color);
  headShade.append(stopElement);
}
defs.append(headShade);
face.append(defs);

const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
head.setAttribute("cx", "100");
head.setAttribute("cy", "100");
head.setAttribute("rx", "78");
head.setAttribute("ry", "86");
head.setAttribute("fill", "url(#head-shade)");
head.setAttribute("stroke", "#302c29");
head.setAttribute("stroke-width", "4");
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

// Lopsided nervous smile: one cubic Bézier that dips on the left and pulls up on the right.
const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");
mouth.setAttribute("d", "M 74 138 C 88 150, 108 126, 126 134");
mouth.setAttribute("fill", "none");
mouth.setAttribute("stroke", "#302c29");
mouth.setAttribute("stroke-width", "4");
mouth.setAttribute("stroke-linecap", "round");
face.append(mouth);

// Worried eyebrows: quadratic curves rising toward the middle of the face.
const browPaths = ["M 58 68 Q 70 66 84 57", "M 142 68 Q 130 66 116 57"];
for (const browPath of browPaths) {
  const brow = document.createElementNS("http://www.w3.org/2000/svg", "path");
  brow.setAttribute("d", browPath);
  brow.setAttribute("fill", "none");
  brow.setAttribute("stroke", "#302c29");
  brow.setAttribute("stroke-width", "4");
  brow.setAttribute("stroke-linecap", "round");
  face.append(brow);
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
