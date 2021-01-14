import { strict as assert } from "assert";
import { hangul2dubeolsik, dubeolsik2hangul } from "../convert/hangul--dubeolsik";
import { hangul2macHangul, macHangul2hangul } from "../convert/hangul--mac-hangul";

export type HangulType = "keystroke" | "complete" | "mac";
export const SupportedHangulType = ["keystroke", "complete", "mac"];

export class HangulConverter {
  value: string;
  type: HangulType;

  constructor(value: string, type: HangulType) {
    assert(SupportedHangulType.includes(type));
    this.value = value;
    this.type = type;
  }

  static set(value: string, type: HangulType): HangulConverter {
    return new this(value, type);
  }

  get(): string {
    return this.value;
  }

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
