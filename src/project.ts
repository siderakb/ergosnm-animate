import { makeProject } from "@motion-canvas/core";
import example from "./scenes/example?scene";
import opening from "./scenes/opening?scene";
import keymap from "./scenes/keymap?scene";
import keymapNumpad from "./scenes/keymap-numpad?scene";
import keymapMedia from "./scenes/keymap-media?scene";
import keymapArrow from "./scenes/keymap-arrow?scene";
import keymapMouse from "./scenes/keymap-mouse?scene";
import trackball from "./scenes/trackball?scene";
import keyboard100 from "./scenes/keyboard100?scene";

import audio1 from "../../t1_3.mp3";

import { Code, LezerHighlighter } from "@motion-canvas/2d";
import { parser } from "@lezer/javascript";

import "./global.css";

Code.defaultHighlighter = new LezerHighlighter(parser);

export default makeProject({
  scenes: [
    // example,
    // keyboard100,

    opening,
    keymap,
    keymapNumpad,
    keymapMedia,
    keymapArrow,
    keymapMouse,
    trackball,
  ],
  audio: audio1,
});
