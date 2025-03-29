import { makeScene2D } from "@motion-canvas/2d";
import { Colors } from "@src/config";

import { ErgoSnmRight } from "@src/components/ergosnm-right";
import { ErgoSnmLeft } from "@src/components/ergosnm-left";
import { createRef, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  view.fill(Colors.deepDark); // Background color

  const snmLeft = createRef<ErgoSnmLeft>();

  view.add(<ErgoSnmRight position={[-620, 0]} />);
  view.add(<ErgoSnmLeft ref={snmLeft} position={[620, 0]} />);

  yield* waitFor(0.5);
  yield* snmLeft().press(1, 1, 0.5);
});
