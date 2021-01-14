/** Unicode Range "Hangul Compatibility Jamo" (U+3130-318F) */
export class Range {
  /** 0x3130 = 'ㄱ' - 1 */
  public static readonly Begin = 0x3130;
  /** 0x3190 = 'ㆎ' + 2 */
  public static readonly End = 0x318f + 1;

  /** Check if unicode character is Hangul Compatibility Jamo */
  public static includes(charCode: number): boolean {
    return this.Begin <= charCode && charCode < this.End;
  }
}

/** Choseong letters, order by Hangul Syllables */
export const Choseong = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";

/** Jungseong letters, order by Hangul Syllables */
export const Jungseong = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";

/** Jongseong letters, order by Hangul Syllables */
export const Jongseong = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";

/** Jungseong + Jungseong → Combined Jungseong */
export const JungseongMerge: Record<string, string> = {
  ㅗㅏ: "ㅘ",
  ㅗㅐ: "ㅙ",
  ㅗㅣ: "ㅚ",
  ㅜㅓ: "ㅝ",
  ㅜㅔ: "ㅞ",
  ㅜㅣ: "ㅟ",
  ㅡㅣ: "ㅢ",
};

/** Jongseong + Jongseong → Combined Jongseong */
export const JongseongMerge: Record<string, string> = {
  ㄱㅅ: "ㄳ",
  ㄴㅈ: "ㄵ",
  ㄴㅎ: "ㄶ",
  ㄹㄱ: "ㄺ",
  ㄹㅁ: "ㄻ",
  ㄹㅂ: "ㄼ",
  ㄹㅅ: "ㄽ",
  ㄹㅌ: "ㄾ",
  ㄹㅍ: "ㄿ",
  ㄹㅎ: "ㅀ",
  ㅂㅅ: "ㅄ",
};

/** Combined Jungseong → Jungseong + Jungseong */
export const JungseongUnmerge: Record<string, string> = Object.entries(JungseongMerge)
  .map(([cc, merged]) => [merged, cc])
  .reduce((acc, [merged, cc]) => ({ ...acc, [merged]: cc }), {});

/** Combined Jongseong → Jongseong + Jongseong */
export const JongseongUnmerge: Record<string, string> = Object.entries(JongseongMerge)
  .map(([vv, merged]) => [merged, vv])
  .reduce((acc, [merged, vv]) => ({ ...acc, [merged]: vv }), {});
