import { Img, Line, Node, NodeProps, Rect } from "@motion-canvas/2d";
import { PossibleColor, createRef } from "@motion-canvas/core";

import layout from "@images/keyboard_100.svg";
import { KeyCapDefine } from "@src/config";

export interface Keyboard100Props extends NodeProps {
  fill: PossibleColor;
}

export class Keyboard100 extends Node {
  public constructor(props?: Keyboard100Props) {
    super({
      ...props,
    });

    this.add(<Img src={layout} scale={2} />);

    const keycaps = [];
    const keyWidth = 100;
    const keyHeight = 100;
    const spacing = 8;

    // 主鍵區
    for (let row = 0; row < 5; ++row) {
      for (let col = 0; col < 14; ++col) {
        const x = col * (keyWidth + spacing);
        const y = row * (keyHeight + spacing);
        keycaps.push(
          <Rect
            width={keyWidth}
            height={keyHeight}
            x={x}
            y={y}
            fill={"gray"}
            radius={5}
          />,
        );
      }
    }

    // 功能鍵區（F1-F12）
    for (let i = 0; i < 12; ++i) {
      const x = i * (keyWidth + spacing);
      const y = -1 * (keyHeight + spacing) - 80;
      keycaps.push(
        <Rect
          width={keyWidth}
          height={keyHeight}
          x={x}
          y={y}
          fill={"gray"}
          radius={5}
        />,
      );
    }

    // 數字鍵區
    for (let row = 0; row < 4; ++row) {
      for (let col = 0; col < 3; ++col) {
        const x = 15 * (keyWidth + spacing) + col * (keyWidth + spacing);
        const y = row * (keyHeight + spacing);
        keycaps.push(
          <Rect
            width={keyWidth}
            height={keyHeight}
            x={x}
            y={y}
            fill={"gray"}
            radius={5}
          />,
        );
      }
    }

    // 方向鍵區
    const arrowKeys = [
      { x: 13.5 * (keyWidth + spacing), y: 4 * (keyHeight + spacing) },
      { x: 12.5 * (keyWidth + spacing), y: 5 * (keyHeight + spacing) },
      { x: 13.5 * (keyWidth + spacing), y: 5 * (keyHeight + spacing) },
      { x: 14.5 * (keyWidth + spacing), y: 5 * (keyHeight + spacing) },
    ];
    arrowKeys.forEach((pos) => {
      keycaps.push(
        <Rect
          width={keyWidth}
          height={keyHeight}
          x={pos.x}
          y={pos.y}
          fill={"gray"}
          radius={5}
        />,
      );
    });

    this.add(<Rect x={-1100}>{...keycaps}</Rect>);
  }
}
