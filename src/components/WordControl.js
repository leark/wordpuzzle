/* 
Stuff left to do:

*/

import React from 'react';

class WordControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guessesLeft: 6,
      wrongGuesses: [],
      wordPool: ['shovel', 'lance', 'axe', 'band'],
      currentWord: 'shovel',
      correctGuesses: [],
      message: '',
      won: false,
    };
  }

  arrayToStringConverter = (arrayToConvert) => {
    const wrongGuessesArray = arrayToConvert;
    //^ ['x','z']
    let newString = '';
    for (let i = 0; i <= wrongGuessesArray.length - 1; i++) {
      //as i is less than the array length | it will stop looping once i is the same length as the array
      //take x and concatenate ', ' onto it
      newString = newString + wrongGuessesArray[i] + ' ';
    }
    return newString;
  };

  wordLetterChecker = (event) => {
    //here event is what the user has inputted in the form of an object
    event.preventDefault();

    //Define variables:

    const guessedLetter = event.target.letter.value.toLowerCase()  //pull letter out of object and put it in a variable and makes it lowercased
    const currentWord = this.state.currentWord  //pull word out of this.state object and put it in a variable
    
    const numberOfGuessesLeft = this.state.guessesLeft // put number of guesses into a variable
    
      //BELOW: 
      /*
      if guessed correctly
        update correctGuesses
      if guessed incorrectly
        add to wrongGuesses
        decrement guessesLeft
      */
    let message = '';
    if (numberOfGuessesLeft > 0) { //this will PULL us out of the function if we are out of guesses. 
      if (currentWord.includes(guessedLetter)) { 
        // console.log("Correct!"); 
        message = "Correct!";

        //create another if statement:
        if (this.state.correctGuesses.includes(guessedLetter)) {
          // console.log("You've already guessed this letter! Try again ...");
          message = "Correct! But, you've already guessed this letter! Try again ...";
        } else {
          const newCorrectGuesses = this.state.correctGuesses.concat(guessedLetter); // accesses correctGuesses from state, then concatenates the guessed letter onto the end of the correctGuesses BUT THIS IS NOT DESTRUCTIVE. The value of this whole little thing we do is SAVED IN THE newCorrectGuesses variable. 
          this.setState({correctGuesses: newCorrectGuesses}); //this will set the state CORRECTLY without causing issues
        }
      } else {
        // console.log("Wrong!");
        message = "Wrong!";
          if (this.state.wrongGuesses.includes(guessedLetter)) {
            // console.log("You've already guessed this letter! Try again ...");
            message = "Wrong! And, you've already guessed this letter! Try again ...";
          } else {
            const newWrongGuesses = this.state.wrongGuesses.concat(guessedLetter); 
            const newGuessesLeft = numberOfGuessesLeft - 1;
            this.setState({wrongGuesses: newWrongGuesses,
                          guessesLeft: newGuessesLeft});              
          }
      } 
    } else {
      message = "You are out of guesses! Game Over!";
    }
    if (!this.state.won) {
      this.setState({ message: message });
    }
    // console.log(event.target.letter.value);
  };


  wordToUnderscore = (currentWord) => {

    //we have to grab the length of the entire word 
    // currentWord.length

    // We need to know the length of the word so we know how many underscores to generate
    // We'll use a loop through each letter in the string 
    const correctGuesses = this.state.correctGuesses;
    let underscoreString = ''; //create string
    for (let i = 0; i <= currentWord.length - 1; i++) {
      //During each iteration (per letter), add an underscore
      //Use .concat 
      if (correctGuesses.includes(currentWord[i])) {
        underscoreString = underscoreString.concat(currentWord[i] + ' ');
      } else {
        underscoreString = underscoreString.concat("_ "); // First iteration is basically '' + '_ ' so = '_ '
      }
                                    // Second iteration '_ ' + '_ ' = '_ _ '
      //const newWrongGuesses = this.state.wrongGuesses.concat(guessedLetter); 
    }
    //take underscoreString and check if it includes underscores 
    //if true, game is not over (user has not won)
    //if false (all letters have been found), set message to "You've guessed the word!"

    //'!' at beginning of statement is saying if this is false / saying the opposite of 
    if (!underscoreString.includes("_")) {
      const message = 'You\'ve guessed the word!';
      this.setState({ won: true });
    }
    return underscoreString;
  }

  
  render() {
    return (
      <React.Fragment>
        {/* BELOW: this will decide the state that is showing on our page at a given time  */}
        {/* {currentlyVisibleState}  */}
        <p>Guesses Left: {this.state.guessesLeft}</p>
        <p>
          Wrong Guesses: {this.arrayToStringConverter(this.state.wrongGuesses)}
        </p>
        <p>
          Underscore thingy: {this.wordToUnderscore(this.state.currentWord)}
        </p>
        <p>
          Correct Guesses: {this.arrayToStringConverter(this.state.correctGuesses)}
        </p>

        <form onSubmit={this.wordLetterChecker}>
          <input type='text' name='letter' pattern='[A-Za-z]' maxLength='1' placeholder='Enter a Letter here' />
          <button type='submit'>Guess!</button>
        </form>

        <p>
          {this.state.message}
        </p>
      </React.Fragment>
    );
  }
}

export default WordControl;
