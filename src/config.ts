export class Colors {
  static readonly deepDark = "#282C34";
  static readonly dark = "#3B4252";
  static readonly lightDark = "#4c566a";
  static readonly light = "#E5E9F0";

  static readonly red = "#BF616A";
  static readonly green = "#A3BE8C";
}

export class KeyCap {
  static readonly sideLength = 100;
  static readonly radius = 10;
  static readonly spacing = this.sideLength + 8;

  static readonly fontSize = 36;
  static readonly fontColor = Colors.light;

  static readonly highlightColor = Colors.red;
}
