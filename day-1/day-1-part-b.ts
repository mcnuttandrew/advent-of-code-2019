const tape = require("tape");
const { getFile } = require("hoopoe");
const { parseToNums } = require("./utils.ts");

function partA(mass) {
  return Math.floor(mass / 3) - 2;
}

function partB(mass) {
  const nextMass = partA(mass);
  if (nextMass <= 0) {
    return 0;
  }
  return partB(nextMass) + nextMass;
}

tape("day 1 part b", t => {
  t.equal(partB(14), 2);
  t.equal(partB(1969), 966);
  t.equal(partB(100756), 50346);

  t.end();
});

getFile("./day-1/day-1-input.txt")
  .then(parseToNums)
  .then(nums => {
    const masses = nums.map(partB);
    const massSum = masses.reduce((acc, mass) => acc + mass, 0);
    console.log(massSum);
  });
