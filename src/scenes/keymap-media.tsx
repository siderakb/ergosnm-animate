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

  const textRef = createRef<Txt>();
  view.add(
    <Txt
      ref={textRef}
      text="Volume 50%"
      //   text="Volume [#####     ]"
      fill={Colors.light}
      fontSize={128}
      position={[0, -500]}
      opacity={0}
      fontFamily={"Inconsolata"}
    />,
  );

  yield* waitUntil("e-op");

  yield* all(
    snmLeft().press([[4, 1]], 0.16),
    snmRight().switchLayer1(0.5),
    snmLeft().switchLayer1(0.5),
  );
  yield* waitFor(0.8);

  yield* all(
    snmLeft().press([[1, 2]], 0.16),
    // textRef().text("Volume 50%", 0.16),
    textRef().opacity(1, 0.16),
  );
  yield* snmLeft().release([[1, 2]], 0.16);
  yield* all(
    snmLeft().press([[1, 2]], 0.16),
    textRef().text("Volume 60%", 0.16),
    // textRef().text("Volume [######    ]", 0.16),
  );
  // yield* snmLeft().release([[1, 2]], 0.16);
  yield* all(
    snmLeft().release([[1, 2],[4,1]], 0.16),
    snmRight().switchLayer0(0.5),
    snmLeft().switchLayer0(0.5),
  );

  /*
  yield* all(
    snmLeft().press([[1, 2]], 0.16),
    textRef().text("Volume 70%", 0.16),
    // textRef().text("Volume [#######   ]", 0.16),
  );
  yield* snmLeft().release([[1, 2]], 0.16);
  yield* all(
    snmLeft().press([[1, 2]], 0.16),
    textRef().text("Volume 80%", 0.16),
    // textRef().text("Volume [########  ]", 0.16),
  );
  yield* snmLeft().release([[1, 2]], 0.16);

  yield* waitFor(0.25);
  yield* all(
    snmLeft().press([[1, 1]], 0.16),
    textRef().text("Volume 70%", 0.16),
    // textRef().text("Volume [#######   ]", 0.16),
  );
  yield* snmLeft().release([[1, 1]], 0.16);
  yield* all(
    snmLeft().press([[1, 1]], 0.16),
    textRef().text("Volume 60%", 0.16),
    // textRef().text("Volume [######    ]", 0.16),
  );
  yield* snmLeft().release([[1, 1]], 0.16);

  yield* waitFor(0.15);
  yield* all(
    snmLeft().press([[1, 0]], 0.16),
    textRef().text("Volume Off", 0.25),
    // textRef().text("Volume [          ]", 0.16),
  );
  yield* snmLeft().release([[1, 0]], 0.16);

  yield* waitFor(0.15);
  yield* all(
    snmLeft().release([[4, 1]], 0.16),
    snmRight().switchLayer0(0.5),
    snmLeft().switchLayer0(0.5),
  );
  */

  yield* textRef().opacity(0, 0.16);
  yield* waitUntil("e-ed");
});
