// This would be stored in the 'src' folder of the GitHub repository
// rock-paper-scissors.js

window.initGame = (React, assetsUrl) => {
  const { useState } = React;

  const RockPaperScissors = ({ assetsUrl }) => {
    const choices = ['rock', 'paper', 'scissors'];
    const [score, setScore] = useState(0);
    const [computerChoice, setComputerChoice] = useState(null);
    const [resultMessage, setResultMessage] = useState('');

    const playGame = (playerChoice) => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      const computerChoice = choices[randomIndex];
      setComputerChoice(computerChoice);

      // Determine the winner
      if (playerChoice === computerChoice) {
        setResultMessage("It's a tie!");
      } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'scissors' && computerChoice === 'paper') ||
        (playerChoice === 'paper' && computerChoice === 'rock')
      ) {
        setScore(score + 1);
        setResultMessage("You win!");
      } else {
        setScore(score - 1);
        setResultMessage("You lose!");
      }
    };

    return React.createElement(
      'div',
      { className: "rock-paper-scissors" },
      React.createElement('h2', null, "Rock-Paper-Scissors"),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement('div', { className: "choices" },
        choices.map(choice =>
          React.createElement(
            'button',
            {
              key: choice,
              onClick: () => playGame(choice),
            },
            choice.charAt(0).toUpperCase() + choice.slice(1)
          )
        )
      ),
      computerChoice && React.createElement('p', null, `Computer chose: ${computerChoice}`),
      React.createElement('p', null, resultMessage)
    );
  };

  return () => React.createElement(RockPaperScissors, { assetsUrl: assetsUrl });
};

console.log('Rock-Paper-Scissors game script loaded');