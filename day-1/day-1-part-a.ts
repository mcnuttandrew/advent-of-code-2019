const tape = require("tape");
const { getFile } = require("hoopoe");
const { parseToNums } = require("./utils.ts");

function partA(mass) {
  return Math.floor(mass / 3) - 2;
}

tape("day 1 part 1", t => {
  t.equal(partA(12), 2);
  t.equal(partA(14), 2);
  t.equal(partA(1969), 654);
  t.equal(partA(100756), 33583);
  t.end();
});

getFile("./day-1/day-1-input.txt")
  .then(parseToNums)
  .then(nums => {
    const masses = nums.map(partA);
    // console.log(JSON.stringify(nums), JSON.stringify(masses));
    const massSum = masses.reduce((acc, mass) => acc + mass, 0);

    // console.log(masses);
    console.log(massSum);
  });
