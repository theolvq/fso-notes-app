const palindrome = string => [...string].reverse().join('');

const average = array =>
  array.length ? array.reduce((sum, el) => sum + el, 0) / array.length : 0;

module.exports = {
  palindrome,
  average,
};
