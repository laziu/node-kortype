# node-kortype

eng2kor and Hangul codepoint translation with Typescript support.  
한영타변환기, 윈도우/맥 한글 변환기

## Installation

```sh
npm install kortype
```

The package requires Node.js >= 10.

## Usage

### Example

```ts
import { KeyboardConverter, HangulConverter } from "kortype";

const mistyped = `rmsrj djqtsms sodyddmf rptlgkwl aktlqtldh.`;
const corrected = KeyboardConverter.set(mistyped, "querty").convert("dubeolsik").get();
console.log(corrected); // '근거 없는 내용을 게시하지 마십시오.'

const mactyped = `ㄱㄴㄷ보고서_최종_최종.pdf`;
const normalized = HangulConverter.set(mactyped, "mac").convert("complete").get();
const keystrokes = HangulConverter.set(mactyped, "mac").convert("keystroke").get();
console.log(normalized); // 'ㄱㄴㄷ보고서_최종_최종.pdf'
console.log(keystrokes); // 'ㄱㄴㄷㅂㅗㄱㅗㅅㅓ_ㅊㅗㅣㅈㅗㅇ_ㅊㅗㅣㅈㅗㅇ.pdf'
```

### Features

- Convert mistyped string between Querty and Dubeolsik keyboard layout.
- Convert Hangul codepoint between the standard string (U+AC00-D7AF) and macOS-style jamo string (U+1100-11FF).
- Convert Hangul keystrokes to merged syllables.
- Supports Typescript.

## API

### KeyboardConverter

#### `KeyboardConverter.set(value: string, type: "querty" | "dubeolsik", { capsLock?: boolean })`

Create KeyboardConverter instance with the initial state.  
`KeyboardConverter.set()` is same with `new KeyboardConverter()`.

- `capsLock` - CapsLock status while typing. If `true`, the letter case will be inverted.

#### `instance.convert(type: "querty" | "dubeolsik")`

Convert string with the specified keyboard layout.

#### `instance.get()`

Get converted string value.  
`instance.get()` is same with `instance.value`.

### HangulConverter

#### `HangulConverter.set(value: string, type: "complete" | "mac" | "keystroke")`

Create HangulConverter instance with the initial state.  
`HangulConverter.set()` is same with `new KeyboardConverter()`.

#### `instance.convert(type: "complete" | "mac" | "keystroke")`

Convert string with specified codepoint type.

- "complete" - Normal Hangul string consists of Hangul Syllables (U+AC00-D7AF) and Letters (U+3130-318F).
- "mac" - macOS-style Hangul composite string consists of Hangul Jamo (U+1100-11FF) and Letters (U+3130-318F).
- "keystroke" - Destructed Hangul Letters sequence only consists of Dubeolsik keys (U+3130-318F).

#### `instance.get()`

Get converted string value.  
`instance.get()` is same with `instance.value`.

## Contributing

Thank you for considering contributing to the project! ❤️  
I'll accept your pull request if it:

- **has tests**
- looks reasonable
- does not break backward compatibility
- linted & formatted properly (use eslint and prettier)

If your change breaks backward compatibility, please clarify it in the pull request then we should discuss about it.

## License

This repository is licensed under the MIT license. See [LICENSE](LICENSE).
