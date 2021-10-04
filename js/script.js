const guessedLettersEmlement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
//Default word
let word = "magnolia"; 
//Add dot placeholders for each letter
const placeholder = function(word) {
    const wordArray = word.toUpperCase().split(""); //Split the word into individual letters and capitalize them
    const placeholderLetters = []; //Create an array of letters
    wordArray.forEach(function (letter) { 
        placeholderLetters.push("●"); //Add dots to the end of the array
    });
wordInProgress.innerText = placeholderLetters.join(""); //Joins the array into a string in this case makes a word out of the individual letters in the array
};
//See the 8 circles in the console
//console.log(wordInProgress);
//placeholder(word);
    
guessLetterButton.addEventListener("click", (e) => {
    e.preventDefault(); //Prevent from reloading page when button is clicked
    //message.innerText = ""; //Empty message paragraph so user can enter another letter/guesss
    const guess = letterInput.value.toUpperCase(); //Grab what the user entered for input and convert it to upper case
    console.log(guess);
});

