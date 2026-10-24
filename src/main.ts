// @deno-types="./asset-url.d.ts"
import glassesUrl from "./assets/glasses.svg?no-inline";
// @deno-types="./asset-url.d.ts"
import topHatUrl from "./assets/top-hat.svg?no-inline";

const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// Build the portrait's SVG, including every shape and its accessible label.
function buildFace(): SVGSVGElement {
  const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  face.setAttribute("viewBox", "0 0 200 200");
  face.setAttribute("role", "img");
  face.setAttribute("aria-label", "A top hat and glasses face");

  const head = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "ellipse",
  );
  head.setAttribute("cx", "100");
  head.setAttribute("cy", "100");
  head.setAttribute("rx", "78");
  head.setAttribute("ry", "86");
  head.setAttribute("fill", "#f3cf87");
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

  const mouth = document.createElementNS("http://www.w3.org/2000/svg", "line");
  mouth.setAttribute("x1", "75");
  mouth.setAttribute("y1", "137");
  mouth.setAttribute("x2", "125");
  mouth.setAttribute("y2", "137");
  mouth.setAttribute("stroke", "#302c29");
  mouth.setAttribute("stroke-width", "4");
  mouth.setAttribute("stroke-linecap", "round");
  face.append(mouth);

  // glasses.svg — created by Evangel, hand-written SVG in VS Code. Own work.
  const glassesImage = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "image",
  );
  glassesImage.setAttribute("href", glassesUrl);
  glassesImage.setAttribute("x", "50");
  glassesImage.setAttribute("y", "65");
  glassesImage.setAttribute("width", "100");
  glassesImage.setAttribute("height", "34");
  face.append(glassesImage);

  // top-hat.svg — created by Evangel, hand-written SVG in VS Code. Own work.
  const topHatImage = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "image",
  );
  topHatImage.setAttribute("href", topHatUrl);
  topHatImage.setAttribute("x", "62");
  topHatImage.setAttribute("y", "0");
  topHatImage.setAttribute("width", "70");
  topHatImage.setAttribute("height", "44");
  // Tilt the hat slightly to one side, rotating around its own brim.
  topHatImage.setAttribute("transform", "rotate(-12 97 37)");
  face.append(topHatImage);

  return face;
}

const face = buildFace();
portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
