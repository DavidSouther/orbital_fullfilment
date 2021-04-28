import * as C from "./constants";
import * as P from "./planets";
import * as V from "./vector";
import * as S from "./solver";

// Co-centric circular orbit constant thrust intersection
const earth0 = P.Earth.position(0);
const saturn0 = P.Saturn.position(0);
const currentDistance = V.delta(earth0, saturn0) / C.AU;
console.log(`Minimum distance: ${currentDistance} AU`);

const acceleration = (1 / 3) * C.g;
const time = S.timeBetween(earth0, saturn0, acceleration);
console.log(`Travel time: ${time / C.DAY} days`);

const sweep = (time / P.Saturn.period) * C.TAU * C.DEGREE;
console.log(`In that time, Saturn has moved ${sweep} degrees`);
