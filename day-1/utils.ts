const parseToNums = file =>
  file
    .split("\n")
    .map(d => parseInt(d))
    .filter(d => d);

module.exports = {
  parseToNums
};
