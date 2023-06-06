/**
 * 字符串相关工具
 */

// 字符串反转
export function reverseStr(str: string) {
  return str.split("").reverse().join("");
}

// 中文数字替换
export function translateNumber(target: string) {
  const chnNumChar: { [k: string]: number } = {
    零: 0,
    一: 1,
    两: 2,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
  };
  const chnNameValue: { [k: string]: { value: number; secUnit: boolean } } = {
    十: { value: 10, secUnit: false },
    百: { value: 100, secUnit: false },
    千: { value: 1000, secUnit: false },
    万: { value: 10000, secUnit: true },
    亿: { value: 100000000, secUnit: true },
  };
  const tmpStr = reverseStr(target).replace(
    new RegExp("[末天日](?=(周|期星))", "g"),
    "7"
  );

  let section = 0;
  let number = 0;
  let rtn = 0;
  let secUnit = false;
  let result = "";
  let flag = false;
  const str = reverseStr(tmpStr).split("");

  for (let i = 0; i < str.length; i++) {
    if (
      chnNumChar.hasOwnProperty(str[i]) ||
      chnNameValue.hasOwnProperty(str[i])
    ) {
      flag = true;

      if (chnNumChar.hasOwnProperty(str[i])) {
        number = chnNumChar[str[i]];
      } else {
        const unit = chnNameValue[str[i]].value;
        secUnit = chnNameValue[str[i]].secUnit;
        if (secUnit) {
          section = (section + number) * unit;
          rtn += section;
          section = 0;
        } else if (number === 0) {
          // 解决十点十分问题
          section += unit;
        } else {
          // 其他情况
          section += number * unit;
        }
        number = 0;
      }
    } else {
      if (flag) {
        result += (rtn + section + number).toString();
        flag = false;
        number = 0;
        section = 0;
        rtn = 0;
        secUnit = false;
      }
      result += str[i];
    }
  }
  if (flag) {
    result += (rtn + section + number).toString();
  }

  return result;
}
