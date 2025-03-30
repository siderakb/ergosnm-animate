import {
  Circle,
  Img,
  Line,
  Node,
  NodeProps,
  colorSignal,
  initial,
} from "@motion-canvas/2d";
import {
  ColorSignal,
  PossibleColor,
  PossibleVector2,
  ReferenceArray,
  SignalValue,
  all,
  createRef,
  createRefArray,
  easeInOutCubic,
  map,
  tween,
} from "@motion-canvas/core";

export interface BallProps extends NodeProps {
  fill: PossibleColor;
  arrowColor: PossibleColor;
}

export class Ball extends Node {
  private readonly arrowRef: ReferenceArray<Line>;
  public constructor(props: BallProps) {
    super({
      ...props,
    });

    const ballSize = 230;
    this.add(<Circle width={ballSize} height={ballSize} fill={props.fill} />);

    const len = ballSize / 3;
    const posSet: Array<PossibleVector2> = [
      [0, len],
      [0, -len],
      [len, 0],
      [-len, 0],
    ];

    this.arrowRef = createRefArray<Line>();
    posSet.forEach((pos) => {
      this.add(
        <Line
          ref={this.arrowRef}
          stroke={props.arrowColor}
          lineWidth={20}
          endArrow
          points={[[0, 0], pos]}
          opacity={0}
        />,
      );
    });
  }

  public *arrow(
    l: boolean,
    r: boolean,
    u: boolean,
    d: boolean,
    duration: number,
  ) {
    const oriL = this.arrowRef[0].opacity();
    const oriR = this.arrowRef[1].opacity();
    const oriU = this.arrowRef[2].opacity();
    const oriD = this.arrowRef[3].opacity();

    yield* tween(duration, (value) => {
      const show = map(0, 100, easeInOutCubic(value));
      const hide = map(100, 0, easeInOutCubic(value));

      if (l && oriL === 0) {
        this.arrowRef[0].opacity(show);
      } else if (!l && oriL === 100) {
        this.arrowRef[0].opacity(hide);
      } else {
        this.arrowRef[0].opacity(hide);
      }

      if (r && oriR === 0) {
        this.arrowRef[1].opacity(show);
      } else if (!r && oriR === 100) {
        this.arrowRef[1].opacity(hide);
      } else {
        this.arrowRef[1].opacity(hide);
      }

      if (u && oriU === 0) {
        this.arrowRef[2].opacity(show);
      } else if (!u && oriU === 100) {
        this.arrowRef[2].opacity(hide);
      } else {
        this.arrowRef[2].opacity(hide);
      }

      if (d && oriD === 0) {
        this.arrowRef[3].opacity(show);
      } else if (!d && oriD === 100) {
        this.arrowRef[3].opacity(hide);
      } else {
        this.arrowRef[3].opacity(hide);
      }
    });
  }
}
