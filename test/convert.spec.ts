import { assert } from "chai";
import { NonPrintable } from "../src/language/common";
import { querty2quertylike, quertylike2querty } from "../src/convert/querty--quertylike";
import type { QuertyOptions } from "../src/convert/querty--quertylike";
import { quertylike2ansi, ansi2quertylike } from "../src/convert/quertylike--ansi";
import { dubeolsik2quertylike, quertylike2dubeolsik } from "../src/convert/dubeolsik--quertylike";
import { hangul2dubeolsik, dubeolsik2hangul } from "../src/convert/hangul--dubeolsik";
import { hangul2macHangul, macHangul2hangul } from "../src/convert/hangul--mac-hangul";

const S = NonPrintable.Shift;

interface CommonData {
  type: string;
}

interface Querty2QuertylikeData extends CommonData {
  type: "querty--quertylike";
  querty: string;
  quertylike: string;
  options?: QuertyOptions;
}

interface Quertylike2AnsiData extends CommonData {
  type: "quertylike--ansi";
  quertylike: string;
  ansi: string;
}

interface Dubeolsik2QuertylikeData extends CommonData {
  type: "dubeolsik--quertylike";
  quertylike: string;
  dubeolsik: string;
}

interface Hangul2DubeolsikData extends CommonData {
  type: "hangul--dubeolsik";
  hangul: string;
  dubeolsik: string;
}

interface Hangul2MacHangulData extends CommonData {
  type: "hangul--mac-hangul";
  hangul: string;
  macHangul: string;
}

type Data =
  | Querty2QuertylikeData
  | Quertylike2AnsiData
  | Dubeolsik2QuertylikeData
  | Hangul2DubeolsikData
  | Hangul2MacHangulData;

const dataset: Data[] = [
  {
    type: "querty--quertylike",
    querty: "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",
    quertylike: "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ"
      .replace(/[A-Z]/g, `${S}$&`)
      .toLowerCase(),
  },
  {
    type: "querty--quertylike",
    querty: "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",
    quertylike: "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ"
      .replace(/[a-z]/g, `${S}$&`)
      .toLowerCase(),
    options: {
      capsLock: true,
    },
  },
  {
    type: "querty--quertylike",
    querty: `[ABC]`,
    quertylike: `[${S}a${S}b${S}c]`,
  },
  {
    type: "quertylike--ansi",
    quertylike: `\`1234567890-=[]\\;',./` + `~!@#$%^&*()_+{}|:"<>?`,
    ansi: `\`1234567890-=[]\\;',./` + `\`1234567890-=[]\\;',./`.replace(/./g, `${S}$&`),
  },
  {
    type: "dubeolsik--quertylike",
    quertylike: `qwertyuiopasdfghjklzxcvbnm${S}q${S}w${S}e${S}r${S}t${S}o${S}p`,
    dubeolsik: `ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔㅁㄴㅇㄹㅎㅗㅓㅏㅣㅋㅌㅊㅍㅠㅜㅡㅃㅉㄸㄲㅆㅒㅖ`,
  },
  {
    type: "hangul--dubeolsik",
    hangul: `"웬 초콜릿? 제가 원했던 건 뻥튀기 쬐끔과 의류예요." "얘야, 왜 또 불평?"`,
    dubeolsik: `"ㅇㅜㅔㄴ ㅊㅗㅋㅗㄹㄹㅣㅅ? ㅈㅔㄱㅏ ㅇㅜㅓㄴㅎㅐㅆㄷㅓㄴ ㄱㅓㄴ ㅃㅓㅇㅌㅜㅣㄱㅣ ㅉㅗㅣㄲㅡㅁㄱㅗㅏ ㅇㅡㅣㄹㅠㅇㅖㅇㅛ." "ㅇㅒㅇㅑ, ㅇㅗㅐ ㄸㅗ ㅂㅜㄹㅍㅕㅇ?"`,
  },
  {
    type: "hangul--mac-hangul",
    hangul: `"웬 초콜릿? 제가 원했던 건 뻥튀기 쬐끔과 의류예요." "얘야, 왜 또 불평?"`,
    macHangul: `"웬 초콜릿? 제가 원했던 건 뻥튀기 쬐끔과 의류예요." "얘야, 왜 또 불평?"`,
  },
];

describe("Convert", () => {
  it("Querty → Quertylike", () => {
    for (const data of dataset.filter(({ type }) => type === "querty--quertylike")) {
      const { querty, quertylike, options } = <Querty2QuertylikeData>data;
      assert.equal(querty2quertylike(querty, options), quertylike);
    }
  });

  it("Quertylike → Querty", () => {
    for (const data of dataset.filter(({ type }) => type === "querty--quertylike")) {
      const { querty, quertylike, options } = <Querty2QuertylikeData>data;
      assert.equal(quertylike2querty(quertylike, options), querty);
    }
  });

  it("Quertylike → ANSI", () => {
    for (const data of dataset.filter(({ type }) => type === "quertylike--ansi")) {
      const { quertylike, ansi } = <Quertylike2AnsiData>data;
      assert.equal(quertylike2ansi(quertylike), ansi);
    }
  });

  it("ANSI → Quertylike", () => {
    for (const data of dataset.filter(({ type }) => type === "quertylike--ansi")) {
      const { quertylike, ansi } = <Quertylike2AnsiData>data;
      assert.equal(ansi2quertylike(ansi), quertylike);
    }
  });

  it("Dubeolsik → Quertylike", () => {
    for (const data of dataset.filter(({ type }) => type === "dubeolsik--quertylike")) {
      const { quertylike, dubeolsik } = <Dubeolsik2QuertylikeData>data;
      assert.equal(dubeolsik2quertylike(dubeolsik), quertylike);
    }
  });

  it("Quertylike → Dubeolsik", () => {
    for (const data of dataset.filter(({ type }) => type === "dubeolsik--quertylike")) {
      const { quertylike, dubeolsik } = <Dubeolsik2QuertylikeData>data;
      assert.equal(quertylike2dubeolsik(quertylike), dubeolsik);
    }
  });

  it("Hangul → Dubeolsik", () => {
    for (const data of dataset.filter(({ type }) => type === "hangul--dubeolsik")) {
      const { hangul, dubeolsik } = <Hangul2DubeolsikData>data;
      assert.equal(hangul2dubeolsik(hangul), dubeolsik);
    }
  });

  it("Dubeolsik → Hangul", () => {
    for (const data of dataset.filter(({ type }) => type === "hangul--dubeolsik")) {
      const { hangul, dubeolsik } = <Hangul2DubeolsikData>data;
      assert.equal(dubeolsik2hangul(dubeolsik), hangul);
    }
  });

  it("Hangul → Mac Hangul", () => {
    for (const data of dataset.filter(({ type }) => type === "hangul--mac-hangul")) {
      const { hangul, macHangul } = <Hangul2MacHangulData>data;
      assert.equal(hangul2macHangul(hangul), macHangul);
    }
  });

  it("Mac Hangul → Hangul", () => {
    for (const data of dataset.filter(({ type }) => type === "hangul--mac-hangul")) {
      const { hangul, macHangul } = <Hangul2MacHangulData>data;
      assert.equal(macHangul2hangul(macHangul), hangul);
    }
  });
});
