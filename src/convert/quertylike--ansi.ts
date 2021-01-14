import { NonPrintable } from "../language/common";
const Shift = NonPrintable.Shift;

function escape(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceAll(str: string, search: string, replace: string): string {
  return str.replace(new RegExp(escape(search), "g"), replace);
}

/** Shift + [Digit|Symbol] → Corresponding Symbol */
export const ShiftSymbolsLayout: Record<string, string> = {
  "`": "~",
  "1": "!",
  "2": "@",
  "3": "#",
  "4": "$",
  "5": "%",
  "6": "^",
  "7": "&",
  "8": "*",
  "9": "(",
  "0": ")",
  "-": "_",
  "=": "+",
  "[": "{",
  "]": "}",
  "\\": "|",
  ";": ":",
  "'": '"',
  ",": "<",
  ".": ">",
  "/": "?",
};

export function quertylike2ansi(str: string): string {
  for (const [normal, shifted] of Object.entries(ShiftSymbolsLayout)) {
    str = replaceAll(str, shifted, `${Shift}${normal}`);
  }
  return str;
}

export function ansi2quertylike(str: string): string {
  for (const [normal, shifted] of Object.entries(ShiftSymbolsLayout)) {
    str = replaceAll(str, `${Shift}${normal}`, shifted);
  }
  return str;
}
