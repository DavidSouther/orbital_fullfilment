import { createContext } from "react";
import {Option, None} from '../math/constants';

export const GraphicsContext = createContext<Option<CanvasRenderingContext2D>>(None);