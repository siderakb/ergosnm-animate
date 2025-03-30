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
      text="Left click"
      fill={Colors.light}
      fontSize={128}
      position={[0, -500]}
      opacity={0}
      fontFamily={"Inconsolata"}
    />,
  );

  //   const noteRef = createRef<Txt>();
  //   view.add(
  //     <Txt
  //       ref={noteRef}
  //       text={"J + K = Left click\nK + L = Right click\nJ + L = Middle click"}
  //       fill={Colors.light}
  //       fontSize={84}
  //       position={[-1450, -800]}
  //     />,
  //   );

  yield* waitFor(0.8);

  // Left click
  yield* all(
    snmLeft().press(
      [
        [2, 1],
        [2, 2],
      ],
      0.16,
    ),
    textRef().opacity(1, 0.16),
  );
  yield* snmLeft().release(
    [
      [2, 1],
      [2, 2],
    ],
    0.16,
  );
  yield* waitFor(0.15);
  yield* snmLeft().press(
    [
      [2, 1],
      [2, 2],
    ],
    0.16,
  );
  yield* snmLeft().release(
    [
      [2, 1],
      [2, 2],
    ],
    0.16,
  );
  yield* waitFor(0.35);
  yield* textRef().opacity(0, 0.25);
  yield* textRef().text("Right click", 0);

  // Right click
  yield* all(
    snmLeft().press(
      [
        [2, 3],
        [2, 2],
      ],
      0.16,
    ),
    textRef().opacity(1, 0.16),
  );
  yield* snmLeft().release(
    [
      [2, 3],
      [2, 2],
    ],
    0.16,
  );
  yield* waitFor(0.15);
  yield* snmLeft().press(
    [
      [2, 3],
      [2, 2],
    ],
    0.16,
  );
  yield* snmLeft().release(
    [
      [2, 3],
      [2, 2],
    ],
    0.16,
  );
  yield* waitFor(0.35);
  yield* textRef().opacity(0, 0.25);
  yield* textRef().text("Middle click", 0);

  // Middle click
  yield* all(
    snmLeft().press(
      [
        [2, 3],
        [2, 1],
      ],
      0.16,
    ),
    textRef().opacity(1, 0.16),
  );
  yield* snmLeft().release(
    [
      [2, 3],
      [2, 1],
    ],
    0.16,
  );
  yield* waitFor(0.15);
  yield* snmLeft().press(
    [
      [2, 3],
      [2, 1],
    ],
    0.16,
  );
  yield* snmLeft().release(
    [
      [2, 3],
      [2, 1],
    ],
    0.16,
  );
  yield* waitFor(0.35);
  yield* textRef().opacity(0, 0.25);

  yield* waitFor(0.25);
});
