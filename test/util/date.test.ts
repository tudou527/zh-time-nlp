/**
 * 本用例由 OpenAI 辅助编写
 */
import getDateAfterMonths, { getDateAfterDays, getDateAfterWeeks, getDateAfterYears } from "@/util/date";

describe('date util', () => {
  describe('getDateAfterDays', () => {
    test('2天之后', () => {
      const date = new Date('2023-06-06 10:00:00');
      const result = getDateAfterDays(date, 2);

      expect(new Date(result).getDate()).toBe(8);
    });

    test('3天之前', () => {
      const date = new Date();
      const result = getDateAfterDays(null as unknown as string, -3);

      expect(date.getDate() - new Date(result).getDate()).toBe(3)
      expect(new Date(result).getTime() - date.getTime() < 0).toBe(true);
    });
  });

  describe('translateNumber', () => {
    test('下周的今天', () => {
      const date = new Date('2023-06-06 10:00:00');
      const result = getDateAfterWeeks(date, 1);

      expect(new Date(result).getDay()).toBe(date.getDay());
      expect(new Date(result).getDate() - date.getDate()).toBe(7);
    });
  
    test('上周的周三', () => {
      const date = new Date('2023-06-06 10:00:00');
      date.setDate(date.getDate() - 2);

      const result = getDateAfterWeeks(date, -1, 3);
      expect(new Date(result).getDay()).toBe(3);
      expect(new Date(result).getTime() - date.getTime() < 0).toBe(true);
    });

    test('基准时间不存在', () => {
      const date = new Date();
      const result = getDateAfterWeeks(null as unknown as string, -2, 5);

      expect(new Date(result).getDay()).toBe(5);
      expect(new Date(result).getTime() - date.getTime() < 0).toBe(true);
    });
  });

  describe('getDateAfterMonths', () => {
    test('下个月', () => {
      const date = new Date();
      const result = getDateAfterMonths(date, 1);

      expect(new Date(result).getMonth() - date.getMonth()).toBe(1);
      expect(result.getDate()).toBe(date.getDate());
      expect(new Date(result).getTime() - date.getTime() > 0).toBe(true);
    });

    test('2个月前', () => {
      const date = new Date();
      const result = getDateAfterMonths(null as unknown as string, -2);

      expect(new Date(result).getMonth() - date.getMonth()).toBe(-2);
    });
  });

  describe('getDateAfterYears', () => {
    test('明年', () => {
      const date = new Date();
      const result = getDateAfterYears(date, 1);

      expect(new Date(result).getFullYear() - date.getFullYear()).toBe(1);
      expect(result.getMonth()).toBe(date.getMonth());
      expect(result.getDate()).toBe(date.getDate());
      expect(new Date(result).getTime() - date.getTime() > 0).toBe(true);
    });

    test('2年前', () => {
      const date = new Date();
      const result = getDateAfterYears(null as unknown as string, -2);

      expect(new Date(result).getFullYear() - date.getFullYear()).toBe(-2);
    });
  });
});
