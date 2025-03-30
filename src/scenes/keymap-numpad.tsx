import { makeScene2D, Txt } from "@motion-canvas/2d";
import { Colors } from "@src/config";

import { ErgoSnmRight } from "@src/components/ergosnm-right";
import { ErgoSnmLeft } from "@src/components/ergosnm-left";
import { all, createRef, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  // view.fill(Colors.deepDark); // Background color

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
    />,
  );

  // Numpad
  yield* all(
    snmRight().press([[4, 4]], 0.16),
    snmRight().switchLayer1(0.5),
    snmLeft().switchLayer1(0.5),
  );
  yield* waitFor(0.8);

  yield* all(snmRight().press([[1, 2]], 0.16), textRef().text("7", 0.16));
  yield* snmRight().release([[1, 2]], 0.16);

  yield* all(snmRight().press([[3, 5]], 0.16), textRef().text("7.", 0.16));
  yield* snmRight().release([[3, 5]], 0.16);

  yield* all(snmRight().press([[3, 3]], 0.16), textRef().text("7.2", 0.16));
  yield* snmRight().release([[3, 3]], 0.16);

  yield* all(snmRight().press([[1, 4]], 0.16), textRef().text("7.29", 0.16));
  yield* snmRight().release([[1, 4]], 0.16);

  yield* all(snmRight().press([[1, 2]], 0.16), textRef().text("7.297", 0.16));
  yield* snmRight().release([[1, 2]], 0.16);

  yield* all(snmRight().press([[3, 4]], 0.16), textRef().text("7.2973", 0.16));
  yield* snmRight().release([[3, 4]], 0.16);

  yield* all(snmRight().press([[2, 3]], 0.16), textRef().text("7.29735", 0.16));
  yield* snmRight().release([[2, 3]], 0.16);

  yield* all(
    snmRight().press([[3, 3]], 0.16),
    textRef().text("7.297352", 0.16),
  );
  yield* snmRight().release([[3, 3]], 0.16);

  yield* all(
    snmRight().release([[4, 4]], 0.16),
    snmRight().switchLayer0(0.5),
    snmLeft().switchLayer0(0.5),
  );
  yield* waitFor(0.25);
});
