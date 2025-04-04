import { makeScene2D, Txt } from "@motion-canvas/2d";
import { BaseOffsetY, Colors, KeyboardDefine } from "@src/config";

import { ErgoSnmRight } from "@src/components/ergosnm-right";
import { ErgoSnmLeft } from "@src/components/ergosnm-left";
import { all, createRef, waitFor, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  view.y(BaseOffsetY);
  //   view.fill(Colors.deepDark); // Background color

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

  const textRef = createRef<Txt>();
  view.add(
    <Txt
      ref={textRef}
      text=""
      fill={Colors.light}
      fontSize={128}
      position={[0, -500]}
      fontFamily={"Inconsolata"}
    />,
  );

  yield* waitUntil("e-op");

  yield* all(snmLeft().press([[2, 0]], 0.16), textRef().text("h", 0.16));
  yield* snmLeft().release([[2, 0]], 0.16);

  yield* all(snmRight().press([[1, 3]], 0.2), textRef().text("he", 0.2));
  yield* snmRight().release([[1, 3]], 0.2);
  yield* waitFor(0.02);

  yield* all(snmLeft().press([[2, 3]], 0.16), textRef().text("hel", 0.16));
  yield* snmLeft().release([[2, 3]], 0.16);

  yield* all(snmLeft().press([[2, 3]], 0.1), textRef().text("hell", 0.1));
  yield* snmLeft().release([[2, 3]], 0.1);

  yield* all(snmLeft().press([[1, 3]], 0.16), textRef().text("hello", 0.16));
  yield* snmLeft().release([[1, 3]], 0.16);

  yield* waitUntil("e-ed");
  yield* textRef().opacity(0, 0.25);
  //   yield* textRef().text("", 0.25);
});
