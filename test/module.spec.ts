import { assert } from "chai";
import { KeyboardConverter, HangulConverter } from "../dist";

describe("Module", () => {
  it("KeyboardConverter", () => {
    const data = {
      eng: `sjdml ahems rjtdl xkdhfmsek`,
      kor: `너의 모든 것이 타오른다`,
    };
    assert.equal(data.kor, KeyboardConverter.set(data.eng, "querty").convert("dubeolsik").get());
  });

  it("HangulConverter", () => {
    const data = {
      syl: `일하지 않고 돈이 벌고 싶어`,
      key: `ㅇㅣㄹㅎㅏㅈㅣ ㅇㅏㄴㅎㄱㅗ ㄷㅗㄴㅇㅣ ㅂㅓㄹㄱㅗ ㅅㅣㅍㅇㅓ`,
    };
    assert.equal(data.syl, HangulConverter.set(data.key, "keystroke").convert("complete").get());
  });
});
