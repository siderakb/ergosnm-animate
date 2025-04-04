import { makeScene2D, Txt } from "@motion-canvas/2d";
import { BaseOffsetY, Colors, KeyboardDefine } from "@src/config";

import { ErgoSnmRight } from "@src/components/ergosnm-right";
import { ErgoSnmLeft } from "@src/components/ergosnm-left";
import { all, createRef, waitFor, waitUntil } from "@motion-canvas/core";

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

  const text1Ref = createRef<Txt>();
  view.add(
    <Txt
      ref={text1Ref}
      text="Layer 1"
      fill={Colors.light}
      fontSize={128}
      position={[0, -500]}
      fontFamily={"Inconsolata"}
      opacity={0}
    />,
  );

  const text2Ref = createRef<Txt>();
  view.add(
    <Txt
      ref={text2Ref}
      text="Layer 2"
      fill={Colors.light}
      fontSize={128}
      position={[0, -500]}
      fontFamily={"Inconsolata"}
      opacity={0}
    />,
  );

  // Layer switching
  yield* waitUntil("e-op");
  yield* text1Ref().opacity(1, 0.25);
  yield* waitFor(0.25);

  yield* text1Ref().opacity(1, 0.35);
  yield* all(
    snmLeft().press([[4, 1]], 0.16),
    snmRight().switchLayer1(0.5),
    snmLeft().switchLayer1(0.5),

    text1Ref().opacity(0, 0.5),
    text2Ref().opacity(1, 0.5),
  );
  yield* waitFor(1.2);
  yield* all(
    snmLeft().release([[4, 1]], 0.16),
    snmRight().switchLayer0(0.5),
    snmLeft().switchLayer0(0.5),

    text1Ref().opacity(1, 0.5),
    text2Ref().opacity(0, 0.5),
  );

  yield* waitFor(0.15);

  yield* all(
    snmRight().press([[4, 4]], 0.16),
    snmRight().switchLayer1(0.5),
    snmLeft().switchLayer1(0.5),

    text1Ref().opacity(0, 0.5),
    text2Ref().opacity(1, 0.5),
  );
  yield* waitFor(1.2);
  yield* all(
    snmRight().release([[4, 4]], 0.16),
    snmRight().switchLayer0(0.5),
    snmLeft().switchLayer0(0.5),

    text1Ref().opacity(1, 0.5),
    text2Ref().opacity(0, 0.5),
  );

  yield* waitUntil("e-ed");
  yield* text1Ref().opacity(0, 0.5);
});
