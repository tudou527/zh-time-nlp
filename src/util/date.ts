/**
 * 获取相对于 {baseDate} 之后 {addWeekCount} 天的日期
 * @param baseDate 基础日期
 * @param addDayCount 要添加的天数，如果为负数，则表示减去相应的天数
 */
export function getDateAfterDays(
  baseDate: string | number | Date,
  addDayCount: number,
) {
  const dete = baseDate ? new Date(baseDate) : new Date();
  dete.setDate(dete.getDate() + addDayCount);

  return dete;
}

/**
 * 获取相对于 {baseDate} 之后 {addWeekCount} 周的日期
 * @param baseDate 基础日期
 * @param addWeekCount 要添加的周数，如果为负数，则表示减去相应的周数
 * @param weekDay 星期几（默认周日）
 */
export function getDateAfterWeeks(
  baseDate: string | number | Date,
  addWeekCount: number,
  weekDay?: number,
) {
  const date = baseDate ? new Date(baseDate) : new Date();

  date.setDate(date.getDate() + 7 * addWeekCount);

  if (typeof weekDay !== 'undefined') {
    let dWeekDay = date.getDay();

    if (dWeekDay === 0) {
      dWeekDay = 7;
    }
    if (weekDay !== dWeekDay) {
      date.setDate(date.getDate() + (weekDay - dWeekDay));
    }
  }
  return date;
}

/**
 * 获取相对于 {baseDate} 之后 {addWeekCount} 月的日期
 * @param baseDate 基础日期
 * @param addMonthCount 要添加的月数，如果为负数，则表示减去相应的月数
 */
export default function getDateAfterMonths(
  baseDate: string | number | Date,
  addMonthCount: number,
) {
  const date = baseDate ? new Date(baseDate) : new Date();
  const day = date.getDate();

  date.setMonth(date.getMonth() + addMonthCount);
  date.setDate(day);

  return date;
}

/**
 * 获取相对于 {baseDate} 之后 {addWeekCount} 年的日期
 * @param baseDate 基础日期
 * @param addYearCount 要添加的年数，如果为负数，则表示减去相应的年数
 */
export function getDateAfterYears(
  baseDate: string | number | Date,
  addYearCount: number,
) {
  const date = baseDate ? new Date(baseDate) : new Date();
  date.setFullYear(date.getFullYear() + addYearCount);

  return date;
}
