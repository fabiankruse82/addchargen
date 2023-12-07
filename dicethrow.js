const fs = require("fs");

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function generateAttributes() {
  const attributes = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
  const attributeValues = [];

  for (let i = 0; i < attributes.length; i++) {
    // Sum the result of 3 dice rolls
    const sumOfDice = rollDie() + rollDie() + rollDie();
    attributeValues.push(sumOfDice);
  }

  const result = attributes.map((attribute, index) => ({
    [attribute]: attributeValues[index],
  }));

  return result;
}

const attributesArray = generateAttributes();
console.log(attributesArray);

// Save the result to a text file
fs.writeFileSync(
  "attributesResult.txt",
  JSON.stringify(attributesArray, null, 2)
);