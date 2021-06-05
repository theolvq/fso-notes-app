const palindrome = require('../utils/testing').palindrome;

test.skip('palindrome of loup', () => {
  const result = palindrome('loup');

  expect(result).toBe('puol');
});

test.skip('palindrome of react', () => {
  const result = palindrome('react');

  expect(result).toBe('tcaer');
});

test.skip('palindrome of releveler', () => {
  const result = palindrome('releveler');

  expect(result).toBe('releveler');
});
