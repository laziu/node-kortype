import { strict as assert } from "assert";
import { querty2quertylike, quertylike2querty } from "../convert/querty--quertylike";
import { dubeolsik2quertylike, quertylike2dubeolsik } from "../convert/dubeolsik--quertylike";
import { hangul2dubeolsik, dubeolsik2hangul } from "../convert/hangul--dubeolsik";

export type KeyboardType = "querty" | "dubeolsik";
export const SupportedKeyboardType = ["querty", "dubeolsik"];

export type KeyboardConverterOptions = {
  capsLock?: boolean;
};

export class KeyboardConverter {
  value: string;
  type: KeyboardType;
  capsLock: boolean;

  constructor(value: string, type: KeyboardType, options?: KeyboardConverterOptions) {
    assert(SupportedKeyboardType.includes(type));
    const { capsLock = false } = options || {};

    this.value = value;
    this.type = type;
    this.capsLock = capsLock;
  }

  static set(
    value: string,
    type: KeyboardType,
    options?: KeyboardConverterOptions
  ): KeyboardConverter {
    return new this(value, type, options);
  }

  get(): string {
    return this.value;
  }

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
