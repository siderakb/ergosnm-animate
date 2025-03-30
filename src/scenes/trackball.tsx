import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { Colors } from "@src/config";

import { ErgoSnmRight } from "@src/components/ergosnm-right";
import { ErgoSnmLeft } from "@src/components/ergosnm-left";
import { Cursor } from "@src/components/cursor";
import { RightClickMenu } from "@src/components/rightClickMenu";
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

  const cubeRef = createRef<Rect>();
  view.add(
    <Rect
      ref={cubeRef}
      fill={Colors.orange}
      position={[-400, -600]}
      width={100}
      height={0}
      radius={10}
      //   opacity={0}
    />,
  );

  const rightClickMenuRef = createRef<RightClickMenu>();
  view.add(
    <RightClickMenu
      ref={rightClickMenuRef}
      fill={Colors.dark}
      secColor={Colors.lightDark}
      fontColor={Colors.light}
      opacity={0}
    />,
  );

  const cursorRef = createRef<Cursor>();
  view.add(
    <Cursor
      ref={cursorRef}
      fill={Colors.light}
      position={[2500, -800]}
      scale={1.3}
    />,
  );

  //   const textRef = createRef<Txt>();
  //   view.add(
  //     <Txt
  //       ref={textRef}
  //       text="Left click"
  //       fill={Colors.light}
  //       fontSize={128}
  //       position={[0, -500]}
  //       opacity={0}
  //       fontFamily={"Inconsolata"}
  //     />,
  //   );

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
  yield* all(
    cursorRef().position([0, -500], 1.5),
    snmLeft().trackballArrow(true, true, true, true, 1),
  );
  yield* snmLeft().trackballArrow(false, false, false, false, 0.5);

  yield* cubeRef().height(100, 0.25);

  yield* all(
    cursorRef().position([-400, -630], 1),
    snmLeft().trackballArrow(true, true, true, true, 1),
  );
  yield* snmLeft().trackballArrow(false, false, false, false, 0.5);

  // Left click
  yield* all(
    cubeRef().scale(0.85, 0.15),
    snmLeft().press(
      [
        [2, 1],
        [2, 2],
      ],
      0.16,
    ),
  );
  yield* waitFor(0.15);

  const pos1X = 160;
  const pos1y = -550;
  yield* all(
    cubeRef().position([pos1X, pos1y], 1.2),
    cursorRef().position([pos1X, pos1y - 30], 1.2),
    rightClickMenuRef().position([pos1X, pos1y - 30], 0),
    snmLeft().trackballArrow(true, true, true, true, 1),
  );
  yield* snmLeft().trackballArrow(false, false, false, false, 0.5);

  yield* all(
    cubeRef().scale(1, 0.15),
    snmLeft().release(
      [
        [2, 1],
        [2, 2],
      ],
      0.16,
    ),
  );
  yield* waitFor(1);

  // Right click
  yield* all(
    rightClickMenuRef().opacity(1, 0.15),
    snmLeft().press(
      [
        [2, 3],
        [2, 2],
      ],
      0.16,
    ),
  );
  yield* snmLeft().release(
    [
      [2, 3],
      [2, 2],
    ],
    0.16,
  );

  yield* waitFor(1);
  yield* all(
    rightClickMenuRef().opacity(0, 0.15),
    snmLeft().press(
      [
        [2, 1],
        [2, 2],
      ],
      0.16,
    ),
  );
  yield* snmLeft().release(
    [
      [2, 1],
      [2, 2],
    ],
    0.16,
  );

  // Switch layer
  yield* waitFor(1);
  yield* all(
    snmRight().press([[4, 4]], 0.16),
    snmRight().switchLayer1(0.5),
    snmLeft().switchLayer1(0.5),
  );

  // Scroll up
  yield* waitFor(0.5);
  yield* all(
    cubeRef().scale(2, 1.8),
    snmLeft().trackballArrow(true, true, true, true, 1), // TODO
  );
  yield* snmLeft().trackballArrow(false, false, false, false, 1);

  // Switch layer
  yield* waitFor(1);
  yield* all(
    snmRight().release([[4, 4]], 0.16),
    snmRight().switchLayer0(0.5),
    snmLeft().switchLayer0(0.5),
  );

  // Middle click
  yield* waitFor(1);
  yield* all(
    snmLeft().press(
      [
        [2, 3],
        [2, 1],
      ],
      0.16,
    ),
  );

  // Scroll down
  yield* waitFor(1);
  yield* all(
    cubeRef().scale(1, 1.8),
    snmLeft().trackballArrow(true, true, true, true, 0.16), // TODO
  );
  yield* snmLeft().trackballArrow(false, false, false, false, 0.16);

  yield* waitFor(1);
  yield* snmLeft().release(
    [
      [2, 3],
      [2, 1],
    ],
    0.16,
  );

  yield* waitFor(1);
  yield* all(cubeRef().height(0, 0.15), cursorRef().opacity(0, 0.15));

  yield* waitFor(0.25);
});
