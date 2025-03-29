import { Rect, NodeProps, Txt, Node, colorSignal } from "@motion-canvas/2d";
import {
  createRef,
  PossibleColor,
  SignalValue,
  tween,
  map,
  easeInOutCubic,
  Color,
  ColorSignal,
} from "@motion-canvas/core";
import { KeyCapDefine } from "@src/config";

export interface KeycapProps extends NodeProps {
  primaryColor: SignalValue<PossibleColor>;
  secondaryColor: SignalValue<PossibleColor>;
  legend?: string;
}

export class Keycap extends Node {
  @colorSignal()
  declare public readonly primaryColor: ColorSignal<this>;

  @colorSignal()
  declare public readonly secondaryColor: ColorSignal<this>;

  private readonly cap = createRef<Rect>();
  private readonly legend = createRef<Txt>();

  public constructor(props: KeycapProps) {
    super({
      ...props,
    });

    this.add(
      <Rect
        ref={this.cap}
        width={KeyCapDefine.sideLength}
        height={KeyCapDefine.sideLength}
        radius={KeyCapDefine.radius}
        fill={props.primaryColor}
      />,
    );

    if (props.legend) {
      this.add(
        <Txt
          ref={this.legend}
          text={props.legend}
          fontSize={KeyCapDefine.fontSize}
          fill={KeyCapDefine.fontColor}
          position={[0, 0]} // Center
        />,
      );
    }
  }

  public *press(duration: number) {
    yield* tween(duration, (value) => {
      const scale = map(1, 0.85, easeInOutCubic(value));
      this.cap().scale(scale);
      this.legend().scale(scale);

      this.cap().fill(
        Color.lerp(
          this.primaryColor(),
          this.secondaryColor(),
          easeInOutCubic(value),
        ),
      );
      this.legend().fill(
        Color.lerp(
          this.secondaryColor(),
          this.primaryColor(),
          easeInOutCubic(value),
        ),
      );
    });
  }

  public *release(duration: number) {
    yield* tween(duration, (value) => {
      const scale = map(0.85, 1, easeInOutCubic(value));
      this.cap().scale(scale);
      this.legend().scale(scale);

      this.cap().fill(
        Color.lerp(
          this.secondaryColor(),
          this.primaryColor(),
          easeInOutCubic(value),
        ),
      );
      this.legend().fill(
        Color.lerp(
          this.primaryColor(),
          this.secondaryColor(),
          easeInOutCubic(value),
        ),
      );
    });
  }
}
