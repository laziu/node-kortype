/** Unicode Range "Hangul Jamo" (U+1100-11FF) */
export class Range {
  /** 0x1100 = 'ᄀ' */
  public static readonly Begin = "ᄀ".charCodeAt(0);
  /** 0x1200 = 'ᇿ' + 1 */
  public static readonly End = "ᇿ".charCodeAt(0) + 1;

  /** Check if unicode character is Hangul Jamo */
  public static includes(charCode: number): boolean {
    return this.Begin <= charCode && charCode < this.End;
  }
}

/** Choseong Jamo, order by Hangul Syllables */
export const Choseong = "ᄀᄁᄂᄃᄄᄅᄆᄇᄈᄉᄊᄋᄌᄍᄎᄏᄐᄑᄒ";

/** Jungseong Jamo, order by Hangul Syllables */
export const Jungseong = "ᅡᅢᅣᅤᅥᅦᅧᅨᅩᅪᅫᅬᅭᅮᅯᅰᅱᅲᅳᅴᅵ";

/** Jongseong Jamo, order by Hangul Syllables */
export const Jongseong = "ᆨᆩᆪᆫᆬᆭᆮᆯᆰᆱᆲᆳᆴᆵᆶᆷᆸᆹᆺᆻᆼᆽᆾᆿᇀᇁᇂ";

import { strict as assert } from "assert";
import { AssertionError } from "chai";
import {
  Choseong as ChoseongLetter,
  Jungseong as JungseongLetter,
  Jongseong as JongseongLetter,
} from "./hangul-letter";
import { Range as LetterRange } from "./hangul-letter";

/** Convert Hangul Letter (Hangul Compatibility Jamo) to Hangul Jamo */
export function letter2jamo(letter: string, position: "cho" | "jung" | "jong"): string {
  assert(letter.length === 1);
  assert(LetterRange.includes(letter.charCodeAt(0)));
  switch (position) {
    case "cho":
      assert(ChoseongLetter.includes(letter));
      return Choseong[ChoseongLetter.indexOf(letter)];
    case "jung":
      assert(JungseongLetter.includes(letter));
      return Jungseong[JungseongLetter.indexOf(letter)];
    case "jong":
      assert(JongseongLetter.includes(letter));
      return Jongseong[JongseongLetter.indexOf(letter)];
  }
}

/** Convert Hangul Jamo to Hangul Letter (Hangul Compatibility Jamo) */
export function jamo2letter(jamo: string): string {
  assert(jamo.length === 1);
  assert(Range.includes(jamo.charCodeAt(0)));
  if (Choseong.includes(jamo)) return ChoseongLetter[Choseong.indexOf(jamo)];
  if (Jungseong.includes(jamo)) return JungseongLetter[Jungseong.indexOf(jamo)];
  if (Jongseong.includes(jamo)) return JongseongLetter[Jongseong.indexOf(jamo)];
  throw new AssertionError(`'${jamo}' is not Modern Hangul Jamo`);
}
