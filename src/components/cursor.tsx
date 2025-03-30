import { Line, Node, NodeProps } from "@motion-canvas/2d";
import { PossibleColor, createRef } from "@motion-canvas/core";

export interface CursorProps extends NodeProps {
  fill: PossibleColor;
}

export class Cursor extends Node {
  private readonly cursorRef = createRef<Line>();
  public constructor(props?: CursorProps) {
    super({
      ...props,
    });

    this.add(
      <Line
        ref={this.cursorRef}
        stroke={props?.fill}
        fill={props?.fill}
        lineWidth={1}
        closed
        points={[
          [0, 0],
          [-50, 150],
          [0, 110],
          [50, 150],
        ]}
        rotation={-18}
        lineJoin={"round"}
        radius={8}
        scale={0.65}
      />,
    );
  }
}
