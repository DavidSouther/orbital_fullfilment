import * as C from "./constants";
import * as O from "./orbit";
import * as P from "./planets";
import * as V from "./vector";
import * as S from "./solver";

// Co-centric circular orbit constant thrust intersection
const earth0 = O.positionOnOrbit(P.Earth.orbit)(0);
const saturn0 = O.positionOnOrbit(P.Saturn.orbit)(0);
const minimumDistance = V.delta(earth0, saturn0) / C.AU;
console.log(`Minimum distance: ${minimumDistance} AU`);

const acceleration = (1 / 3) * C.g;
const time = S.timeBetween(earth0, saturn0, acceleration);
console.log(`Travel time: ${time / C.DAY} days`);

console.log(`In that time, Saturn has moved ${sweep} degrees`);
