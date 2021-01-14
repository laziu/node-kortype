import { assert } from "chai";
import dedent from "ts-dedent";
import { KeyboardConverter } from "./wrapper/keyboard-converter";

describe("Wrapper", () => {
  it("KeyboardConvert", () => {
    const data1 = {
      eng: dedent`
        The quick brown fox jumps over a(the) lazy dog.
        (skfTos rkftor dudnrk rpdmfms rofmf Enldjsjasmsek.-Microsoft Windows rmfRhf qhrl answkd)
        정 참판 양반댁 규수 큰 교자 타고 혼례 치른 날 (Google Chrome)
      `,
      kor: dedent`
        쏟 벼ㅑ차 ㅠ개주 랱 ㅓㅕㅡㅔㄴ ㅐㅍㄷㄱ ㅁ(솓) ㅣㅁ쿄 앻.
        (날쌘 갈색 여우가 게으른 개를 뛰어넘는다.-ㅡㅑㅊ개냀 쨔ㅜ앶ㄴ 글꼴 보기 문장)
        정 참판 양반댁 규수 큰 교자 타고 혼례 치른 날 (해ㅐ힏 초개ㅡㄷ)
      `,
      korCaps: dedent`
        소ㄸ 뼈ㅑ차 ㅠ꺠쭈 럩 ㅓㅕㅡㅖㄴ ㅒㅍㄸㄲ ㅁ(쏘ㄸ) ㅣㅁ쿄 얳.
        (날섄 깔썎 여우까 꼐으른 꺠를 뒤어넘는따.-ㅡㅑㅊ꺠냴ㅆ 쟈ㅜ얘ㅉㄴ 끌골 뽀끼 문짱)
        정 참판 양반댁 규수 큰 교자 타고 혼례 치른 날 (햬ㅒ히ㄸ 초꺠ㅡㄸ)
      `,
    };
    assert.equal(data1.kor, KeyboardConverter.set(data1.eng, "querty").convert("dubeolsik").get());
    assert.equal(
      data1.korCaps,
      KeyboardConverter.set(data1.eng, "querty", { capsLock: true }).convert("dubeolsik").get()
    );

    const data2 = {
      kor: dedent`
        쏟 벼ㅑ차 ㅠ개주 랱 ㅓㅕㅡㅔㄴ ㅐㅍㄷㄱ ㅁ(솓) ㅣㅁ쿄 앻.
        (날쌘 갈색 여우가 게으른 개를 뛰어넘는다.-ㅡㅑㅊ개냀 쨔ㅜ앶ㄴ 글꼴 보기 문장)
        정 참판 양반댁 규수 큰 교자 타고 혼례 치른 날 (Google Chrome)
      `,
      eng: dedent`
        The quick brown fox jumps over a(the) lazy dog.
        (skfTos rkftor dudnrk rpdmfms rofmf Enldjsjasmsek.-microsoft Windows rmfRhf qhrl answkd)
        wjd ckavks didqkseor rbtn zms rywk xkrh ghsfP clfms skf (Google Chrome)
      `,
      engCaps: dedent`
        tHE QUICK BROWN FOX JUMPS OVER A(THE) LAZY DOG.
        (SKFtOS RKFTOR DUDNRK RPDMFMS ROFMF eNLDJSJASMSEK.-MICROSOFT wINDOWS RMFrHF QHRL ANSWKD)
        WJD CKAVKS DIDQKSEOR RBTN ZMS RYWK XKRH GHSFp CLFMS SKF (gOOGLE cHROME)
      `,
    };
    assert.equal(data2.eng, KeyboardConverter.set(data2.kor, "dubeolsik").convert("querty").get());
    assert.equal(
      data2.engCaps,
      KeyboardConverter.set(data2.kor, "dubeolsik", { capsLock: true }).convert("querty").get()
    );
  });
});
