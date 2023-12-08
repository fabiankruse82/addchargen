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
  const strDwarfCondition = attributes.find((attr) => attr.STR >= 8);
  const conDwarfCondition = attributes.find((attr) => attr.CON >= 11);
  const dexElfCondition = attributes.find((attr) => attr.DEX >= 6);
  const conElfCondition = attributes.find((attr) => attr.CON >= 7);
  const intElfCondition = attributes.find((attr) => attr.INT >= 8);
  const chaElfCondition = attributes.find((attr) => attr.CHA >= 8);
  const strGnomeCondition = attributes.find((attr) => attr.STR >= 6);
  const conGnomeCondition = attributes.find((attr) => attr.CON >= 8);
  const intGnomeCondition = attributes.find((attr) => attr.INT >= 6);
  const dexHalfElfCondition = attributes.find((attr) => attr.DEX >= 6);
  const conHalfElfCondition = attributes.find((attr) => attr.CON >= 6);
  const intHalfElfCondition = attributes.find((attr) => attr.INT >= 4);
  const strHalflingCondition = attributes.find((attr) => attr.STR >= 7);
  const dexHalflingCondition = attributes.find((attr) => attr.DEX >= 7);
  const conHalflingCondition = attributes.find((attr) => attr.CON >= 10);
  const intHalflingCondition = attributes.find((attr) => attr.INT >= 6);
  console.log("Available races:");

  if (strDwarfCondition && conDwarfCondition) {
    console.log("1. Dwarf");
  }
  if (
    dexElfCondition &&
    conElfCondition &&
    intElfCondition &&
    chaElfCondition
  ) {
    console.log("2. Elf");
  }
  if (strGnomeCondition && conGnomeCondition && intGnomeCondition) {
    console.log("3. Gnome");
  }
  if (dexHalfElfCondition && conHalfElfCondition && intHalfElfCondition) {
    console.log("4. Half-Elf");
  }

  if (
    strHalflingCondition &&
    dexHalflingCondition &&
    conHalflingCondition &&
    intHalflingCondition
  ) {
    console.log("5. Halfling");
  }
  console.log("6. Human (always valid)");

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
      console.log("You chose Gnome!");
      break;
    case 4:
      console.log("You chose Half-Elf!");
      break;
    case 5:
      console.log("You chose Halfling (poor man's Hobbit)!");
      break;
    case 6:
      console.log("You chose Human!");
      break;
    default:
      console.log("Invalid choice. You are Human by default.");
  }
}
