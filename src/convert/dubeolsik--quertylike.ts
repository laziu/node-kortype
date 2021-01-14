import { NonPrintable } from "../language/common";
const Shift = NonPrintable.Shift;

function replaceAll(str: string, search: string, replace: string): string {
  return str.replace(new RegExp(search, "g"), replace);
}

/** 한/영 + Alphabet → Hangul Letter */
export const QuertyDubeolsikLayout: Record<string, string> = {
  q: "ㅂ",
  w: "ㅈ",
  e: "ㄷ",
  r: "ㄱ",
  t: "ㅅ",
  y: "ㅛ",
  u: "ㅕ",
  i: "ㅑ",
  o: "ㅐ",
  p: "ㅔ",
  a: "ㅁ",
  s: "ㄴ",
  d: "ㅇ",
  f: "ㄹ",
  g: "ㅎ",
  h: "ㅗ",
  j: "ㅓ",
  k: "ㅏ",
  l: "ㅣ",
  z: "ㅋ",
  x: "ㅌ",
  c: "ㅊ",
  v: "ㅍ",
  b: "ㅠ",
  n: "ㅜ",
  m: "ㅡ",
};

/** Shift + Hangul Letter → Corresponding Hangul Letter */
export const ShiftHangulLayout: Record<string, string> = {
  ㅂ: "ㅃ",
  ㅈ: "ㅉ",
  ㄷ: "ㄸ",
  ㄱ: "ㄲ",
  ㅅ: "ㅆ",
  ㅐ: "ㅒ",
  ㅔ: "ㅖ",
};

export function dubeolsik2quertylike(str: string): string {
  for (const [normal, shifted] of Object.entries(ShiftHangulLayout)) {
    str = replaceAll(str, shifted, `${Shift}${normal}`);
  }
  for (const [eng, kor] of Object.entries(QuertyDubeolsikLayout)) {
    str = replaceAll(str, kor, eng);
  }
  return str;
}

export function quertylike2dubeolsik(str: string): string {
  for (const [eng, kor] of Object.entries(QuertyDubeolsikLayout)) {
    str = replaceAll(str, eng, kor);
  }
  for (const [normal, shifted] of Object.entries(ShiftHangulLayout)) {
    str = replaceAll(str, `${Shift}${normal}`, shifted);
  }
  return str;
}
