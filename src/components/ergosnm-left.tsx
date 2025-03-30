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
  ReferenceArray,
  SignalValue,
  all,
  createRef,
  createRefArray,
} from "@motion-canvas/core";

import { Colors, KeyCapDefine } from "@src/config";
import { Keycap } from "@src/components/keycap";

import caseLeft from "@images/case_left.svg";
import { Ball } from "@src/components/ball";

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
  private readonly ball = createRef<Ball>();
  private keycapsRef: ReferenceArray<Keycap>;

  public constructor(props?: ErgoSnmProps) {
    super({
      ...props,
    });

    this.add(<Img ref={this.case} src={caseLeft} scale={2} y={-30} />);

    const casePosition = this.case().position;
    const caseX = casePosition.x();
    const caseY = casePosition.y();

    const { node, ref } = this.getKeycapsMain(
      caseX - 155,
      caseY - 260,
      this.capsColor(),
    );
    this.add(node);
    this.keycapsRef = ref;

    this.add(
      <Ball
        ref={this.ball}
        fill={Colors.lightDark}
        arrowColor={Colors.red}
        x={caseX - 310}
        y={caseY + 230}
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
    const labelTable2 = [
      // ["6", "7", "8", "9", "0", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      // ["←", "↓", "↑", "→", ":", ""],
      ["◀", "▼", "▲", "▶", "", ""],
      ["Home", "PgDn", "PgUp", "End", "", ""],
      ["", "Fn", "", "", "", ""],
    ];

    const caps = [];
    const capsRef = createRefArray<Keycap>();

    for (let col = 0; col < 6; ++col) {
      for (let row = 0; row < 5; ++row) {
        const x = baseX + col * KeyCapDefine.spacing;
        const y = baseY + row * KeyCapDefine.spacing + colOffset[col];
        const label = labelTable[row][col];
        const label2 = labelTable2[row][col];

        caps.push(
          <Keycap
            ref={capsRef}
            position={[x, y]}
            legend={[label, label2]}
            primaryColor={Colors.lightDark}
            secondaryColor={Colors.light}
            homing={label === "J"}
            hide={col === 0 && row === 4}
          />,
        );
      }
    }

    return {
      node: <>{...caps}</>,
      ref: capsRef,
    };
  }

  public *trackballArrow(
    l: boolean,
    r: boolean,
    u: boolean,
    d: boolean,
    duration: number,
  ) {
    yield* this.ball().arrow(l, r, u, d, duration);
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
}
