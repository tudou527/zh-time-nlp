/**
 * 本用例由 OpenAI 辅助编写
 */
import { reverseStr, toCDB, translateNumber } from "@/util/string";

describe('string util', () => {
  test('reverseStr', () => {
    const str = reverseStr('处理自然语言中的时间');
    
    expect(str).toBe('间时的中言语然自理处');
  });

  describe('translateNumber', () => {
    test('周x', () => {
      const strList = ['周一','周二','周三','周四','周五','周六','周日'].map(str => translateNumber(str));
      expect(strList).toStrictEqual(['周1','周2','周3','周4','周5','周6','周7']);
    });

    test('中文大写数字', () => {
      expect(translateNumber('零点零分')).toBe('0点0分');
      expect(translateNumber('一点一分')).toBe('1点1分');
      expect(translateNumber('两点二分')).toBe('2点2分');
      expect(translateNumber('两点二分')).toBe('2点2分');
      expect(translateNumber('三点三分')).toBe('3点3分');
      expect(translateNumber('四点四分')).toBe('4点4分');
      expect(translateNumber('五点五分')).toBe('5点5分');
      expect(translateNumber('六点六分')).toBe('6点6分');
      expect(translateNumber('七点七分')).toBe('7点7分');
      expect(translateNumber('八点八分')).toBe('8点8分');
      expect(translateNumber('九点九分')).toBe('9点9分');
      expect(translateNumber('十点十分')).toBe('10点10分');
    });

    test('阿拉伯数字', () => {
      expect(translateNumber('三万六')).toBe('36000');
      expect(translateNumber('三千四')).toBe('3400');
      expect(translateNumber('5万零3')).toBe('50003');
      expect(translateNumber('5万')).toBe('50000');
      expect(translateNumber('2千零1')).toBe('2001');
      expect(translateNumber('2千')).toBe('2000');
      expect(translateNumber('1百零2')).toBe('102');
      expect(translateNumber('1百')).toBe('100');
      expect(translateNumber('1百贰')).toBe('100贰');

      expect(translateNumber('两万零六百五和七百八，这周末下午2十二')).toBe('20650和780，这周7下午22');
    });
  });

  describe('toCDB', () => {
    test('normal', () => {
      const str = "：ＡBCdeｆGＨＩ，？！Hello, World!123";
      const expected = ":ABCdefGHI,?!Hello, World!123";

      expect(toCDB(str)).toBe(expected);
    });
  });
});
