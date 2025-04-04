import { Img, makeScene2D, Txt } from "@motion-canvas/2d";
import { BaseOffsetY, Colors, KeyboardDefine } from "@src/config";

import { ErgoSnmRight } from "@src/components/ergosnm-right";
import { ErgoSnmLeft } from "@src/components/ergosnm-left";
import { all, createRef, waitFor, waitUntil } from "@motion-canvas/core";

import vialLogo from "@images/vial_logo.svg";

export default makeScene2D(function* (view) {
  view.y(BaseOffsetY);
  // view.fill(Colors.deepDark); // Background color

  const snmRight = createRef<ErgoSnmRight>();
  const snmLeft = createRef<ErgoSnmLeft>();
  view.add(
    <ErgoSnmRight
      ref={snmRight}
      x={-1 * KeyboardDefine.x + KeyboardDefine.rightOffset}
      y={KeyboardDefine.y}
      scale={KeyboardDefine.scale}
    />,
  );
  view.add(
    <ErgoSnmLeft
      ref={snmLeft}
      x={KeyboardDefine.x + KeyboardDefine.leftOffset}
      y={KeyboardDefine.y}
      scale={KeyboardDefine.scale}
    />,
  );

  const vialLogoRef = createRef<Img>();
  view.add(
    <Img
      ref={vialLogoRef}
      src={vialLogo}
      position={[0, -600]}
      scale={6}
      opacity={0}
    />,
  );

  const textRef = createRef<Txt>();
  view.add(
    <Txt
      ref={textRef}
      text=""
      fill={Colors.light}
      fontSize={128}
      position={[0, -500]}
      fontFamily={"Fira Code"} // FIXME
    />,
  );

  yield* waitUntil("e-op");
  yield* all(
    snmRight().press([[4, 4]], 0.16),
    snmRight().switchLayer1(0.5),
    snmLeft().switchLayer1(0.5),
  );
  yield* waitFor(0.8);

  yield* all(snmLeft().press([[2, 2]], 0.16), textRef().text("↑", 0.16));
  yield* snmLeft().release([[2, 2]], 0.16);

  yield* all(snmLeft().press([[2, 2]], 0.16), textRef().text("↑↑", 0.16));
  yield* snmLeft().release([[2, 2]], 0.16);

  yield* all(snmLeft().press([[2, 1]], 0.16), textRef().text("↑↑↓", 0.16));
  yield* snmLeft().release([[2, 1]], 0.16);

  yield* all(snmLeft().press([[2, 1]], 0.16), textRef().text("↑↑↓↓", 0.16));
  yield* snmLeft().release([[2, 1]], 0.16);

  yield* all(snmLeft().press([[2, 0]], 0.16), textRef().text("↑↑↓↓←", 0.16));
  yield* snmLeft().release([[2, 0]], 0.16);

  yield* all(snmLeft().press([[2, 3]], 0.16), textRef().text("↑↑↓↓←→", 0.16));
  yield* snmLeft().release([[2, 3]], 0.16);

  yield* all(snmLeft().press([[2, 0]], 0.16), textRef().text("↑↑↓↓←→←", 0.16));
  yield* snmLeft().release([[2, 0]], 0.16);

  yield* all(snmLeft().press([[2, 3]], 0.16), textRef().text("↑↑↓↓←→←→", 0.16));
  yield* snmLeft().release([[2, 3]], 0.16);

  yield* waitUntil("e-release");
  yield* all(
    snmRight().release([[4, 4]], 0.16),
    snmRight().switchLayer0(0.5),
    snmLeft().switchLayer0(0.5),
    textRef().opacity(0, 0.5),
  );
  yield* waitFor(0.15);

  yield* waitUntil("e-vial-on");
  yield* vialLogoRef().opacity(1, 0.25);
  yield* waitUntil("e-vial-off");
  yield* vialLogoRef().opacity(0, 0.25);

  // yield* waitUntil("e-ed");
});
