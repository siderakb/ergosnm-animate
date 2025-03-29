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
  Reference,
  SignalValue,
  all,
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
  private readonly layer1Ref = createRef<Rect>();
  private readonly layer2Ref = createRef<Rect>();

  public constructor(props?: ErgoSnmProps) {
    super({
      ...props,
    });

    this.add(<Img ref={this.case} src={caseRight} scale={2} />);

    const casePosition = this.case().position;
    const caseX = casePosition.x();
    const caseY = casePosition.y();

    const legendTableLayer1 = [
      // ["", "1", "2", "3", "4", "5"],
      ["", "", "", "", "", ""],
      ["", "Q", "W", "E", "R", "T"],
      ["", "A", "S", "D", "F", "G"],
      ["", "Z", "X", "C", "V", "B"],
      ["", "", "", "", "Fn", ""],
    ];
    this.add(
      this.getKeycapsMain(
        caseX - 430,
        caseY - 290,
        this.capsColor(),
        legendTableLayer1,
        this.layer1Ref,
      ),
    );
    this.add(
      this.getKeycapsThumbCluster(caseX + 250, caseY - 20, this.capsColor()),
    );

    const legendTableLayer2 = [
      // ["", "1", "2", "3", "4", "5"],
      ["", "", "", "", "", ""],
      ["", "*", "7", "8", "9", "+"],
      ["", "/", "4", "5", "6", "-"],
      ["", "0", "1", "2", "3", "."],
      ["", "", "", "", "Fn", ""],
    ];
    this.add(
      this.getKeycapsMain(
        caseX - 430,
        caseY - 290,
        this.capsColor(),
        legendTableLayer2,
        this.layer2Ref,
      ),
    );
    this.layer2Ref().opacity(0);
  }

  public *switchLayer2(duration: number) {
    yield* this.layer2Ref().opacity(1, duration / 2);
    yield* this.layer1Ref().opacity(0, duration / 2);
  }

  public *switchLayer1(duration: number) {
    yield* this.layer1Ref().opacity(1, duration / 2);
    yield* this.layer2Ref().opacity(0, duration / 2);
  }

  private getKeycapsMain(
    baseX: number,
    baseY: number,
    color: PossibleColor,
    legendTable: string[][],
    ref: Reference<Rect>,
  ) {
    const colOffset = [0, 0, -28, -42, -28, -14];

    const caps = [];
    for (let col = 0; col < 6; ++col) {
      for (let row = 0; row < 5; ++row) {
        if (col === 5 && row === 4) break; // Skip

        const x = baseX + col * KeyCapDefine.spacing;
        const y = baseY + row * KeyCapDefine.spacing + colOffset[col];
        const legend = legendTable[row][col];

        caps.push(
          <Keycap
            position={[x, y]}
            legend={legend}
            primaryColor={color}
            secondaryColor={Colors.light}
            homing={col === 4 && row === 2}
          />,
        );
      }
    }

    return <Rect ref={ref}>{...caps}</Rect>;
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
