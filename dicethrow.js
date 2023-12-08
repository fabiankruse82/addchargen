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

    // Add the new section for choosing a race
    chooseRace(existingAttributes);
  } else {
    const newAttributes = generateAttributes();
    console.log("Generating new attributes:");
    console.log(newAttributes);
    saveToFile(newAttributes);

    // Add the new section for choosing a race
    chooseRace(newAttributes);
  }
} else {
  const newAttributes = generateAttributes();
  console.log("Generating new attributes:");
  console.log(newAttributes);
  saveToFile(newAttributes);

  // Add the new section for choosing a race
  chooseRace(newAttributes);
}

// Function to choose a race based on conditions
function chooseRace(attributes) {
  const strCondition = attributes.find((attr) => attr.STR >= 8);
  const conCondition = attributes.find((attr) => attr.CON <= 11);
  const dexCondition = attributes.find((attr) => attr.DEX >= 6);
  const intCondition = attributes.find((attr) => attr.INT >= 8);
  const chaCondition = attributes.find((attr) => attr.CHA <= 8);

  console.log("Available races:");

  if (strCondition && conCondition) {
    console.log("1. Dwarf");
  }
  if (dexCondition && conCondition && intCondition && chaCondition) {
    console.log("2. Elf");
  }

  console.log("3. Human (always valid)");

  // Prompt user for choice
  const raceChoice = readlineSync.questionInt(
    "Choose your race (enter the corresponding number): "
  );

  switch (raceChoice) {
    case 1:
      console.log("You chose Dwarf!");
      break;
    case 2:
      console.log("You chose Elf!");
      break;
    case 3:
      console.log("You chose Human!");
      break;
    default:
      console.log("Invalid choice. You are Human by default.");
  }
}
