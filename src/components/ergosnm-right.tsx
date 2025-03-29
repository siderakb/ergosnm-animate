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
  ReferenceArray,
  SignalValue,
  all,
  createRef,
  createRefArray,
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

  private keycapsRef: ReferenceArray<Keycap>;

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
    const legendTableLayer2 = [
      // ["", "1", "2", "3", "4", "5"],
      ["", "", "", "", "", ""],
      ["", "*", "7", "8", "9", "+"],
      ["", "/", "4", "5", "6", "-"],
      ["", "0", "1", "2", "3", "."],
      ["", "", "", "", "Fn", ""],
    ];
    const { node, ref } = this.getKeycapsMain(
      caseX - 430,
      caseY - 290,
      this.capsColor(),
      legendTableLayer1,
      legendTableLayer2,
      this.layer1Ref,
    );
    this.add(node);
    this.keycapsRef = ref;

    this.add(
      this.getKeycapsThumbCluster(caseX + 250, caseY - 20, this.capsColor()),
    );
  }

  public *switchLayer1(duration: number) {
    const animations = this.keycapsRef.map((keycap) =>
      keycap.switchLayer(1, duration),
    );
    yield* all(...animations);
  }

  public *switchLayer0(duration: number) {
    const animations = this.keycapsRef.map((keycap) =>
      keycap.switchLayer(0, duration),
    );
    yield* all(...animations);
  }

  public *press(keys: Array<number[]>, duration: number) {
    const animations = keys.map(([row, col]) => {
      return this.keycapsRef[row + 5 * col].press(duration);
    });

    yield* all(...animations);
  }

  public *release(keys: Array<number[]>, duration: number) {
    const animations = keys.map(([row, col]) => {
      return this.keycapsRef[row + 5 * col].release(duration);
    });

    yield* all(...animations);
  }

  private getKeycapsMain(
    baseX: number,
    baseY: number,
    color: PossibleColor,
    legendTable1: string[][],
    legendTable2: string[][],
    ref: Reference<Rect>,
  ) {
    const colOffset = [0, 0, -28, -42, -28, -14];

    const caps = [];
    const capsRef = createRefArray<Keycap>();
    for (let col = 0; col < 6; ++col) {
      for (let row = 0; row < 5; ++row) {
        const x = baseX + col * KeyCapDefine.spacing;
        const y = baseY + row * KeyCapDefine.spacing + colOffset[col];
        const legend1 = legendTable1[row][col];
        const legend2 = legendTable2[row][col];

        caps.push(
          <Keycap
            ref={capsRef}
            position={[x, y]}
            legend={[legend1, legend2]}
            primaryColor={color}
            secondaryColor={Colors.light}
            homing={col === 4 && row === 2}
            hide={col === 5 && row === 4}
          />,
        );
      }
    }
    return {
      node: <Rect ref={ref}>{...caps}</Rect>,
      ref: capsRef,
    };
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
