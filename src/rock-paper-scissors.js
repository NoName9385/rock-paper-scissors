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

    const playGame = (choice) => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      const computerChoice = choices[randomIndex];
      setComputerChoice(computerChoice);
      setPlayerChoice(choice);

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

    const resetGame = () => {
      setScore(0);
      setComputerChoice(null);
      setPlayerChoice(null);
      setResultMessage('');
    };

    return React.createElement(
      'div',
      { className: "rock-paper-scissors" },
      React.createElement('h2', null, "Rock-Paper-Scissors"),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement('div', { className: "game-display", style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('div', { className: "player-choice", style: { textAlign: 'center' } },
          playerChoice && React.createElement('img', {
            src: `${assetsUrl}/${playerChoice}.png`,
            alt: playerChoice,
            style: { width: '100px' },
          }),
          playerChoice && React.createElement('p', null, `You chose: ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}`)
        ),
        React.createElement('div', { className: "result", style: { textAlign: 'center' } },
          React.createElement('p', null, resultMessage)
        ),
        React.createElement('div', { className: "computer-choice", style: { textAlign: 'center' } },
          computerChoice && React.createElement('img', {
            src: `${assetsUrl}/${computerChoice}.png`,
            alt: computerChoice,
            style: { width: '100px' },
          }),
          computerChoice && React.createElement('p', null, `Computer chose: ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}`)
        )
      ),
      React.createElement(
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
        'button',
        { onClick: resetGame, style: { marginTop: '20px' } },
        'Reset Game'
      )
    );
  };

  return () => React.createElement(RockPaperScissors, { assetsUrl: assetsUrl });
};

console.log('Rock-Paper-Scissors game script loaded');