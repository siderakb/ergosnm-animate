import { Line, Node, NodeProps, Rect, Txt } from "@motion-canvas/2d";
import { PossibleColor, createRef } from "@motion-canvas/core";

export interface RightClickMenuProps extends NodeProps {
  fill: PossibleColor;
  secColor: PossibleColor;
  fontColor: PossibleColor;
}

export class RightClickMenu extends Node {
  private readonly menuRef = createRef<Rect>();
  public constructor(props?: RightClickMenuProps) {
    super({
      ...props,
    });

    const menuWidth = 250;
    const menuHeight = 350;

    this.add(
      <Rect
        ref={this.menuRef}
        fill={props?.fill}
        width={menuWidth}
        height={menuHeight}
        y={menuHeight / 2 + 20}
        x={menuWidth / 2 + 20}
        radius={10}
      >
        <Rect
          //   fill={props?.secColor}
          fill={props?.fill}
          width={menuWidth - 10}
          height={menuHeight / 3 - 10}
          y={-(menuHeight / 3)}
          radius={10}
        >
          <Txt text="Cut" fill={props?.fontColor} fontFamily={"Inconsolata"} />
        </Rect>
        <Rect
          //   fill={props?.secColor}
          fill={props?.fill}
          width={menuWidth - 10}
          height={menuHeight / 3 - 10}
          y={0}
          radius={10}
        >
          <Txt text="Copy" fill={props?.fontColor} fontFamily={"Inconsolata"} />
        </Rect>
        <Rect
          //   fill={props?.secColor}
          fill={props?.fill}
          width={menuWidth - 10}
          height={menuHeight / 3 - 10}
          y={menuHeight / 3}
          radius={10}
        >
          <Txt
            text="Paste"
            fill={props?.fontColor}
            fontFamily={"Inconsolata"}
          />
        </Rect>
      </Rect>,
    );
  }
}
