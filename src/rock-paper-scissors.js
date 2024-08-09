// This would be stored in the 'src' folder of the GitHub repository
// rock-paper-scissors.js

window.initGame = (React, assetsUrl) => {
  const { useState } = React;

  const RockPaperScissors = ({ assetsUrl }) => {
    const choices = ['rock', 'paper', 'scissors'];
    const [score, setScore] = useState(0);
    const [computerChoice, setComputerChoice] = useState(null);
    const [resultMessage, setResultMessage] = useState('');
    const [detailedMessage, setDetailedMessage] = useState('');

    const playGame = (playerChoice) => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      const computerChoice = choices[randomIndex];
      setComputerChoice(computerChoice);

      // Determine the winner
      if (playerChoice === computerChoice) {
        setResultMessage("It's a tie!");
        setDetailedMessage(`You both chose ${computerChoice}.`);
      } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'scissors' && computerChoice === 'paper') ||
        (playerChoice === 'paper' && computerChoice === 'rock')
      ) {
        setScore(score + 1);
        setResultMessage("You win!");
        setDetailedMessage(`You chose ${playerChoice} and the computer chose ${computerChoice}.`);
      } else {
        setScore(score - 1);
        setResultMessage("You lose!");
        setDetailedMessage(`You chose ${playerChoice} and the computer chose ${computerChoice}.`);
      }
    };

    const resetGame = () => {
      setScore(0);
      setComputerChoice(null);
      setResultMessage('');
      setDetailedMessage('');
    };

    return React.createElement(
      'div',
      { className: "rock-paper-scissors" },
      React.createElement('h2', null, "Rock-Paper-Scissors"),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement('div', { className: "choices" },
        choices.map(choice =>
          React.createElement(
            'img',
            {
              key: choice,
              src: `${assetsUrl}/${choice}.png`, // Assuming the images are named rock.png, paper.png, scissors.png
              alt: choice,
              style: { width: '100px', cursor: 'pointer', margin: '10px' },
              onClick: () => playGame(choice),
            }
          )
        )
      ),
      computerChoice && React.createElement('p', null, `Computer chose: ${computerChoice}`),
      React.createElement('p', null, resultMessage),
      React.createElement('p', null, detailedMessage),
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