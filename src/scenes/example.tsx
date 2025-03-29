import { Circle, Img, makeScene2D, Rect } from "@motion-canvas/2d";
import { createRef, ThreadGenerator } from "@motion-canvas/core";
import { Colors, KeyCap } from "@src/config";
import { Keycap } from "@src/components/keycap";

import kle from "@images/ergosnm-kle.svg";
import caseRight from "@images/case_right.svg";
import caseLeft from "@images/case_left.svg";

export default makeScene2D(function* (view) {
  view.fill(Colors.deepDark); // Background color

  const imgCaseRightRef = createRef<Img>();
  const imgCaseLeftRef = createRef<Img>();
  view.add(<Img ref={imgCaseRightRef} scale={2} x={-515} src={caseRight} />);
  view.add(
    <Img ref={imgCaseLeftRef} scale={2} x={555} y={-30} src={caseLeft} />,
  );
  view.add(<Img scale={2} src={kle} />);

  const imgPositionRight = imgCaseRightRef().position;
  const imgPositionLeft = imgCaseLeftRef().position;

  const keycapsRight = genKeycapsRight(
    imgPositionRight.x() - 430,
    imgPositionRight.y() - 290,
  );
  keycapsRight.forEach((item) => view.add(item));

  const kcrt = genKeycapsRightThumb(
    imgPositionRight.x() + 322,
    imgPositionRight.y() + 239,
  );
  view.add(kcrt);

  const keycapsLeft = genKeycapsLeft(
    imgPositionLeft.x() + 920 - 515 - 555,
    imgPositionLeft.y() - 290 + 30,
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

      keycaps.push(
        <Keycap position={[x, y]} label={label} fill={Colors.lightDark} />,
      );
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

      keycaps.push(<Keycap position={[x, y]} fill={Colors.lightDark} />);
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

      keycaps.push(
        <Keycap position={[x, y]} label={label} fill={Colors.lightDark} />,
      );
    }
  }

  return keycaps;
}
