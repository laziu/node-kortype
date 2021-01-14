import { strict as assert } from "assert";
import { hangul2dubeolsik, dubeolsik2hangul } from "../convert/hangul--dubeolsik";
import { hangul2macHangul, macHangul2hangul } from "../convert/hangul--mac-hangul";

export type HangulType = "keystroke" | "complete" | "mac";
export const SupportedHangulType = ["keystroke", "complete", "mac"];

/** Convert Hangul codepoints to the another */
export class HangulConverter {
  /** Current string */
  value: string;
  /** Current Hangul type */
  type: HangulType;

  /**
   * @param value     initial string value
   * @param type      initial keyboard layout
   */
  constructor(value: string, type: HangulType) {
    assert(SupportedHangulType.includes(type));
    this.value = value;
    this.type = type;
  }

  /**
   * Wrapper of constructor
   * @param value     initial string value
   * @param type      initial keyboard layout
   */
  static set(value: string, type: HangulType): HangulConverter {
    return new this(value, type);
  }

  /** Get current string value */
  get(): string {
    return this.value;
  }

  /**
   * Convert string with specified codepoint type
   * @param type    target codepoint type
   */
  convert(type: HangulType): HangulConverter {
    assert(SupportedHangulType.includes(type));

    if (this.type === type) return this;

    let value = this.value;

    if (this.type === "keystroke") {
      value = dubeolsik2hangul(value);
    } else if (this.type === "mac") {
      value = macHangul2hangul(value);
    }

    if (type === "keystroke") {
      value = hangul2dubeolsik(value);
    } else if (type === "mac") {
      value = hangul2macHangul(value);
    }

    this.value = value;
    this.type = type;
    return this;
  }
}
