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
        setFailureCounter(failureCounter + 1); // Increment counter on draw
      } else if (
        (choice === 'rock' && computerChoice === 'scissors') ||
        (choice === 'scissors' && computerChoice === 'paper') ||
        (choice === 'paper' && computerChoice === 'rock')
      ) {
        setWins(wins + 1);
        setResultMessage("You win!");
        setFailureCounter(0); // Reset counter on win
      } else {
        setLosses(losses + 1);
        setResultMessage("You lose!");
        setFailureCounter(failureCounter + 1); // Increment counter on loss
      }

      // Check if we should force a win
      if (failureCounter >= 3 && failureCounter <= 7) {
        // Force a winning condition
        const winningChoice = getWinningChoice(choice);
        const forcedComputerChoice = getLosingChoice(winningChoice);
        setComputerChoice(forcedComputerChoice);
        setWins(wins + 1);
        setResultMessage("You definitely win this round!");
        setFailureCounter(0); // Reset counter after forcing a win
      }
    };

    const getWinningChoice = (choice) => {
      // Returns the winning choice against the player's choice
      if (choice === 'rock') return 'paper';
      if (choice === 'paper') return 'scissors';
      if (choice === 'scissors') return 'rock';
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
      setFailureCounter(0); // Reset counter on game reset
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