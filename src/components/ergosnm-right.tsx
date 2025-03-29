import {
  Img,
  Node,
  NodeProps,
  Rect,
  colorSignal,
  initial,
} from "@motion-canvas/2d";
import {
  ColorSignal,
  PossibleColor,
  SignalValue,
  createRef,
} from "@motion-canvas/core";

import { Colors, KeyCapDefine } from "@src/config";
import { Keycap } from "@src/components/keycap";

import caseRight from "@images/case_right.svg";

export interface ErgoSnmProps extends NodeProps {
  caseColor?: SignalValue<PossibleColor>;
  capsColor?: SignalValue<PossibleColor>;
}

export class ErgoSnmRight extends Node {
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

    this.add(<Img ref={this.case} src={caseRight} scale={2} />);

    const casePosition = this.case().position;
    const caseX = casePosition.x();
    const caseY = casePosition.y();

    this.add(this.getKeycapsMain(caseX - 430, caseY - 290, this.capsColor()));
    this.add(
      this.getKeycapsThumbCluster(caseX + 250, caseY - 20, this.capsColor()),
    );
  }

  private getKeycapsMain(baseX: number, baseY: number, color: PossibleColor) {
    const colOffset = [0, 0, -28, -42, -28, -14];
    const labelTable = [
      // ["", "1", "2", "3", "4", "5"],
      ["", "", "", "", "", ""],
      ["", "Q", "W", "E", "R", "T"],
      ["", "A", "S", "D", "F", "G"],
      ["", "Z", "X", "C", "V", "B"],
      ["", "", "", "", "Fn", ""],
    ];

    const caps = [];
    for (let col = 0; col < 6; ++col) {
      for (let row = 0; row < 5; ++row) {
        if (col === 5 && row === 4) break; // Skip

        const x = baseX + col * KeyCapDefine.spacing;
        const y = baseY + row * KeyCapDefine.spacing + colOffset[col];
        const label = labelTable[row][col];

        caps.push(
          <Keycap
            position={[x, y]}
            legend={label}
            primaryColor={Colors.lightDark}
            secondaryColor={Colors.light}
          />,
        );
      }
    }

    return <>{...caps}</>;
  }

  private getKeycapsThumbCluster(
    baseX: number,
    baseY: number,
    color: PossibleColor,
  ) {
    const keycaps = [];

    for (let col = 0; col < 3; ++col) {
      for (let row = 0; row < 2; ++row) {
        const x = baseX + col * KeyCapDefine.spacing;
        const y = baseY + row * KeyCapDefine.spacing;

        keycaps.push(
          <Keycap
            position={[x, y]}
            primaryColor={Colors.lightDark}
            secondaryColor={Colors.light}
          />,
        );
      }
    }

    return <Rect rotation={30}>{...keycaps}</Rect>;
  }
}
