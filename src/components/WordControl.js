import React from 'react';

class WordControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guessesLeft: 0,
      wrongGuesses: 0,
      wordPool: [shovel, lance, axe, band]
    };
  }

  render() {
    return (
      <React.Fragment>
        <button>Guess!</button>
      </React.Fragment>
    );
  }
}
