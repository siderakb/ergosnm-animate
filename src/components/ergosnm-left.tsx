import {
  Circle,
  Img,
  Node,
  NodeProps,
  colorSignal,
  initial,
} from "@motion-canvas/2d";
import {
  ColorSignal,
  PossibleColor,
  SignalValue,
  createRef,
} from "@motion-canvas/core";

import { Colors, KeyCap } from "@src/config";
import { Keycap } from "@src/components/keycap";

import caseLeft from "@images/case_left.svg";

export interface ErgoSnmProps extends NodeProps {
  caseColor?: SignalValue<PossibleColor>;
  capsColor?: SignalValue<PossibleColor>;
}

export class ErgoSnmLeft extends Node {
  @initial(Colors.dark)
  @colorSignal()
  declare public readonly caseColor: ColorSignal<this>;

  @initial(Colors.lightDark)
  @colorSignal()
  declare public readonly capsColor: ColorSignal<this>;

  private readonly case = createRef<Img>();

  public constructor(props?: ErgoSnmProps) {
    super({
      ...props,
    });

    this.add(<Img ref={this.case} src={caseLeft} scale={2} y={-30} />);

    const casePosition = this.case().position;
    const caseX = casePosition.x();
    const caseY = casePosition.y();

    const ballSize = 230;
    this.add(this.getKeycapsMain(caseX - 155, caseY - 260, this.capsColor()));
    this.add(
      <Circle
        x={caseX - 310}
        y={caseY + 230}
        width={ballSize}
        height={ballSize}
        fill={Colors.lightDark}
      />,
    );
  }

  private getKeycapsMain(baseX: number, baseY: number, color: PossibleColor) {
    const colOffset = [-14, -28, -42, -28, 0, 0];
    const labelTable = [
      // ["6", "7", "8", "9", "0", ""],
      ["", "", "", "", "", ""],
      ["Y", "U", "I", "O", "P", ""],
      ["H", "J", "K", "L", ":", ""],
      ["N", "M", "<", ">", "?", ""],
      ["", "Fn", "", "", "", ""],
    ];

    const caps = [];

    for (let col = 0; col < 6; ++col) {
      for (let row = 0; row < 5; ++row) {
        if (col === 0 && row === 4) break; // Skip

        const x = baseX + col * KeyCap.spacing;
        const y = baseY + row * KeyCap.spacing + colOffset[col];
        const label = labelTable[row][col];

        caps.push(
          <Keycap position={[x, y]} label={label} fill={Colors.lightDark} />,
        );
      }
    }

    return <>{...caps}</>;
  }
}
