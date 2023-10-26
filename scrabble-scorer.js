// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints; 
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   let prompt = input.question("Enter a word: ");
   return prompt;
};


function simpleScorer(word) {
   //Define a function that takes a word as a parameter and returns a numerical score. Each letter within the word is worth 1 point.
   return word.length;
};

//Define a function that takes a word as a parameter and returns a score. Each vowel word is 3 points and each consonant is 1 point.
function vowelBonusScorer(word) {
   let points = 0;
   word = word.toLowerCase();
   let splitLetters = word.split("");
   for (let i = 0; i < splitLetters.length; i++) {
      if (splitLetters[i] === "a" || splitLetters[i] === "e" || splitLetters[i] === "i" || splitLetters[i] === "o" || splitLetters[i] === "u") {
         points += 3;
      } else {
         points += 1;
      }
   } 
   return points;
};

//let scrabbleScorer;
function scrabbleScorer(word) {
   word = word.toLowerCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      score += Number(newPointStructure[word[i]]);
   }
   return score;
};


//Finish writing the scoringAlgorithms array. It should be populated with three objects, one for each of the three scoring options. 
//Each object should contain three keys: name, description, and scoringFunction (NAME THIS KEY scorerFunction INSTEAD)

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

//Finish writing scorerPrompt() so that the user can select which scoring algorithm to use when the program scores their word. 
//Use the selected algorithm to determine the score for the word
//scorerPrompt() should return the object the user has selected.
function scorerPrompt(word) {
   let scorerSelection = input.question(`Which scoring algorithm would you like to use?
   0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
   1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
   2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
   Enter 0, 1, or 2: `);

   while (scorerSelection < 0 || scorerSelection > 2) {
      scorerSelection = input.question(`Which scoring algorithm would you like to use?
   0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
   1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
   2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
   Enter 0, 1, or 2: `);
   };

   if (scorerSelection === "0") {
      return (`Score for "${word}": ${scoringAlgorithms[Number(scorerSelection)].scorerFunction(word)}`);
   } else if (scorerSelection === "1") {
      return (`Score for "${word}": ${scoringAlgorithms[Number(scorerSelection)].scorerFunction(word)}`)
   } else if (scorerSelection === "2") {
      return (`Score for "${word}": ${scoringAlgorithms[Number(scorerSelection)].scorerFunction(word)}`)
   }; 
}; 

//transform function should take the oldPointStructure object as a parameter
//calling transform(oldPointStructure) will return an object with LOWERCASE letters as keys
//the value for each key will be the points assigned to that letter
function transform(structure) {
   let newPointStructure = {};
   for (key in structure) {
      for (i = 0; i < structure[key].length; i++) {
         newPointStructure[structure[key][i].toLowerCase()] = Number(key);
      }
   }
   return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let prompt = initialPrompt();
   console.log(scorerPrompt(prompt));
};
//runProgram(); //was told not to call this... but program won't run if I don't???

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

