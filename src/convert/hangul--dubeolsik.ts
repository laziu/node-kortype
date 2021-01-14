import {
  Choseong,
  Jungseong,
  Jongseong,
  JungseongMerge,
  JongseongMerge,
  JungseongUnmerge,
  JongseongUnmerge,
} from "../language/hangul-letter";
import { assamble, disassamble } from "../language/hangul-syllable";
import type { HangulSyllableInfo, NonHangulSyllableInfo } from "../language/hangul-syllable";

export function hangul2dubeolsik(str: string): string {
  const builder: string[] = [];

  for (const hangul of str) {
    const syllable = disassamble(hangul);
    const { raw } = <NonHangulSyllableInfo>syllable;
    const { cho, jung, jong } = <HangulSyllableInfo>syllable;

    if (raw) {
      builder.push(raw);
    } else {
      if (cho) {
        builder.push(cho);
      }
      if (jung) {
        if (JungseongUnmerge[jung]) {
          const [jung1, jung2] = JungseongUnmerge[jung];
          builder.push(jung1);
          builder.push(jung2);
        } else {
          builder.push(jung);
        }
      }
      if (jong) {
        if (JongseongUnmerge[jong]) {
          const [jong1, jong2] = JongseongUnmerge[jong];
          builder.push(jong1);
          builder.push(jong2);
        } else {
          builder.push(jong);
        }
      }
    }
  }

  return builder.join("");
}

export function dubeolsik2hangul(str: string): string {
  const builder: (HangulSyllableInfo & NonHangulSyllableInfo)[] = [];

  for (const letter of str) {
    const last = builder.length > 0 ? builder[builder.length - 1] : null;

    if (!last || last.raw) {
      if (Choseong.includes(letter)) {
        builder.push({ cho: letter });
      } else if (Jungseong.includes(letter)) {
        builder.push({ jung: letter });
      } else if (Jongseong.includes(letter)) {
        builder.push({ jong: letter });
      } else {
        builder.push({ raw: letter });
      }
    } else if (Jungseong.includes(letter)) {
      // 1 모음
      if (last.cho && !last.jung) {
        // 1.1 초성 + 중성
        last.jung = letter;
      } else if (last.jung && JungseongMerge[`${last.jung}${letter}`]) {
        // 1.2 중성 + 중성
        last.jung = JungseongMerge[`${last.jung}${letter}`];
      } else if (last.jong && Choseong.includes(last.jong)) {
        // 1.3 종성 + 중성 → 초성 + 중성
        builder.push({ cho: last.jong, jung: letter });
        delete last.jong;
      } else if (last.jong && JongseongUnmerge[last.jong]) {
        // 1.4 복합종성 + 중성 → 종성 + 초성 + 중성
        const [jong, cho] = JongseongUnmerge[last.jong];
        last.jong = jong;
        builder.push({ cho, jung: letter });
      } else {
        builder.push({ jung: letter });
      }
    } else if (Choseong.includes(letter) || Jongseong.includes(letter)) {
      // 2 자음
      if (last.cho && last.jung && !last.jong && Jongseong.includes(letter)) {
        // 2.1 종성
        last.jong = letter;
      } else if (last.jong && JongseongMerge[`${last.jong}${letter}`]) {
        // 2.2 종성 + 종성 → 복합종성
        last.jong = JongseongMerge[`${last.jong}${letter}`];
      } else if (last.cho && !last.jung && JongseongMerge[`${last.cho}${letter}`]) {
        // 2.3 초성 + 종성 → 복합종성
        last.jong = JongseongMerge[`${last.cho}${letter}`];
        delete last.cho;
      } else {
        if (Choseong.includes(letter)) {
          builder.push({ cho: letter });
        } else {
          builder.push({ jong: letter });
        }
      }
    } else {
      builder.push({ raw: letter });
    }
  }

  return builder.map(assamble).join("");
}
