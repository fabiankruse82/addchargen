const fs = require("fs");
const readlineSync = require("readline-sync");

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

function saveToFile(attributesArray) {
  fs.writeFileSync(
    "attributesResult.txt",
    JSON.stringify(attributesArray, null, 2)
  );
}

function loadFromFile() {
  const fileContent = fs.readFileSync("attributesResult.txt", "utf8");
  return JSON.parse(fileContent);
}

// Check if the file exists
if (fs.existsSync("attributesResult.txt")) {
  const reuseContent = readlineSync.keyInYNStrict(
    "There is already a character sheet saved. Reuse?"
  );

  if (reuseContent) {
    const existingAttributes = loadFromFile();
    console.log("Reusing existing attributes:");
    console.log(existingAttributes);
  } else {
    const newAttributes = generateAttributes();
    console.log("Generating new attributes:");
    console.log(newAttributes);
    saveToFile(newAttributes);
  }
} else {
  const newAttributes = generateAttributes();
  console.log("Generating new attributes:");
  console.log(newAttributes);
  saveToFile(newAttributes);
}
