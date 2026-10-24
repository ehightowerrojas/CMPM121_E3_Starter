# Portrait Options

Three choices for improving the neutral face. All are based off of this commit.

## A

**Status:** explored on branch `A`.

- ~150 small circles in a spikey hairstyle emanating out from the upper half of the head
- The spikes differ in size and are randomized so that it is wild and energetic
- ~20 freckles scattered around the cheeks and nose
- Overall impression: an excited, freshly woken up individual

How it turned out: each spike became a tapering row of bead-like circles. Because spike
lengths are random, the hair count changes on every load (roughly 110–180 circles) rather
than landing on ~150.

## B

**Status:** explored on branch `B`.

- A picture of round glasses on the eyes
- A picture of a small top hat sitting on the top of the head slightly angled
- I will create both images by hand in a PNG/SVG format (alternatively will find images under a free license such as OpenMoji)
- Overall impression: a stylish but slightly silly looking man

How it turned out: both images ended up as hand-written SVG files, so no OpenMoji. The
"small" top hat looked lost on the head, so I enlarged it to cover much more of the top.

## C

**Status:** explored on branch `C`.

- Radial gradient on the head from warm peach color in the middle to cool pink/lilac at the edges
- A curved line drawn using a cubic Bézier curve in place of the straight line for the mouth forming a lopsided nervous smile
- Two more curved lines for each eyebrow that are slightly angled up in fear
- Overall impression: a nervous and soft individual

How it turned out: close to the plan. The gradient uses a middle peach stop for a softer
fade, and the eyebrows are quadratic curves rather than cubic.

## Criterion

Choose whichever option seems the most distinct personality when sized down.

## Decision

**Chosen:** branch `B`, the dapper but silly face with round glasses and a tilted top hat.

Measured against my criterion, B had the most distinct personality when sized down. The
hat and glasses change the face's silhouette, so the character still reads at thumbnail
size. A's spiky hair was also bold, but the freckles disappeared when small. C had the
most expression up close, but its soft gradient and thin curves washed out at small sizes.

Alternatives `A` and `C` remain unchanged on their own branches as a record of those explorations.
