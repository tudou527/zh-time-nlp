import TimeUnit from '@/time-unit';
import { toCDB, translateNumber } from '@/util/string';

/**
 * 处理自然语言中的时间
 * @param expression 包含时间的自然语言
 * @param {Date} option.baseTime 基准时间(默认当前时间)
 * @param {Boolean} option.isPreferFuture ?
 */
export default function nlp(
  expression: string,
  option?: { baseTime?: string | number | Date; isPreferFuture?: boolean },
) {
  // 清理语气助词
  let targetStr = expression
    .replace(/[的]+/g, '')
    // 删除数字与其他字符之间的空格
    .replace(/([^\d]+)\s+(\d+)/g, '$1$2')
    .replace(/(\d+)\s+([^\d]+)/g, '$1$2');
  // 全角转半角
  targetStr = toCDB(targetStr);
  // 大写数字转化
  targetStr = translateNumber(targetStr);
  
  // 处理时间段
  const [startStr, ...endStr] = targetStr.split(/至|到|~|～/i);

  const startTimeUnit = new TimeUnit(
    startStr,
    option?.isPreferFuture || false,
    option?.baseTime ? new Date(option?.baseTime as string) : new Date(),
  );
  const startTime = startTimeUnit.timeNormalization();
  let endTime: string | null = null;

  if (!startTime) {
    return null;
  }

  if (endStr.length > 0) {
    // 使用开始时间作为基准，计算结束时间
    const endTimeUnit = new TimeUnit(
      endStr.join(''),
      option?.isPreferFuture || false,
      new Date(startTime as string),
    );
    endTime = endTimeUnit.timeNormalization();

    return { startTime, endTime };
  }

  return startTime;
}
