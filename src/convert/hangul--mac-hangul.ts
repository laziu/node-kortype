import { assamble, disassamble } from "../language/hangul-syllable";
import { HangulSyllableInfo, NonHangulSyllableInfo } from "../language/hangul-syllable";
import { Choseong, Jungseong, Jongseong, letter2jamo, jamo2letter } from "../language/hangul-jamo";

export function hangul2macHangul(str: string): string {
  const builder: string[] = [];

  for (const hangul of str) {
    const syllable = disassamble(hangul);
    const { raw } = <NonHangulSyllableInfo>syllable;
    const { cho, jung, jong } = <HangulSyllableInfo>syllable;

    if (raw) {
      builder.push(raw);
    } else {
      if (!cho) {
        if (jung) builder.push(jung);
        if (jong) builder.push(jong);
      } else if (!jung) {
        builder.push(cho);
        if (jong) builder.push(jong);
      } else {
        builder.push(letter2jamo(cho, "cho"));
        builder.push(letter2jamo(jung, "jung"));
        if (jong) builder.push(letter2jamo(jong, "jong"));
      }
    }
  }

  return builder.join("");
}

export function macHangul2hangul(str: string): string {
  const builder: (HangulSyllableInfo & NonHangulSyllableInfo)[] = [];

  for (const jamo of str) {
    try {
      const letter = jamo2letter(jamo);

      const last = builder.length > 0 ? builder[builder.length - 1] : null;

      if (!last || last.raw) {
        if (Choseong.includes(jamo)) {
          builder.push({ cho: letter });
        } else if (Jungseong.includes(jamo)) {
          builder.push({ jung: letter });
        } else if (Jongseong.includes(jamo)) {
          builder.push({ jong: letter });
        } else {
          builder.push({ raw: jamo });
        }
      } else if (Choseong.includes(jamo)) {
        // 1 초성
        builder.push({ cho: letter });
      } else if (Jungseong.includes(jamo)) {
        // 2 중성
        if (last.cho && !last.jung) {
          // 2.1 초성 + 중성
          last.jung = letter;
        } else {
          // 2.2 중성
          builder.push({ jung: letter });
        }
      } else if (Jongseong.includes(jamo)) {
        // 3 종성
        if (last.cho && last.jung && !last.jong) {
          // 3.1 초성 + 중성 + 종성
          last.jong = letter;
        } else {
          // 3.2 종성
          builder.push({ jong: letter });
        }
      } else {
        builder.push({ raw: letter });
      }
    } catch (e) {
      builder.push({ raw: jamo }); // no modern jamo
    }
  }

  return builder.map(assamble).join("");
}
