import {
  Rect,
  NodeProps,
  Txt,
  Node,
  colorSignal,
  Line,
} from "@motion-canvas/2d";
import {
  createRef,
  PossibleColor,
  SignalValue,
  tween,
  map,
  easeInOutCubic,
  Color,
  ColorSignal,
  Signal,
  all,
} from "@motion-canvas/core";
import { KeyCapDefine } from "@src/config";

export interface KeycapProps extends NodeProps {
  primaryColor: SignalValue<PossibleColor>;
  secondaryColor: SignalValue<PossibleColor>;
  legend?: string[];
  homing?: boolean;
  hide?: boolean;
}

export class Keycap extends Node {
  @colorSignal()
  declare public readonly primaryColor: ColorSignal<this>;

  @colorSignal()
  declare public readonly secondaryColor: ColorSignal<this>;

  private readonly legend: string[] = [];

  private readonly cap = createRef<Rect>();
  private readonly legendRef0 = createRef<Txt>();
  private readonly legendRef1 = createRef<Txt>();
  private readonly homing = createRef<Line>();

  public constructor(props: KeycapProps) {
    super({
      ...props,
    });

    this.legend = props.legend ?? [];

    if (!props.hide) {
      this.add(
        <Rect
          ref={this.cap}
          width={KeyCapDefine.sideLength}
          height={KeyCapDefine.sideLength}
          radius={KeyCapDefine.radius}
          fill={props.primaryColor}
        />,
      );
    }

    if (props.homing) {
      this.add(
        <Line
          ref={this.homing}
          stroke={this.secondaryColor}
          points={[
            [-8, 35],
            [8, 35],
          ]}
          lineWidth={2}
        />,
      );
    }

    if (props.legend && props.legend.length > 0) {
      this.add(
        <Txt
          ref={this.legendRef0}
          text={props.legend[0]}
          fontSize={KeyCapDefine.fontSize}
          fill={KeyCapDefine.fontColor}
          position={[0, 0]} // Center
        />,
      );
      this.add(
        <Txt
          ref={this.legendRef1}
          text={props.legend[1]}
          fontSize={KeyCapDefine.fontSize}
          fill={KeyCapDefine.fontColor}
          position={[0, 0]} // Center
          opacity={0}
        />,
      );
    }
  }

  public *switchLayer(layer: number, duration: number) {
    if (this.legendRef0().text() === this.legendRef1().text()) {
      return;
    }

    if (layer === 0) {
      yield* all(
        this.legendRef1().opacity(0, duration / 2),
        this.legendRef0().opacity(100, duration / 2),
      );
    } else if (layer === 1) {
      yield* all(
        this.legendRef0().opacity(0, duration / 2),
        this.legendRef1().opacity(100, duration / 2),
      );
    }
  }

  public *press(duration: number) {
    yield* tween(duration, (value) => {
      const scale = map(1, 0.85, easeInOutCubic(value));
      this.scale(scale);

      this.legendRef0()?.fill(
        Color.lerp(
          this.secondaryColor(),
          this.primaryColor(),
          easeInOutCubic(value),
        ),
      );
      this.cap().fill(
        Color.lerp(
          this.primaryColor(),
          this.secondaryColor(),
          easeInOutCubic(value),
        ),
      );
      //   this.homing()?.stroke(
      //     Color.lerp(
      //       this.primaryColor(),
      //       this.secondaryColor(),
      //       easeInOutCubic(value),
      //     ),
      //   );
    });
  }

  public *release(duration: number) {
    yield* tween(duration, (value) => {
      const scale = map(0.85, 1, easeInOutCubic(value));
      this.scale(scale);

      this.legendRef0()?.fill(
        Color.lerp(
          this.primaryColor(),
          this.secondaryColor(),
          easeInOutCubic(value),
        ),
      );
      this.cap().fill(
        Color.lerp(
          this.secondaryColor(),
          this.primaryColor(),
          easeInOutCubic(value),
        ),
      );
      //   this.homing()?.stroke(
      //     Color.lerp(
      //       this.secondaryColor(),
      //       this.primaryColor(),
      //       easeInOutCubic(value),
      //     ),
      //   );
    });
  }
}
