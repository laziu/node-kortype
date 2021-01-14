/** Unicode Range "Hangul Syllables" (U+AC00-D7AF) */
export class Range {
  /** 0xAC00 = '가' */
  public static readonly Begin = "가".charCodeAt(0);
  /** 0xD7A4 = '힣' + 1 */
  public static readonly End = "힣".charCodeAt(0) + 1;

  /** Check if unicode character is Hangul Syllables */
  public static includes(charCode: number): boolean {
    return this.Begin <= charCode && charCode < this.End;
  }
}

/** Represents single Hangul syllable */
export type HangulSyllableInfo = {
  cho?: string;
  jung?: string;
  jong?: string;
};
/** Represents single Non-Hangul letter */
export type NonHangulSyllableInfo = {
  raw?: string;
};

import { strict as assert } from "assert";
import { Choseong, Jungseong, Jongseong } from "./hangul-letter";

/** Construct single Hangul Syllable character */
export function assamble(syllable: HangulSyllableInfo | NonHangulSyllableInfo): string {
  const { raw } = <NonHangulSyllableInfo>syllable;
  if (raw) return raw;

  const { cho, jung, jong } = <HangulSyllableInfo>syllable;

  assert(!cho || Choseong.includes(cho));
  assert(!jung || Jungseong.includes(jung));
  assert(!jong || Jongseong.includes(jong));

  if (!cho) return [jung, jong].filter((v) => v).join("");
  if (!jung) return [cho, jong].filter((v) => v).join("");

  const choIndex = Choseong.indexOf(cho);
  const jungIndex = Jungseong.indexOf(jung);
  const jongIndex = jong ? 1 + Jongseong.indexOf(jong) : 0;

  const jungLen = Jungseong.length;
  const jongLen = Jongseong.length + 1;

  const charCode = Range.Begin + (choIndex * jungLen + jungIndex) * jongLen + jongIndex;

  return String.fromCharCode(charCode);
}

/** Destruct single Hangul Syllable character */
export function disassamble(char: string): HangulSyllableInfo | NonHangulSyllableInfo {
  assert(char.length === 1);

  if (Choseong.includes(char)) return { cho: char };
  if (Jungseong.includes(char)) return { jung: char };
  if (Jongseong.includes(char)) return { jong: char };

  const charCode = char.charCodeAt(0);

  if (Range.includes(charCode)) {
    const jungLen = Jungseong.length;
    const jongLen = Jongseong.length + 1;

    let charOffset = charCode - Range.Begin;
    const jongIndex = charOffset % jongLen;
    charOffset = (charOffset - jongIndex) / jongLen;
    const jungIndex = charOffset % jungLen;
    charOffset = (charOffset - jungIndex) / jungLen;
    const choIndex = charOffset;

    const cho = Choseong[choIndex];
    const jung = Jungseong[jungIndex];
    const jong = jongIndex > 0 ? Jongseong[jongIndex - 1] : undefined;

    return { cho, jung, jong };
  }

  return { raw: char };
}
