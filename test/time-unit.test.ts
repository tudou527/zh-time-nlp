import TimeUnit from "@/time-unit";
import nlp from '@/index';

describe('TimeUnit', () => {

  test.only('normal', () => {
    [
      '五点一分',
      '十点十分',
      '八点十七分',
      '早上八点五十九分',
      '晚上八点五十九分',
      '九点二十分',
      '十一点五十九分五十九秒',
      '2019-5-3 19:00',
      '2019-05-3 19:00',
      '2019-5-03 19:00',
      '2019-05-03 19:00',
      '没有时间点',
      'Hi，all。下周一下午三点开会',
      '周一开会',
      '周五开会',
      '下下周一开会',
      '6:30 起床',
      '明天6:30 起床',
      '6-3 春游',
      '6月3日 春游',
      '12-1 春游',
      '明天早上跑步',
      '本周日到下周日出差',
      '周四下午三点到五点开会',
      '昨天上午，第八轮中美战略与经济对话气候变化问题特别联合会议召开。中国气候变化事务特别代表解振华表示，今年中美两国在应对气候变化多边进程中政策对话的重点任务，是推动《巴黎协定》尽早生效。',
    ].forEach(str => console.log('%s => %s', str, nlp(str)));
  });

  describe('秒', () => {
    test('x秒', () => {
      const timeUnit = new TimeUnit('3点14分20秒', false, new Date('2023-06-06 12:00:00'));
      const result = timeUnit.timeNormalization();
      expect(result).toBe('2023-06-06 15:14:20');
    });

    test('x秒', () => {
      const timeUnit = new TimeUnit('3点14分20', false, new Date('2023-06-06 12:00:00'));
      const result = timeUnit.timeNormalization();
      expect(result).toBe('2023-06-06 15:14:20');
    });
  });

  describe('小时/分', () => {
    test('x分', () => {
      const timeUnit = new TimeUnit('3点14分', false, new Date('2023-06-06 12:00:00'));
      const result = timeUnit.timeNormalization();
      expect(result).toBe('2023-06-06 15:14:00');
    });

    test('x点半', () => {
      const timeUnit = new TimeUnit('3点半', false, new Date('2023-06-06 12:00:00'));
      const result = timeUnit.timeNormalization();
      expect(result).toBe('2023-06-06 15:30:00');
    });

    test('x点1刻', () => {
      const timeUnit = new TimeUnit('3点1刻', false, new Date('2023-06-06 12:00:00'));
      const result = timeUnit.timeNormalization();
      expect(result).toBe('2023-06-06 15:15:00');
    });

    test('x点3刻', () => {
      const timeUnit = new TimeUnit('3点3刻', false, new Date('2023-06-06 12:00:00'));
      const result = timeUnit.timeNormalization();
      expect(result).toBe('2023-06-06 15:45:00');
    });
  });

  describe('天', () => {
    describe('昨天', () => {
      describe('上午', () => {
        test('凌晨', () => {
          const timeUnit = new TimeUnit('昨天凌晨2点42分23秒', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-05 02:42:23');
        });
  
        test('早上', () => {
          const timeUnit = new TimeUnit('昨天早上7点42分23秒', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-05 07:42:23');
        });
    
        test('早晨', () => {
          const timeUnit = new TimeUnit('昨天早晨7点42分23秒', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-05 07:42:23');
        });
    
        test('早间', () => {
          const timeUnit = new TimeUnit('昨天早间7点42分23秒', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-05 07:42:23');
        });
  
        test('晨间', () => {
          const timeUnit = new TimeUnit('昨天晨间7点42分23秒', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-05 07:42:23');
        });
    
        test('上午', () => {
          const timeUnit = new TimeUnit('昨天上午10点42分23秒', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-05 10:42:23');
        });
      });
  
      describe('下午', () => {
        test('中午', () => {
          const timeUnit = new TimeUnit('昨天中午1点42分23秒', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-05 13:42:23');
        });
  
        test('下午', () => {
          const timeUnit = new TimeUnit('昨天下午2点42分23秒', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-05 14:42:23');
        });
    
        test('午后', () => {
          const timeUnit = new TimeUnit('昨天午后3点42分23秒', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-05 15:42:23');
        });
    
        test('晚上', () => {
          const timeUnit = new TimeUnit('昨天晚上7点42分23秒', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-05 19:42:23');
        });
    
        test('夜间', () => {
          const timeUnit = new TimeUnit('昨天夜间9点42分23秒', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-05 21:42:23');
        });
    
        test('夜里', () => {
          const timeUnit = new TimeUnit('昨天夜里11点42分23秒', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-05 23:42:23');
        });
    
        test('傍晚', () => {
          const timeUnit = new TimeUnit('昨天傍晚5点42分23秒', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-05 17:42:23');
        });
      });
    });
  
    describe('今天', () => {
      describe('上午', () => {
        test('凌晨', () => {
          const timeUnit = new TimeUnit('今天凌晨', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-06 03:00:00');
        });
  
        test('今早', () => {
          const timeUnit = new TimeUnit('今早7点42分23秒', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-06 07:42:23');
        });
  
        test('今早（不指定小时）', () => {
          const timeUnit = new TimeUnit('今早', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-06 08:00:00');
        });
  
        test('上午（不指定小时）', () => {
          const timeUnit = new TimeUnit('今天上午', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-06 10:00:00');
        });
  
        test('中午（不指定小时）', () => {
          const timeUnit = new TimeUnit('今天中午', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-06 12:00:00');
        });
      });
  
      describe('下午', () => {
        test('中午', () => {
          const timeUnit = new TimeUnit('中午12:12:12', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-06 12:12:12');
        });

        test('下午（不指定时间）', () => {
          const timeUnit = new TimeUnit('今天下午', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-06 15:00:00');
        });
  
        test('今晚', () => {
          const timeUnit = new TimeUnit('今晚', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-06 18:00:00');
        });
  
        test('晚上', () => {
          const timeUnit = new TimeUnit('今晚12点', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-06 00:00:00');
        });
      });
    });
  
    describe('明天', () => {
      describe('上午', () => {
        test('明早', () => {
          const timeUnit = new TimeUnit('明早7点42分23秒', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-07 07:42:23');
        });
      });
  
      describe('下午', () => {
        test('明晚', () => {
          const timeUnit = new TimeUnit('明晚7点42分23秒', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-07 19:42:23');
        });
      });
  
      describe('x日/号', () => {
        test('x号', () => {
          const timeUnit = new TimeUnit('本月19号8点', false, new Date('2023-06-06 12:00:00'));
          const result = timeUnit.timeNormalization();
          expect(result).toBe('2023-06-19 08:00:00');
        });
      });
    });
  });

  describe('小时/分/秒', () => {
    test('hh:mm:ss', () => {
      const timeUnit = new TimeUnit('本周4上 12:12:12', false, new Date('2023-06-07 12:00:00'));
      const result = timeUnit.timeNormalization();
      expect(result).toBe('2023-06-08 12:12:12');
    });

    test('hh:mm', () => {
      const timeUnit = new TimeUnit('本周4上 12:12', false, new Date('2023-06-07 12:00:00'));
      const result = timeUnit.timeNormalization();
      expect(result).toBe('2023-06-08 12:12:00');
    });
  });

  describe('周', () => {
    test('上周', () => {
      const timeUnit = new TimeUnit('上周3上午10点', false, new Date('2023-06-07 12:00:00'));
      const result = timeUnit.timeNormalization();
      expect(result).toBe('2023-05-31 10:00:00');
    });

    test('本周', () => {
      const timeUnit = new TimeUnit('周4上午10点', false, new Date('2023-06-07 12:00:00'));
      const result = timeUnit.timeNormalization();
      expect(result).toBe('2023-06-08 10:00:00');
    });

    test('下周', () => {
      const timeUnit = new TimeUnit('下周4上午10点', false, new Date('2023-06-07 12:00:00'));
      const result = timeUnit.timeNormalization();
      expect(result).toBe('2023-06-15 10:00:00');
    });
  });

  describe('年', () => {
    test('30年', () => {
      const timeUnit = new TimeUnit('20年8月14', false, new Date('2023-06-07 12:00:00'));
      const result = timeUnit.timeNormalization();

      expect(result).toBe('2020-08-14 08:00:00');
    });

    test('30年以后的数字年份', () => {
      const timeUnit = new TimeUnit('30年前8月14', false, new Date('2023-06-07 12:00:00'));
      const result = timeUnit.timeNormalization();

      expect(result).toBe('1993-08-14 08:00:00');
    });

    test('4位数年份', () => {
      const timeUnit = new TimeUnit('2021年8月14', false, new Date('2023-06-07 12:00:00'));
      const result = timeUnit.timeNormalization();

      expect(result).toBe('2021-08-14 08:00:00');
    });
  });
});
