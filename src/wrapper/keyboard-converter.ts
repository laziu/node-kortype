import { strict as assert } from "assert";
import { querty2quertylike, quertylike2querty } from "../convert/querty--quertylike";
import { dubeolsik2quertylike, quertylike2dubeolsik } from "../convert/dubeolsik--quertylike";
import { hangul2dubeolsik, dubeolsik2hangul } from "../convert/hangul--dubeolsik";

export type KeyboardType = "querty" | "dubeolsik";
export const SupportedKeyboardType = ["querty", "dubeolsik"];

export type KeyboardConverterOptions = {
  /** Caps Lock status while typing */
  capsLock?: boolean;
};

/** Convert keystrokes to the another layout */
export class KeyboardConverter {
  /** Current string */
  value: string;
  /** Current keyboard layout */
  type: KeyboardType;
  /** Caps Lock status while typing */
  capsLock: boolean;

  /**
   * @param value     initial string value
   * @param type      initial keyboard layout
   * @param options   converter options
   */
  constructor(value: string, type: KeyboardType, options?: KeyboardConverterOptions) {
    assert(SupportedKeyboardType.includes(type));
    const { capsLock = false } = options || {};

    this.value = value;
    this.type = type;
    this.capsLock = capsLock;
  }

  /**
   * Wrapper of constructor
   * @param value     initial string value
   * @param type      initial keyboard layout
   * @param options   converter options
   */
  static set(
    value: string,
    type: KeyboardType,
    options?: KeyboardConverterOptions
  ): KeyboardConverter {
    return new this(value, type, options);
  }

  /** Get current string value */
  get(): string {
    return this.value;
  }

  /**
   * Type string with specified keyboard layout
   * @param type    target keyboard layout
   */
  convert(type: KeyboardType): KeyboardConverter {
    assert(SupportedKeyboardType.includes(type));
    if (this.type === type) {
      return this;
    } else if (this.type === "querty" && type === "dubeolsik") {
      let value = this.value;
      value = querty2quertylike(value, { capsLock: this.capsLock });
      value = quertylike2dubeolsik(value);
      value = dubeolsik2hangul(value);
      this.value = value;
    } else if (this.type === "dubeolsik" && type === "querty") {
      let value = this.value;
      value = hangul2dubeolsik(value);
      value = dubeolsik2quertylike(value);
      value = quertylike2querty(value, { capsLock: this.capsLock });
      this.value = value;
    }
    this.type = type;
    return this;
  }
}
