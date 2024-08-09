// This would be stored in the 'src' folder of the GitHub repository
/// rock-paper-scissors.js

window.initGame = (React, assetsUrl) => {
  const { useState } = React;

  const RockPaperScissors = ({ assetsUrl }) => {
    const choices = ['rock', 'paper', 'scissors'];
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [computerChoice, setComputerChoice] = useState(null);
    const [playerChoice, setPlayerChoice] = useState(null);
    const [resultMessage, setResultMessage] = useState('');
    const [roundActive, setRoundActive] = useState(false);
    const [maxFailures, setMaxFailures] = useState(null); // Random draw threshold
    const [failureCounter, setFailureCounter] = useState(0); // Counter for failures/draws

    const determineComputerChoice = (playerChoice) => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      return choices[randomIndex];
    };

    const playGame = (choice) => {
      let computerChoice = determineComputerChoice(choice);
      setComputerChoice(computerChoice);
      setPlayerChoice(choice);
      setRoundActive(true);

      // Determine the winner
      if (choice === computerChoice) {
        setResultMessage("It's a tie!");
        handleFailure();
      } else if (
        (choice === 'rock' && computerChoice === 'scissors') ||
        (choice === 'scissors' && computerChoice === 'paper') ||
        (choice === 'paper' && computerChoice === 'rock')
      ) {
        setWins(wins + 1);
        setResultMessage("You win!");
        resetFailureCounter(); // Reset counter on win
      } else {
        setLosses(losses + 1);
        setResultMessage("You lose!");
        handleFailure();
      }
    };

    const handleFailure = () => {
      // Initialize maxFailures randomly between 3 and 7 on first failure
      if (maxFailures === null) {
        const randomFailures = Math.floor(Math.random() * 5) + 3; // Random number between 3 and 7
        setMaxFailures(randomFailures);
      }

      setFailureCounter(failureCounter + 1); // Increment counter

      // Check if we should force a win
      if (failureCounter + 1 >= maxFailures) {
        forceWin();
      }
    };

    const forceWin = () => {
      const winningChoice = playerChoice;
      const forcedComputerChoice = getLosingChoice(winningChoice);
      setComputerChoice(forcedComputerChoice);
      setWins(wins + 1);
      setResultMessage("You definitely win this round!");
      resetFailureCounter(); // Reset counter after forcing a win
    };

    const resetFailureCounter = () => {
      setFailureCounter(0);
      setMaxFailures(null); // Reset the maxFailures to allow for a new random value
    };

    const getLosingChoice = (winningChoice) => {
      // Returns the losing choice against the winning choice
      if (winningChoice === 'rock') return 'scissors';
      if (winningChoice === 'paper') return 'rock';
      if (winningChoice === 'scissors') return 'paper';
    };

    const nextRound = () => {
      setComputerChoice(null);
      setPlayerChoice(null);
      setResultMessage('');
      setRoundActive(false);
    };

    const resetGame = () => {
      setWins(0);
      setLosses(0);
      resetFailureCounter(); // Reset counter on game reset
      nextRound();
    };

    return React.createElement(
      'div',
      { className: "rock-paper-scissors", style: { textAlign: 'center' } },
      React.createElement('h2', null, "Rock-Paper-Scissors"),
      React.createElement('p', null, `Wins: ${wins} | Losses: ${losses}`),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' } },
        React.createElement('div', { className: "player-choice", style: { textAlign: 'center', marginRight: '20px' } },
          playerChoice && React.createElement('p', null, `You chose`),
          playerChoice && React.createElement('img', {
            src: `${assetsUrl}/${playerChoice}.png`,
            alt: playerChoice,
            style: { width: '100px' },
          })
        ),
        React.createElement('div', { className: "result", style: { textAlign: 'center', margin: '0 20px' } },
          React.createElement('p', null, resultMessage)
        ),
        React.createElement('div', { className: "computer-choice", style: { textAlign: 'center', marginLeft: '20px' } },
          computerChoice && React.createElement('p', null, `Computer chose`),
          computerChoice && React.createElement('img', {
            src: `${assetsUrl}/${computerChoice}.png`,
            alt: computerChoice,
            style: { width: '100px' },
          })
        )
      ),
      !roundActive && React.createElement(
        'div',
        { style: { marginTop: '20px' } },
        choices.map(choice =>
          React.createElement(
            'img',
            {
              key: choice,
              src: `${assetsUrl}/${choice}.png`,
              alt: choice,
              style: { width: '100px', cursor: 'pointer', margin: '10px' },
              onClick: () => playGame(choice),
            }
          )
        )
      ),
      React.createElement(
        'div',
        { style: { marginTop: '20px' } },
        roundActive && React.createElement(
          'button',
          { onClick: nextRound, style: { margin: '10px' } },
          'Next Round'
        ),
        React.createElement(
          'button',
          { onClick: resetGame, style: { margin: '10px' } },
          'Reset Game'
        )
      )
    );
  };

  return () => React.createElement(RockPaperScissors, { assetsUrl: assetsUrl });
};

console.log('Rock-Paper-Scissors game script loaded');