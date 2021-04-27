import * as V from "./vector";
import * as C from "./constants";
import * as F from "./flight";

// Intersect: Given a Vessel and a Body at some initial positions at time t0,
// calculate a FlightPath for the Vessel to intersect the Body minimizing dt
// without exceeding a certain acceleration.

function intersect(vessel: F.Vessel, body: Body): F.FlightPath {
  return (t: C.Time) => ({ acceleration: 0, direction: V.XAxis });
}

// IntersectAt: Given a Vessel and a Body at some initial positions at time t0,
// calculate Some FlightPath for the Vessel to intersect the Body at time
// `t0 + dt`. If such an intersection is impossible without exceeding a certain
// acceleration, return None.

// Rendezvous: Given a Vessel and a Body, calculate a FlightPath that intersects
// the body and leaves the Vessel with no relative velocity to the Body while
// minimizing dt without exceeding a certain acceleration.

// RendezvousAt: Rendezvous but with a given dt.

export function travelTime(distance: V.Vector, a: number, v0 = 0): number {
  // v**2 = v0**2 + 2 a dx
  // t = 2 * dx / (v + v0)
  const dx = V.asRT(distance).r;
  const v = Math.sqrt(v0 ** 2 + 2 * a * dx);
  const t = (2 * dx) / (v + v0);
  return t;
}

export function timeBetween(
  a: V.Position,
  b: V.Position,
  acceleration: number
) {
  const halfway = V.scale(V.subtract(a, b), 1 / 2);
  const time = travelTime(halfway, acceleration) * 2;
  return time;
}
