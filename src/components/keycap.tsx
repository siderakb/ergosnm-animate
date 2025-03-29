import { Rect, NodeProps, Txt, initial, signal, Node } from "@motion-canvas/2d";
import {
  createRef,
  PossibleColor,
  PossibleVector2,
  all,
  SignalValue,
  SimpleSignal,
  tween,
  map,
  easeInOutCubic,
  Color,
} from "@motion-canvas/core";
import { Colors, KeyCapDefine } from "@src/config";

export interface KeycapProps extends NodeProps {
  fill?: SignalValue<PossibleColor>;
  label?: string;
  pressed?: SignalValue<boolean>;
}

export class Keycap extends Node {
  @initial(false)
  @signal()
  declare public readonly pressed: SimpleSignal<boolean, this>;

  private isPressed: boolean;
  private readonly cap = createRef<Rect>();
  private readonly letter = createRef<Txt>();

  public constructor(props?: KeycapProps) {
    super({
      ...props,
    });

    this.isPressed = this.pressed();

    this.add(
      <Rect
        ref={this.cap}
        width={KeyCapDefine.sideLength}
        height={KeyCapDefine.sideLength}
        radius={KeyCapDefine.radius}
        fill={props?.fill}
      />,
    );

    if (props?.label) {
      this.add(
        <Txt
          ref={this.letter}
          text={props.label}
          fontSize={KeyCapDefine.fontSize}
          fill={KeyCapDefine.fontColor}
          position={[0, 0]} // Center
        />,
      );
    }
  }

  public *press(duration: number) {
    yield* all(
      tween(duration, (value) => {
        const scale = 0.85;
        this.cap().scale(map(1, scale, easeInOutCubic(value)));
        this.letter().scale(map(1, scale, easeInOutCubic(value)));
      }),

      tween(duration, (value) => {
        this.cap().fill(
          Color.lerp(
            Colors.lightDark,
            KeyCapDefine.fontColor,
            easeInOutCubic(value),
          ),
        );

        this.letter().fill(
          Color.lerp(
            KeyCapDefine.fontColor,
            Colors.lightDark,
            easeInOutCubic(value),
          ),
        );
      }),
    );

    this.isPressed = true;
  }

  public *release(duration: number) {
    yield* all(
      tween(duration, (value) => {
        const scale = 0.85;
        this.cap().scale(map(scale, 1, easeInOutCubic(value)));
        this.letter().scale(map(scale, 1, easeInOutCubic(value)));
      }),

      tween(duration, (value) => {
        this.cap().fill(
          Color.lerp(
            KeyCapDefine.fontColor,
            Colors.lightDark,
            easeInOutCubic(value),
          ),
        );

        this.letter().fill(
          Color.lerp(
            Colors.lightDark,
            KeyCapDefine.fontColor,
            easeInOutCubic(value),
          ),
        );
      }),
    );

    this.isPressed = false;
  }
}
