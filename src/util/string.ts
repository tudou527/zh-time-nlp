// 字符串翻转
export function reverseStr(str: string) {
  return str.split('').reverse().join('');
}

export function wordToNumber(str: string) {
  const chnNumChar: { [k: string]: number } = {
    '0': 0,
    '零': 0,
    '一': 1,
    '1': 1,
    '二': 2,
    '两': 2,
    '2': 2,
    '三': 3,
    '3': 3,
    '四': 4,
    '4': 4,
    '五': 5,
    '5': 5,
    '六': 6,
    '6': 6,
    '七': 7,
    '天': 7,
    '日': 7,
    '末': 7,
    '7': 7,
    '八': 8,
    '8': 8,
    '九': 9,
    '9': 9,
  };

  return typeof chnNumChar[str] === 'undefined' ? -1 : chnNumChar[str];
}

// 中文数字替换
export function translateNumber(str: string) {
  let regExp: RegExp;
  let targetStr = str;
  const baseRegStr = '[一二两三四五六七八九123456789]';

  // 万分位
  regExp = new RegExp(`${baseRegStr}万${baseRegStr}(?!(千|百|十))`, 'g');
  targetStr.match(regExp)?.forEach((matchStr) => {
    let num = 0;
    const val = matchStr.split('万').filter((s) => !!s);
    if (val.length === 2) {
      num += wordToNumber(val[0]) * 10000 + wordToNumber(val[1]) * 1000;
    }
    targetStr = targetStr.replace(matchStr, num.toString());
  });

  // 千分位
  regExp = new RegExp(`${baseRegStr}千${baseRegStr}(?!(百|十))`, 'g');
  targetStr.match(regExp)?.forEach((matchStr) => {
    let num = 0;
    const val = matchStr.split('千').filter((s) => !!s);
    if (val.length === 2) {
      num += wordToNumber(val[0]) * 1000 + wordToNumber(val[1]) * 100;
    }
    targetStr = targetStr.replace(matchStr, num.toString());
  });

  // 百分位
  regExp = new RegExp(`${baseRegStr}百${baseRegStr}(?!(十))`, 'g');
  targetStr.match(regExp)?.forEach((matchStr) => {
    let num = 0;
    const val = matchStr.split('百').filter((s) => !!s);
    if (val.length === 2) {
      num += wordToNumber(val[0]) * 100 + wordToNumber(val[1]) * 10;
    }

    targetStr = targetStr.replace(matchStr, num.toString());
  });

  // 个位
  regExp = new RegExp('[零一二两三四五六七八九]', 'g');
  targetStr.match(regExp)?.forEach((matchStr) => {
    targetStr = targetStr.replace(matchStr, wordToNumber(matchStr).toString());
  });

  // 周末
  let tmpStr = reverseStr(targetStr);
  const rule = new RegExp('[末天日](?=(周|期星))', 'g');
  tmpStr = tmpStr.replace(rule, '7');
  targetStr = reverseStr(tmpStr);

  // 十分位
  regExp = new RegExp('(?<!(周|星期))0?[0-9]?十[0-9]?', 'g');
  targetStr.match(regExp)?.forEach((matchStr) => {
    const val = matchStr.split('十');
    const ten = parseInt(val[0], 10) || 1;
    const num = ten * 10 + (parseInt(val[1], 10) || 0);

    targetStr = targetStr.replace(matchStr, num.toString());
  });

  regExp = new RegExp('0?[1-9]百[0-9]?[0-9]?', 'g');
  targetStr.match(regExp)?.forEach((matchStr) => {
    let num = 0;
    const val = matchStr.split('百').filter((s) => !!s);
    if (val.length === 1) {
      num += parseInt(val[0], 10) * 100;
    } else if (val.length === 2) {
      num += parseInt(val[0], 10) * 100 + parseInt(val[1], 10);
    }

    targetStr = targetStr.replace(matchStr, num.toString());
  });

  regExp = new RegExp('0?[1-9]千[0-9]?[0-9]?[0-9]?', 'g');
  targetStr.match(regExp)?.forEach((matchStr) => {
    let num = 0;
    const val = matchStr.split('千').filter((s) => !!s);
    if (val.length === 1) {
      num += parseInt(val[0], 10) * 1000;
    } else if (val.length === 2) {
      num += parseInt(val[0], 10) * 1000 + parseInt(val[1], 10);
    }

    targetStr = targetStr.replace(matchStr, num.toString());
  });

  regExp = new RegExp('[0-9]+万[0-9]?[0-9]?[0-9]?[0-9]?', 'g');
  targetStr.match(regExp)?.forEach((matchStr) => {
    let num = 0;
    const val = matchStr.split('万').filter((s) => !!s);
    if (val.length === 1) {
      num += parseInt(val[0], 10) * 10000;
    } else if (val.length === 2) {
      num += parseInt(val[0], 10) * 10000 + parseInt(val[1], 10);
    }

    targetStr = targetStr.replace(matchStr, num.toString());
  });

  return targetStr;
}

// 全角转半角
export function toCDB(str: string) {
  let tmp = '';
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else {
      tmp += String.fromCharCode(str.charCodeAt(i));
    }
  }
  return tmp;
}
