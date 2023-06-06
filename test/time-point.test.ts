import TimePoint from "@/time-point";

describe('TimePoint', () => {
  test('normal', () => {
    const date = new Date();
    const tp = new TimePoint(date);

    expect(tp.tunit).toStrictEqual([
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ]);
  });
  
  test('without date', () => {
    const tp = new TimePoint();
    expect(tp.tunit).toStrictEqual([-1, -1, -1, -1, -1, -1]);
  });
});