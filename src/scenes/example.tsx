import { makeScene2D } from "@motion-canvas/2d";
import { Colors } from "@src/config";

import { ErgoSnmRight } from "@src/components/ergosnm-right";
import { ErgoSnmLeft } from "@src/components/ergosnm-left";
import { all, createRef, waitFor } from "@motion-canvas/core";

import { Mouse } from "@src/components/mouse";
import { Monitor } from "@src/components/monitor";

export default makeScene2D(function* (view) {
  view.fill(Colors.deepDark); // Background color

  const snmRight = createRef<ErgoSnmRight>();
  const snmLeft = createRef<ErgoSnmLeft>();

  const kbY = 350;
  view.add(<ErgoSnmRight ref={snmRight} position={[-620, kbY]} />);
  view.add(<ErgoSnmLeft ref={snmLeft} position={[620, kbY]} />);

  // view.add(<Mouse fill={Colors.dark} primaryColor={Colors.red} />);
  view.add(<Monitor fill={Colors.dark} position={[0, -600]} />);

  yield* waitFor(0.5);
  yield* all(
    snmRight().switchLayer1(0.5),
    snmLeft().press([[4, 1]], 0.16),
    snmLeft().switchLayer1(0.5),
  );
  yield* waitFor(0.5);
  // yield* snmLeft().trackballArrow(true, true, false, false, 1);
  // yield* waitFor(0.5);
  yield* all(
    snmRight().switchLayer0(0.5),
    snmLeft().release([[4, 1]], 0.16),
    snmLeft().switchLayer0(0.5),
  );
  yield* waitFor(0.5);
});
