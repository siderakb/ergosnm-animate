import { Img, makeScene2D, Txt } from "@motion-canvas/2d";
import { Colors } from "@src/config";

import { ErgoSnmRight } from "@src/components/ergosnm-right";
import { ErgoSnmLeft } from "@src/components/ergosnm-left";
import { all, createRef, waitFor } from "@motion-canvas/core";

import { Mouse } from "@src/components/mouse";
import { Monitor } from "@src/components/monitor";

import mouseSvg from "@images/mouse.svg";

export default makeScene2D(function* (view) {
  // view.fill(Colors.deepDark); // Background color

  const snmY = 250;
  const snmX = 750;
  const snmScale = 1.25;
  const snmRight = createRef<ErgoSnmRight>();
  const snmLeft = createRef<ErgoSnmLeft>();
  view.add(<ErgoSnmRight ref={snmRight} x={-snmX} y={snmY} scale={snmScale} />);
  view.add(<ErgoSnmLeft ref={snmLeft} x={snmX} y={snmY} scale={snmScale} />);

  view.add(<Img src={mouseSvg} scale={0.8} />);

  // view.add(<Mouse fill={Colors.dark} primaryColor={Colors.red} />);
  // view.add(<Monitor fill={Colors.dark} position={[0, -600]} />);

  const snmY2 = 350;
  const snmX2 = 620;
  yield* all(
    snmRight().position([-snmX2, snmY2], 0.5),
    snmRight().scale(1, 0.5),

    snmLeft().position([snmX2, snmY2], 0.5),
    snmLeft().scale(1, 0.5),
  );

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
