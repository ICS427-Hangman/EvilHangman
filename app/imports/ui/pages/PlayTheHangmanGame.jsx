import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import swal from 'sweetalert';
import dictionaryWords from './dictionary';

export default function PlayTheHangmanGame() {
  const [numChars, setNumChars] = useState('');
  const [numGuesses, setNumGuesses] = useState('');
  const [word, setWord] = useState('');
  const [guessesLeft, setGuessesLeft] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [guessedChars, setGuessedChars] = useState(new Set());
  const [displayedWord, setDisplayedWord] = useState('');

  const handleNumCharsChange = (event) => {
    setNumChars(event.target.value);
  };

  const handleNumGuessesChange = (event) => {
    setNumGuesses(event.target.value);
  };

  const handleStartGame = () => {
    if (numChars > 0 && numGuesses > 0) {
      const words = dictionaryWords.split('\n');
      // eslint-disable-next-line no-shadow
      const filteredWords = words.filter((word) => word.length === Number(numChars));
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
      const randomWord = filteredWords.length > 0 ? filteredWords[randomIndex] : '';
      setWord(randomWord);
      setGuessesLeft(numGuesses);
      setGameOver(false);
    } else {
      swal('Warning', 'Number of characters and number of guesses must greater than zero');
    }
  };

  const handleGuess = (event) => {

    const char = event.target.value.toLowerCase();
    if (!/^[a-z]$/.test(char) || guessedChars.has(char) || gameOver) {
      return;
    }
    const newGuessedChars = new Set(guessedChars);
    newGuessedChars.add(char);
    setGuessedChars(newGuessedChars);
    if (word.includes(char)) {
      const newDisplayedWord = word.replace(new RegExp(`[^${Array.from(newGuessedChars).join('')}]`, 'g'), '_');
      setDisplayedWord(newDisplayedWord);
    } else {
      setGuessesLeft(guessesLeft - 1);
    }

    if (guessesLeft === 1 || !displayedWord.includes('_')) {
      setGameOver(true);
    }
  };
  useEffect(() => {
    setWord('');
    setDisplayedWord('');
    setGuessesLeft('');
    setGuessedChars(new Set());
    setGameOver(false);
  }, [numChars, numGuesses]);

  useEffect(() => {
    setDisplayedWord(word.replace(/[a-z]/g, '_'));
  }, [word]);

  return (
    <Grid style={{ marginTop: '30px', marginBottom: '30px' }} id='landing-page' verticalAlign='middle' textAlign='center' container>
      {!gameOver ? (
        <div>
          {!word ? (
            <div style={{ marginTop: '20px' }}>
              <label style={{ marginTop: '20px' }}>
                Number of characters in word:
                <input style={{ marginTop: '20px', marginLeft: '10px' }} type="number" value={numChars} onChange={handleNumCharsChange} />
              </label>
              <br />
              <label style={{ marginTop: '20px' }}>
                Number of guesses allowed:
                <input style={{ marginTop: '20px', marginLeft: '10px' }} type="number" value={numGuesses} onChange={handleNumGuessesChange} />
              </label>
              <br />
              <button style={{ marginTop: '20px', fontFamily: "'Finger Paint', cursive", padding: '10px' }} onClick={handleStartGame}>Start game</button>
            </div>
          ) : (
            <div style={{ marginTop: '20px' }}>
              <p>Word: {displayedWord}</p>
              <p>Guesses left: {guessesLeft}</p>
              <p>Guessed characters: {Array.from(guessedChars).join(',')}</p>
              <br />
              <label>
                Guess a character:
                <input style={{ marginTop: '20px', marginLeft: '10px' }} type="text" value="" maxLength="1" pattern="[a-zA-Z]" onChange={handleGuess} />
              </label>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>{word}</p>
          {guessesLeft === 0 ? (
            <p>You lose!</p>
          ) : (
            <p>You win!</p>
          )}
          {/* eslint-disable-next-line no-undef */}
          <button style={{ marginTop: '20px', fontFamily: "'Finger Paint', cursive", padding: '10px' }} onClick={() => window.location.reload()}>Play again</button>
        </div>
      )}
    </Grid>
  );
}
