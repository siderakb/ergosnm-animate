import { Rect, NodeProps, Txt } from "@motion-canvas/2d";
import {
  PossibleColor,
  PossibleVector2,
  SignalValue,
} from "@motion-canvas/core";
import { KeyCap } from "@src/config";

export interface KeycapProps extends NodeProps {
  position?: SignalValue<PossibleVector2>;
  fill?: SignalValue<PossibleColor>;
  label?: string;
}

export class Keycap extends Rect {
  constructor(props?: KeycapProps) {
    super({
      width: KeyCap.sideLength,
      height: KeyCap.sideLength,
      radius: KeyCap.radius,
      ...props,
    });

    if (props?.label) {
      this.add(
        <Txt
          text={props.label}
          fontSize={KeyCap.fontSize}
          fill={KeyCap.fontColor}
          position={[0, 0]} // Center
        />,
      );
    }
  }
}
