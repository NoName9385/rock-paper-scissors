// This would be stored in the 'src' folder of the GitHub repository
/// rock-paper-scissors.js

window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const RockPaperScissors = ({ assetsUrl }) => {
    const choices = ['rock', 'paper', 'scissors'];
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [computerChoice, setComputerChoice] = useState(null);
    const [playerChoice, setPlayerChoice] = useState(null);
    const [resultMessage, setResultMessage] = useState('');
    const [roundActive, setRoundActive] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    // Initialize x with a random number between 15 and 30
    useEffect(() => {
      setX(Math.floor(Math.random() * (30 - 15 + 1)) + 15);
    }, []);

    const getCounterChoice = (choice) => {
      switch (choice) {
        case 'rock':
          return 'scissors';
        case 'paper':
          return 'rock';
        case 'scissors':
          return 'paper';
        default:
          return null;
      }
    };

    const checkVictory = () => {
      if (y >= x) {
        // When victory condition is met
        setResultMessage("Victory achieved! Y has reached or exceeded X!");
        const counterChoice = getCounterChoice(playerChoice);
        setComputerChoice(counterChoice); // Set computer's choice to the choice beaten by the player
        resetThreshold();
      }
    };

    const playGame = (choice) => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      const computerChoice = choices[randomIndex];
      setComputerChoice(computerChoice);
      setPlayerChoice(choice);
      setRoundActive(true);

      // Determine the winner
      if (choice === computerChoice) {
        // Tie situation
        const tieIncrement = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
        setY(y + tieIncrement);
        setResultMessage(`It's a tie! Y is now ${y + tieIncrement}.`);
      } else if (
        (choice === 'rock' && computerChoice === 'scissors') ||
        (choice === 'scissors' && computerChoice === 'paper') ||
        (choice === 'paper' && computerChoice === 'rock')
      ) {
        // Player wins
        setWins(wins + 1);
        setY(0); // Reset Y
        setX(Math.floor(Math.random() * (30 - 15 + 1)) + 15); // Reset X
        setResultMessage("You win! Victory Threshold achieved!");
        // Set computer's choice to the choice that the player can defeat
        setComputerChoice(getCounterChoice(choice));
      } else {
        // Player loses
        const increment = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
        setY(y + increment);
        setLosses(losses + 1);
        setResultMessage(`You lose! Y is now ${y + increment}. Try again!`);
      }

      // Check for victory condition
      checkVictory();
    };

    const triggerFailure = () => {
      const increment = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Random increment between 5 and 10
      setY(y + increment);
      setLosses(losses + 1);
      setPlayerChoice('rock'); // Set player's choice to rock
      setComputerChoice('paper'); // Set computer's choice to paper
      setResultMessage(`Failure triggered! You chose Rock and the Computer chose Paper. Y is now ${y + increment}.`);

      // Check for victory condition after failure
      checkVictory();
    };

    const resetThreshold = () => {
      setY(0);
      setX(Math.floor(Math.random() * (30 - 15 + 1)) + 15); // Reset X
      nextRound();
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
      resetThreshold();
    };

    return React.createElement(
      'div',
      { className: "rock-paper-scissors", style: { textAlign: 'center' } },
      React.createElement('h2', null, "Rock-Paper-Scissors - Victory Threshold"),
      React.createElement('p', null, `Wins: ${wins} | Losses: ${losses}`),
      React.createElement('p', null, `Victory Threshold (X): ${x} | Current Y: ${y}`),
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
        ),
        React.createElement(
          'button',
          { onClick: triggerFailure, style: { marginTop: '20px' } },
          'Trigger Failure'
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