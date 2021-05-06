import * as C from "./constants";
import * as V from "./vector";
import * as O from "./orbit";

export interface FlightControl {
  acceleration: C.Acceleration;
  direction: V.Vector<C.Normal>;
}

export interface FlightPath {
  (t: C.Time): FlightControl;
}

export interface Body {
  orbit: O.Orbital;
}

export interface Vessel {
  state: O.StateVector;
  maxAcceleration: C.Acceleration;
}
