import { Rect, NodeProps } from "@motion-canvas/2d";
import {
  PossibleColor,
  PossibleVector2,
  SignalValue,
} from "@motion-canvas/core";

export interface KeycapProps extends NodeProps {
  position?: SignalValue<PossibleVector2>;
  fill?: SignalValue<PossibleColor>;
}

export class Keycap extends Rect {
  constructor(props?: KeycapProps) {
    super({
      width: 100,
      height: 100,
      radius: 10,
      ...props,
    });
  }
}
