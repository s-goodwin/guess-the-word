const guessedLettersElement = document.querySelector('.guessed-letters');
const guessLetterButton = document.querySelector('.guess');
const letterInput = document.querySelector('.letter');
const wordInProgress = document.querySelector('.word-in-progress');
const remainingGuessesElement = document.querySelector('.remaining');
const remainingGuessesSpan = document.querySelector('.remaining span');
const message = document.querySelector('.message');
const playAgainButton = document.querySelector('.play-again');

let word = 'magnolia'; //Default word
let guessedLetters = []; //Global variable that holds player's guesses
let remainingGuesses = 8;

const getWord = async function () { //Choose a random word
    const response = await fetch('https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt');
    const words = await response.text();
    //console.log(words); //See what data was rereived
    const wordArray = words.split(('\n')); //Transform the data that was fetched into an array and separat each word by a newline
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    if (word.length > 10) {
        getWord();
    } else {
        placeholder(word);
    }
};
//getWord(); //Global so call function outside



const placeholder = function (word) { //Display dots as placeholders for the chosen word's letters
    const wordArray = word.toUpperCase().split(''); //Split the word into individual letters and capitalize them
    const placeholderLetters = []; //Create an array of letters
    wordArray.forEach(function (letter) { 
        placeholderLetters.push('●'); //Add dots to the end of the array
    });
wordInProgress.innerText = placeholderLetters.join(''); //Joins the array into a string in this case makes a word out of the individual letters in the array
};
//See the 8 circles in the console
//console.log(wordInProgress);
//placeholder(word);
    
guessLetterButton.addEventListener('click', (e) => {
    e.preventDefault(); //Prevent from reloading page when button is clicked
    message.innerText = ''; //Empty message paragraph so user can enter another letter/guesss
    const guess = letterInput.value.toUpperCase(); //Grab what the user entered for input and convert it to upper case
    //console.log(guess); 
    const goodGuess = validateInput(guess);//Check that the player entered a letter (not a number, multiple letters, or a blank box)
    
    if (goodGuess) { //Player typed a letter, let's guess
        makeGuess(guess);
    }
    letterInput.value = ''; //Empty the input box so they can guess again
});

getWord();


const validateInput = function (input) { //Checks the player's input
    const acceptedLetter = /[A-Z]/;//Check that the player inputs a letter regular expression
    if (input.length === 0) { //Check if the input is empty
        message.innerText = 'Please enter a single letter';
    } else if (input.length > 1) { //Did player type more than one letter?
        message.innerText = 'Please enter a single letter';
    } else if (!input.match(acceptedLetter)) { //Did the player type something other than a letter?
        message.innerText = 'We need a letter from A-Z';
    } else { //We got a letter!
        return input;
    }
};

const makeGuess = function(guess) { //Captures player's input
    if (guessedLetters.includes(guess)) { //Check if they already guessed that letter
        message.innerText = "You already guessed that letter, try again.";
    } else {
        guessedLetters.push(guess); //Add the letter to the top
        updateRemainingGuesses(guess);
        showGuessedLetters(); //Show the player what they already guessed
        updateWordInProgress(guessedLetters); //Call function to show correctly guessed letters
    }
    //console.log(guessedLetters);
};

const showGuessedLetters = function () { //Display the letters the player has guessed
    guessedLettersElement.innerHTML = ''; //Clear the list first
    for (const letter of guessedLetters) {
        const li = document.createElement('li');
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) { //Replace dots with correctly guessed letters
   const wordArray = word.toUpperCase().split('');
   const revealWord = [];
   for (const letter of wordArray) {
   if (guessedLetters.includes(letter)) {
       revealWord.push(letter.toUpperCase());
    } else {
        revealWord.push('●');
    }
}
wordInProgress.innerText = revealWord.join('');
checkWin();
};

const updateRemainingGuesses = function (guess) {
    const letterArray = word.toUpperCase().split('');
    if (!letterArray.includes (guess)) {
       message.innerText = `Sorry, the word has no ${guess}.`;
       remainingGuesses -=1;
    } else {
        message.innerText = `Hooray! the word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `You have reached the end of the line. No more guesses. The word is ${word}.`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
      message.classList.add('win');
      message.innerHTML = '<p class="highlight">You guessed the word! Hooray!!!</p>';
    }
};











