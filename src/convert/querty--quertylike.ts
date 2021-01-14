import { NonPrintable } from "../language/common";
import { ansi2quertylike } from "./quertylike--ansi";
const Shift = NonPrintable.Shift;

function invertCase(char: string): string {
  if (char === char.toUpperCase()) {
    return char.toLowerCase();
  } else {
    return char.toUpperCase();
  }
}

export interface QuertyOptions {
  capsLock?: boolean;
}

export function querty2quertylike(str: string, options: QuertyOptions = {}): string {
  const { capsLock = false } = options;

  str = str.replace(capsLock ? /[a-z]/g : /[A-Z]/g, `${Shift}$&`);
  str = str.toLowerCase();

  return str;
}

export function quertylike2querty(str: string, options: QuertyOptions = {}): string {
  const { capsLock = false } = options;

  str = ansi2quertylike(str);
  str = str.replace(new RegExp(`${Shift}([a-z])`, "g"), ($, $1: string) => $1.toUpperCase());
  if (capsLock) {
    str = str.replace(/[A-Za-z]/g, invertCase);
  }

  return str;
}
