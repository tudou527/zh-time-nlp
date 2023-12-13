import nlp from '@/index';
import TimeUnit from '@/time-unit';
import * as stringUtil from '@/util/string';

jest.mock('@/util/string');
jest.mock('@/time-unit');

describe('nlp', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('单个时间', () => {
    (stringUtil.toCDB as any).mockReturnValue('明天5:30分的会议');
    (stringUtil.translateNumber as any).mockReturnValue('明天5:30分的会议');
    (TimeUnit.prototype.timeNormalization as any).mockReturnValue(
      '2023-06-07 05:00:00',
    );

    const result = nlp('明天 5：30 分的会议');
    expect(result).toBe('2023-06-07 05:00:00');

    // 空格过滤
    const args = (stringUtil.toCDB as any).mock.calls[0];
    expect(args[0]).toBe('明天5：30分会议');
  });

  test('非法时间格式', () => {
    (stringUtil.translateNumber as any).mockReturnValue('天气不怎么好');
    (TimeUnit.prototype.timeNormalization as any).mockReturnValue(false);

    const result = nlp('天气不怎么好');
    expect(result).toBe(null);
  });

  test('开始结束时间', () => {
    (stringUtil.translateNumber as any).mockReturnValue('今天下午2点到5点半');
    (TimeUnit.prototype.timeNormalization as any)
      .mockReturnValueOnce('2023-06-07 14:00:00')
      .mockReturnValueOnce('2023-06-07 17:30:00');

    const result = nlp('今天下午2点到5点半', { isPreferFuture: true });
    expect(result).toStrictEqual({
      startTime: '2023-06-07 14:00:00',
      endTime: '2023-06-07 17:30:00',
    });
  });

  test('提供时间选项', () => {
    (stringUtil.translateNumber as any).mockReturnValue('明天5点');
    (TimeUnit.prototype.timeNormalization as any).mockReturnValue(
      '2023-06-01 05:00:00',
    );

    const result = nlp('明天5点', {
      baseTime: '2023-06-01 05:00:00',
      isPreferFuture: true,
    });
    expect(result).toBe('2023-06-01 05:00:00');
  });
});
