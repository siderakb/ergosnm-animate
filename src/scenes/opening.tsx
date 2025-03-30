import { makeScene2D, Txt } from "@motion-canvas/2d";
import { Colors } from "@src/config";

import { ErgoSnmRight } from "@src/components/ergosnm-right";
import { ErgoSnmLeft } from "@src/components/ergosnm-left";
import { all, createRef, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  //   view.fill(Colors.deepDark); // Background color

  const snmY = 250;
  const snmX = 750;
  const snmScale = 1.25;
  const snmRight = createRef<ErgoSnmRight>();
  const snmLeft = createRef<ErgoSnmLeft>();
  view.add(<ErgoSnmRight ref={snmRight} x={-snmX} y={snmY} scale={snmScale} />);
  view.add(<ErgoSnmLeft ref={snmLeft} x={snmX} y={snmY} scale={snmScale} />);

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

  yield* waitFor(0.5);

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

  yield* waitFor(0.5);
  yield* textRef().opacity(0, 0.25);
  //   yield* textRef().text("", 0.25);
});
