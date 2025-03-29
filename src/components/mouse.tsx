import { NodeProps, Node, SVG, Path, Shape } from "@motion-canvas/2d";
import { Color, createRef, PossibleColor } from "@motion-canvas/core";

import mouseBody from "@images/mouse_body.svg";

export interface MouseProps extends NodeProps {
  fill: PossibleColor;
  primaryColor: PossibleColor;
}

export class Mouse extends Node {
  private readonly body = createRef<SVG>();

  public constructor(props: MouseProps) {
    super({
      ...props,
    });

    this.add(<SVG ref={this.body} svg={mouseBody} fill={props.fill} />);
  }
}
