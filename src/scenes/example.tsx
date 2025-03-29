import { makeScene2D } from "@motion-canvas/2d";
import { Colors } from "@src/config";

import { ErgoSnmRight } from "@src/components/ergosnm-right";
import { ErgoSnmLeft } from "@src/components/ergosnm-left";

export default makeScene2D(function* (view) {
  view.fill(Colors.deepDark); // Background color

  view.add(<ErgoSnmRight position={[-620, 0]} />);
  view.add(<ErgoSnmLeft position={[620, 0]} />);

  yield;
});
