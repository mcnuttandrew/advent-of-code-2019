const tape = require("tape");
const { getFile } = require("hoopoe");

function toNums(input) {
  return input.split(",").map(d => parseInt(d));
}

function toString(input) {
  return input.join(",");
}

function getOutput(outputStr) {
  return toNums(outputStr)[0];
}

function initializeMemory(input, noun, verb) {
  const nums = toNums(input);
  nums[1] = noun;
  nums[2] = verb;
  return toString(nums);
}

function intComputer(input) {
  const nums = toNums(input);
  let idx = 0;
  while (idx < nums.length) {
    const command = nums[idx];
    if (command === 99) {
      break;
    }
    if (command !== 1 && command !== 2) {
      idx += 4;
      continue;
    }
    const func = command === 1 ? (a, b) => a + b : (a, b) => a * b;
    nums[nums[idx + 3]] = func(nums[nums[idx + 1]], nums[nums[idx + 2]]);
    idx += 4;
  }
  return toString(nums);
}

function findGoodPair(nums) {
  const values = [...new Array(99)].reduce((acc, _, noun) => {
    return acc.concat([...new Array(99)].map((_, verb) => ({ noun, verb })));
  }, []);
  return values.reduce((acc, { noun, verb }) => {
    if (
      !acc &&
      getOutput(intComputer(initializeMemory(nums, noun, verb))) === 19690720
    ) {
      return { noun, verb };
    }
    return acc;
  }, null);
}

tape("IntComputer Tests", t => {
  t.equal(
    intComputer("1,9,10,3,2,3,11,0,99,30,40,50"),
    "3500,9,10,70,2,3,11,0,99,30,40,50"
  );
  t.equal(intComputer("1,0,0,0,99"), "2,0,0,0,99");
  t.equal(intComputer("2,3,0,3,99"), "2,3,0,6,99");
  t.equal(intComputer("2,4,4,5,99,0"), "2,4,4,5,99,9801");
  t.equal(intComputer("1,1,1,4,99,5,6,0,99"), "30,1,1,4,2,5,6,0,99");
  t.end();
});

getFile("./day-2/day-2-input.txt").then(nums => {
  // my solution was 8017076
  console.log(
    `Part 1 sol: ${getOutput(intComputer(initializeMemory(nums, 12, 2)))}`
  );
  const part2 = findGoodPair(nums);
  // my solution was  {"noun":31,"verb":46} 3146
  console.log(
    `Part 2: ${JSON.stringify(part2)} ${100 * part2.noun + part2.verb}`
  );
});
