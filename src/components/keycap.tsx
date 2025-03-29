import { Rect, NodeProps, Txt } from "@motion-canvas/2d";
import {
  PossibleColor,
  PossibleVector2,
  SignalValue,
} from "@motion-canvas/core";

const LENGTH = 100;
const RADIUS = 10;
const FONT_SIZE = 36;
const FONT_COLOR = "white";

export interface KeycapProps extends NodeProps {
  position?: SignalValue<PossibleVector2>;
  fill?: SignalValue<PossibleColor>;
  label?: string;
}

export class Keycap extends Rect {
  constructor(props?: KeycapProps) {
    super({
      width: LENGTH,
      height: LENGTH,
      radius: RADIUS,
      ...props,
    });

    if (props?.label) {
      this.add(
        <Txt
          text={props.label}
          fontSize={FONT_SIZE}
          fill={FONT_COLOR}
          position={[0, 0]} // Center
        />,
      );
    }
  }
}
