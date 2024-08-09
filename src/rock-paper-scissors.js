// This would be stored in the 'src' folder of the GitHub repository
// rock-paper-scissors.js

window.initGame = (React, assetsUrl) => {
  const { useState } = React;

  const RockPaperScissors = ({ assetsUrl }) => {
    const choices = ['rock', 'paper', 'scissors'];
    const [score, setScore] = useState(0);
    const [computerChoice, setComputerChoice] = useState(null);
    const [playerChoice, setPlayerChoice] = useState(null);
    const [resultMessage, setResultMessage] = useState('');
    const [roundActive, setRoundActive] = useState(false);

    const playGame = (choice) => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      const computerChoice = choices[randomIndex];
      setComputerChoice(computerChoice);
      setPlayerChoice(choice);
      setRoundActive(true);

      // Determine the winner
      if (choice === computerChoice) {
        setResultMessage("It's a tie!");
      } else if (
        (choice === 'rock' && computerChoice === 'scissors') ||
        (choice === 'scissors' && computerChoice === 'paper') ||
        (choice === 'paper' && computerChoice === 'rock')
      ) {
        setScore(score + 1);
        setResultMessage("You win!");
      } else {
        setScore(score - 1);
        setResultMessage("You lose!");
      }
    };

    const nextRound = () => {
      setComputerChoice(null);
      setPlayerChoice(null);
      setResultMessage('');
      setRoundActive(false);
    };

    const resetGame = () => {
      setScore(0);
      nextRound();
    };

    return React.createElement(
      'div',
      { className: "rock-paper-scissors", style: { textAlign: 'center' } },
      React.createElement('h2', null, "Rock-Paper-Scissors"),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px' } },
        React.createElement('div', { className: "player-choice", style: { textAlign: 'center', margin: '0 5px' } },
          playerChoice && React.createElement('p', null, `You chose`),
          playerChoice && React.createElement('img', {
            src: `${assetsUrl}/${playerChoice}.png`,
            alt: playerChoice,
            style: { width: '150px' }, // Enlarged image
          })
        ),
        React.createElement('div', { className: "result", style: { textAlign: 'center', margin: '0 20px' } },
          React.createElement('p', null, resultMessage)
        ),
        React.createElement('div', { className: "computer-choice", style: { textAlign: 'center', margin: '0 5px' } },
          computerChoice && React.createElement('p', null, `Computer chose`),
          computerChoice && React.createElement('img', {
            src: `${assetsUrl}/${computerChoice}.png`,
            alt: computerChoice,
            style: { width: '150px' }, // Enlarged image
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