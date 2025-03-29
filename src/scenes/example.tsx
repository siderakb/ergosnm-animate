import { Circle, Img, makeScene2D, Rect } from "@motion-canvas/2d";
import { createRef, ThreadGenerator } from "@motion-canvas/core";
import { Colors, KeyCap } from "@src/config";
import { Keycap } from "@src/components/keycap";

import img from "@images/case_r.svg";
import kle from "@images/ergosnm-kle.svg";

export default makeScene2D(function* (view) {
  view.fill(Colors.deepDark); // Background color

  const imgRef = createRef<Img>();
  view.add(<Img ref={imgRef} scale={2} x={-515} src={img} />);
  view.add(<Img scale={2} src={kle} />);

  const imgPosition = imgRef().position;

  const keycapsRight = genKeycapsRight(
    imgPosition.x() - 430,
    imgPosition.y() - 290,
  );
  keycapsRight.forEach((item) => view.add(item));

  const kcrt = genKeycapsRightThumb(
    imgPosition.x() + 322,
    imgPosition.y() + 239,
  );
  view.add(kcrt);

  const keycapsLeft = genKeycapsLeft(
    imgPosition.x() + 920,
    imgPosition.y() - 290,
  );
  keycapsLeft.forEach((item) => view.add(item));

  yield;
});

function genKeycapsRight(rootX: number, rootY: number) {
  const colOffset = [0, 0, -28, -42, -28, -14];
  const labelTable = [
    ["", "1", "2", "3", "4", "5"],
    ["", "Q", "W", "E", "R", "T"],
    ["", "A", "S", "D", "F", "G"],
    ["", "Z", "X", "C", "V", "B"],
    ["", "", "", "", "Fn", ""],
  ];

  const keycaps = [];

  for (let col = 0; col < 6; ++col) {
    for (let row = 0; row < 5; ++row) {
      if (col === 5 && row === 4) break; // Skip

      const x = rootX + col * KeyCap.spacing;
      const y = rootY + row * KeyCap.spacing + colOffset[col];
      const label = labelTable[row][col];

      keycaps.push(<Keycap position={[x, y]} label={label} fill={"red"} />);
    }
  }

  return keycaps;
}

function genKeycapsRightThumb(rootX: number, rootY: number) {
  const keycaps = [];

  for (let col = 0; col < 3; ++col) {
    for (let row = 0; row < 2; ++row) {
      const x = rootX + col * KeyCap.spacing;
      const y = rootY + row * KeyCap.spacing;

      keycaps.push(<Keycap position={[x, y]} fill={"green"} />);
    }
  }

  const layout = <Rect rotation={30}>{keycaps}</Rect>;

  return layout;
}

function genKeycapsLeft(rootX: number, rootY: number) {
  const colOffset = [-14, -28, -42, -28, 0, 0];
  const labelTable = [
    ["6", "7", "8", "9", "0", ""],
    ["Y", "U", "I", "O", "P", ""],
    ["H", "J", "K", "L", ":", ""],
    ["N", "M", "<", ">", "?", ""],
    ["", "Fn", "", "", "", ""],
  ];

  const keycaps = [];

  for (let col = 0; col < 6; ++col) {
    for (let row = 0; row < 5; ++row) {
      if (col === 0 && row === 4) break; // Skip

      const x = rootX + col * KeyCap.spacing;
      const y = rootY + row * KeyCap.spacing + colOffset[col];
      const label = labelTable[row][col];

      keycaps.push(<Keycap position={[x, y]} label={label} fill={"red"} />);
    }
  }

  return keycaps;
}
