export const OneDarkProColors = {
  dark: "#282C34",
  gray: "#5C6370",
  light: "#ABB2BF",
  red: "#E06C75",
  green: "#98C379",
  yellow: "#E5C07B",
  blue: "#61AFEF",
  purple: "#C678DD",
  cyan: "#56B6C2",
  orange: "#D19A66",
};

export const NordColors = {
  dark0: "#2E3440",
  dark1: "#3B4252",
  dark2: "#434C5E",
  dark3: "#4C566A",

  light0: "#D8DEE9",
  light1: "#E5E9F0",
  light2: "#ECEFF4",

  frost0: "#8FBCBB",
  frost1: "#88C0D0",
  frost2: "#81A1C1",
  frost3: "#5E81AC",

  red: "#BF616A",
  orange: "#D08770",
  yellow: "#EBCB8B",
  green: "#A3BE8C",
  purple: "#B48EAD",
};

export class Colors {
  static readonly deepDark = "#282C34";
  static readonly dark = "#3B4252";
  static readonly lightDark = "#4c566a";
  static readonly light = "#E5E9F0";

  static readonly red = "#BF616A";
  static readonly green = "#A3BE8C";
  static readonly orange = OneDarkProColors.orange;
}

export class KeyCapDefine {
  static readonly sideLength = 100;
  static readonly radius = 10;
  static readonly spacing = this.sideLength + 8;

  static readonly fontSize = 42;
  static readonly fontColor = Colors.light;

  static readonly highlightColor = Colors.red;
}
