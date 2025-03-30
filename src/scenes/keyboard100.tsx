import { makeScene2D, Txt } from "@motion-canvas/2d";
import { Colors } from "@src/config";

import { all, createRef, waitFor } from "@motion-canvas/core";
import { Keyboard100 } from "@src/components/keyboard100";

export default makeScene2D(function* (view) {
  view.add(<Keyboard100 fill={Colors.dark} />);
});
