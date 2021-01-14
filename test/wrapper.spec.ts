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

  it("HangulConverter", () => {
    const data1 = {
      syl: dedent`
        현대 한글 11,172자를 다 사용하려면 문장이 아니라 상당한 길이의 글을 하나 써야 한다.
        현대 한글 11,172자 중 대부분은 현대 한국어ㅓ에 거의 사용되지 않는 글자들인데 예를 들어
        ㅋㅌㅍㅎ + ㅞㅙ + ㄺㄼㅀㅄ 같은 조합으로 퀡퇣풿횂 등 의미가 없고 사용빈도가 거의 없는
        글자를 많이 만들어 낼 수 있다. 그런데 이런 글자를 사용하려면 '뚫훍송'처럼 억지로 글자를
        조합해서 의성어나 고유명사로 사용해야 하는데, 이런 글자로 문장을 만들면 읽는 것조차
        어렵게 되며 괴상한 글이 될 수밖에 없다.
      `,
      mac: dedent`
        현대 한글 11,172자를 다 사용하려면 문장이 아니라 상당한 길이의 글을 하나 써야 한다.
        현대 한글 11,172자 중 대부분은 현대 한국어ㅓ에 거의 사용되지 않는 글자들인데 예를 들어
        ㅋㅌㅍㅎ + ㅞㅙ + ㄺㄼㅀㅄ 같은 조합으로 퀡퇣풿횂 등 의미가 없고 사용빈도가 거의 없는
        글자를 많이 만들어 낼 수 있다. 그런데 이런 글자를 사용하려면 '뚫훍송'처럼 억지로 글자를
        조합해서 의성어나 고유명사로 사용해야 하는데, 이런 글자로 문장을 만들면 읽는 것조차
        어렵게 되며 괴상한 글이 될 수밖에 없다.
      `,
      key: dedent`
        ㅎㅕㄴㄷㅐ ㅎㅏㄴㄱㅡㄹ 11,172ㅈㅏㄹㅡㄹ ㄷㅏ ㅅㅏㅇㅛㅇㅎㅏㄹㅕㅁㅕㄴ ㅁㅜㄴㅈㅏㅇㅇㅣ ㅇㅏㄴㅣㄹㅏ ㅅㅏㅇㄷㅏㅇㅎㅏㄴ ㄱㅣㄹㅇㅣㅇㅡㅣ ㄱㅡㄹㅇㅡㄹ ㅎㅏㄴㅏ ㅆㅓㅇㅑ ㅎㅏㄴㄷㅏ.
        ㅎㅕㄴㄷㅐ ㅎㅏㄴㄱㅡㄹ 11,172ㅈㅏ ㅈㅜㅇ ㄷㅐㅂㅜㅂㅜㄴㅇㅡㄴ ㅎㅕㄴㄷㅐ ㅎㅏㄴㄱㅜㄱㅇㅓㅓㅇㅔ ㄱㅓㅇㅡㅣ ㅅㅏㅇㅛㅇㄷㅗㅣㅈㅣ ㅇㅏㄴㅎㄴㅡㄴ ㄱㅡㄹㅈㅏㄷㅡㄹㅇㅣㄴㄷㅔ ㅇㅖㄹㅡㄹ ㄷㅡㄹㅇㅓ
        ㅋㅌㅍㅎ + ㅜㅔㅗㅐ + ㄹㄱㄹㅂㄹㅎㅂㅅ ㄱㅏㅌㅇㅡㄴ ㅈㅗㅎㅏㅂㅇㅡㄹㅗ ㅋㅜㅔㄹㄱㅌㅗㅐㄹㅂㅍㅜㅔㄹㅎㅎㅗㅐㅂㅅ ㄷㅡㅇ ㅇㅡㅣㅁㅣㄱㅏ ㅇㅓㅂㅅㄱㅗ ㅅㅏㅇㅛㅇㅂㅣㄴㄷㅗㄱㅏ ㄱㅓㅇㅡㅣ ㅇㅓㅂㅅㄴㅡㄴ
        ㄱㅡㄹㅈㅏㄹㅡㄹ ㅁㅏㄴㅎㅇㅣ ㅁㅏㄴㄷㅡㄹㅇㅓ ㄴㅐㄹ ㅅㅜ ㅇㅣㅆㄷㅏ. ㄱㅡㄹㅓㄴㄷㅔ ㅇㅣㄹㅓㄴ ㄱㅡㄹㅈㅏㄹㅡㄹ ㅅㅏㅇㅛㅇㅎㅏㄹㅕㅁㅕㄴ 'ㄸㅜㄹㅎㅎㅜㄹㄱㅅㅗㅇ'ㅊㅓㄹㅓㅁ ㅇㅓㄱㅈㅣㄹㅗ ㄱㅡㄹㅈㅏㄹㅡㄹ
        ㅈㅗㅎㅏㅂㅎㅐㅅㅓ ㅇㅡㅣㅅㅓㅇㅇㅓㄴㅏ ㄱㅗㅇㅠㅁㅕㅇㅅㅏㄹㅗ ㅅㅏㅇㅛㅇㅎㅐㅇㅑ ㅎㅏㄴㅡㄴㄷㅔ, ㅇㅣㄹㅓㄴ ㄱㅡㄹㅈㅏㄹㅗ ㅁㅜㄴㅈㅏㅇㅇㅡㄹ ㅁㅏㄴㄷㅡㄹㅁㅕㄴ ㅇㅣㄹㄱㄴㅡㄴ ㄱㅓㅅㅈㅗㅊㅏ
        ㅇㅓㄹㅕㅂㄱㅔ ㄷㅗㅣㅁㅕ ㄱㅗㅣㅅㅏㅇㅎㅏㄴ ㄱㅡㄹㅇㅣ ㄷㅗㅣㄹ ㅅㅜㅂㅏㄲㅇㅔ ㅇㅓㅂㅅㄷㅏ.
      `,
    };

    assert.equal(data1.key, HangulConverter.set(data1.syl, "complete").convert("keystroke").get());
    assert.equal(data1.mac, HangulConverter.set(data1.syl, "complete").convert("mac").get());
    assert.equal(data1.syl, HangulConverter.set(data1.key, "keystroke").convert("complete").get());
    assert.equal(data1.mac, HangulConverter.set(data1.key, "keystroke").convert("mac").get());
    assert.equal(data1.syl, HangulConverter.set(data1.mac, "mac").convert("complete").get());
    assert.equal(data1.key, HangulConverter.set(data1.mac, "mac").convert("keystroke").get());
  });
});
