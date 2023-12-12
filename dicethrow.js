const fs = require("fs");
const readlineSync = require("readline-sync");

// rolls 3 6 side dice for 6 attributes
function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}
// defines attributes
function generateAttributes() {
  const attributes = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
  const attributeValues = [];

  for (let i = 0; i < attributes.length; i++) {
    const sumOfDice = rollDie() + rollDie() + rollDie();
    attributeValues.push(sumOfDice);
  }

  const result = attributes.map((attribute, index) => ({
    [attribute]: attributeValues[index],
  }));

  return result;
}
// saves results to attributesResults.txt
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

if (fs.existsSync("attributesResult.txt")) {
  const reuseContent = readlineSync.keyInYNStrict(
    "There is already a character sheet saved. Reuse?"
  );

  if (reuseContent) {
    const existingAttributes = loadFromFile();
    console.log("Reusing existing attributes:");
    console.log(existingAttributes);

    //Choose a fantasy race based on attribute requirements
    chooseRace(existingAttributes);
  } else {
    const newAttributes = generateAttributes();
    console.log("Generating new attributes:");
    console.log(newAttributes);
    saveToFile(newAttributes);

    chooseRace(newAttributes);
  }
} else {
  const newAttributes = generateAttributes();
  console.log("Generating new attributes:");
  console.log(newAttributes);
  saveToFile(newAttributes);

  chooseRace(newAttributes);
}

// defines condintions for eligible races
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

  const raceChoice = readlineSync.questionInt(
    "Choose your race (enter the corresponding number): "
  );

  // modifies exisiting attributes based on user's choice of race
  function applyRaceModifier(attributes, chosenRace) {
    let raceModifier;

    switch (raceChoice) {
      case 1:
        chosenRace = "Dwarf";
        raceModifier = { CON: 1, CHA: -1 };
        break;
      case 2:
        chosenRace = "Elf";
        raceModifier = { DEX: 1, CON: -1 };
        break;
      case 3:
        chosenRace = "Gnome";
        raceModifier = { INT: 1, WIS: -1 };
        break;
      case 4:
        chosenRace = "Half-Elf";

        break;
      case 5:
        chosenRace = "Halfling";
        raceModifier = { DEX: 1, STR: -1 };
        break;
      case 6:
        chosenRace = "Human";

        break;
      default:
        console.log("Invalid choice. You are Human by default.");
        chosenRace = "Human";
    }

    console.log(`You chose ${chosenRace}!`);

    // Apply race modifier to attributes
    const modifiedAttributes = attributes.map((attribute) => {
      const attributeName = Object.keys(attribute)[0];
      const attributeValue = attribute[attributeName];

      // Apply race modifier if applicable
      if (raceModifier && raceModifier[attributeName] !== undefined) {
        const modifiedValue = attributeValue + raceModifier[attributeName];
        console.log(
          `Modified ${attributeName} ${
            raceModifier[attributeName] > 0 ? "+" : ""
          }${raceModifier[attributeName]}: ${modifiedValue}`
        );
        return { [attributeName]: modifiedValue };
      }

      return attribute;
    });

    // Display modified attributes in the console
    console.log("Modified attributes:");
    console.log(modifiedAttributes);

    // Save modified attributes to file
    saveToFile(modifiedAttributes);
  }

  // Call applyRaceModifier with the correct parameters
  applyRaceModifier(attributes, raceChoice);

  // let user choose class based on attributes and race requirements
  determineCharacterClass(attributes, raceChoice);

  function determineCharacterClass(modifiedAttributes, chosenRace) {
    const strFighterCondition = modifiedAttributes.find(
      (attr) => attr.STR >= 9
    );
    const dexThiefCondition = modifiedAttributes.find((attr) => attr.DEX >= 9);

    const strRangerCondition = modifiedAttributes.find(
      (attr) => attr.STR >= 13
    );
    const dexRangerCondition = modifiedAttributes.find(
      (attr) => attr.DEX >= 13
    );
    const conRangerCondition = modifiedAttributes.find(
      (attr) => attr.CON >= 14
    );
    const wisRangerCondition = modifiedAttributes.find(
      (attr) => attr.WIS >= 14
    );
    const strPaladinCondition = modifiedAttributes.find(
      (attr) => attr.STR >= 12
    );
    const conPaladinCondition = modifiedAttributes.find(
      (attr) => attr.CON >= 9
    );
    const wisPaladinCondition = modifiedAttributes.find(
      (attr) => attr.CON >= 13
    );
    const chaPaladinCondition = modifiedAttributes.find(
      (attr) => attr.CHA >= 17
    );
    const intMageCondition = modifiedAttributes.find((attr) => attr.INT >= 9);

    const wisClericCondition = modifiedAttributes.find((attr) => attr.WIS >= 9);

    console.log("\nAvailable character classes:");

    if (strFighterCondition) {
      console.log("1. Fighter");
    }

    if (dexThiefCondition) {
      console.log("2. Thief");
    }

    if (
      (chosenRace === "Elf" ||
        chosenRace === "Human" ||
        chosenRace === "Half-Elf") &&
      strRangerCondition &&
      dexRangerCondition &&
      conRangerCondition &&
      wisRangerCondition
    ) {
      console.log("3. Ranger");
    }

    if (
      chosenRace === "Human" &&
      strPaladinCondition &&
      conPaladinCondition &&
      wisPaladinCondition &&
      chaPaladinCondition
    ) {
      console.log("4. Paladin");
    }

    if (wisClericCondition) {
      console.log("5. Cleric");
    }

    if (
      (chosenRace === "Elf" ||
        chosenRace === "Human" ||
        chosenRace === "Half-Elf") &&
      intMageCondition
    ) {
      console.log("6. Mage");
    }
  }

  const classChoice = readlineSync.questionInt(
    "Choose your class (enter the corresponding number): "
  );
  switch (classChoice) {
    case 1:
      chosenClass = "Fighter";
      break;
    case 2:
      chosenClass = "Thief";
      break;
    case 3:
      chosenClass = "Ranger";
      break;
    case 4:
      chosenClass = "Paladin";
      break;
    case 5:
      chosenClass = "Cleric";
      break;
    case 6:
      chosenClass = "Mage";
      break;

    default:
      console.log("Invalid choice. You are a Peasant by default.");
      chosenClass = "Peasant";
  }

  console.log(`You chose ${chosenClass}!`);
}
