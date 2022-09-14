import React from 'react';

class WordControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guessesLeft: 4,
      wrongGuesses: ['x', 'z'],
      wordPool: ['shovel', 'lance', 'axe', 'band'],
      currentWord: 'shovel',
      correctGuesses: [],
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
    /*
      if guessed correctly
        update correctGuesses
        display correctGuesses <- implmenet separately
      if guessed incorrectly
        add to wrongGuesses
        decrement guessesLeft
    */

    console.log(event.target.letter.value);
  };

  render() {
    return (
      <React.Fragment>
        {/* BELOW: this will decide the state that is showing on our page at a given time  */}
        {/* {currentlyVisibleState}  */}
        <p>Guesses Left: {this.state.guessesLeft}</p>
        <p>
          Wrong Guesses: {this.arrayToStringConverter(this.state.wrongGuesses)}
        </p>

        <form onSubmit={this.wordLetterChecker}>
          <input type='text' name='letter' placeholder='Enter a Letter here' />
          <button type='submit'>Guess!</button>
        </form>
      </React.Fragment>
    );
  }
}

export default WordControl;
