const average = require('../utils/testing').average;

describe.skip('average', () => {
  test('should calculate average on long arrays', () => {
    expect(
      average([
        225, 9443, 4548, 3580, 8183, 2344, 1636, 6629, 1922, 4801, 6931, 2783,
        6272, 2624, 6039, 2522, 8722, 1896, 6638, 3942, 2469, 8613, 2406, 3567,
        1363, 6890, 1918, 5477, 5476, 7073, 2429, 3018, 9345, 9320, 8904, 5415,
        5656, 8131, 1192, 8813, 3721, 8328, 745, 6447, 2590, 6679, 9039, 114,
        6473, 5659,
      ])
    ).toBe(4979);
  });
  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5);
  });

  test('of empty array is zero', () => {
    expect(average([])).toBe(0);
  });
});
