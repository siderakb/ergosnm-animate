import {
  NodeProps,
  Node,
  SVG,
  Path,
  Shape,
  Rect,
  Txt,
  Code,
} from "@motion-canvas/2d";
import { Color, createRef, PossibleColor } from "@motion-canvas/core";
import { Colors } from "@src/config";

export interface MonitorProps extends NodeProps {
  fill: PossibleColor;
}

export class Monitor extends Node {
  public constructor(props: MonitorProps) {
    super({
      ...props,
    });

    const width = 1400;
    const height = width / (16 / 9);
    const screenFrame = new Rect({
      fill: props.fill,
      width: width,
      height: height,
      radius: 50,
    });
    this.add(screenFrame);

    const windowHeight = height - 120;
    const windowWidth = width - 120 + 60;
    const contentContainer = new Rect({
      fill: Colors.light,
      width: windowWidth,
      height: windowHeight,
      y: -30,
      radius: 20,
      clip: true,
    });
    screenFrame.add(contentContainer);

    // const scrollBar = new Rect({
    //   fill: Colors.lightDark,
    //   width: 20,
    //   height: 120,
    //   x: 640,
    //   radius: 20,
    // });
    // contentContainer.add(scrollBar);

    const screenRef = createRef<Rect>();
    contentContainer.add(
      <Rect ref={screenRef}>
        <Txt text="stack" position={[-550, -270]} />
        <Txt text="underflow" fontStyle={"bold"} position={[-380, -270]} />
        <Code
          fontSize={36}
          fontFamily={"monospace"}
          code={`function awesomeFunction() {
    console.log('Hello World!');
}`}
        />
      </Rect>,
    );
  }
}
