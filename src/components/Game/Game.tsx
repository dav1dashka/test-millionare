import { useEffect, useState } from 'react';

import Play from '../Play/Play';
import Money from '../Money/Money';
import Burger from '../Burger/Burger';
import GameOver from '../GameOver/GameOver';

import data from '../../config.json';

import './Game.css';

type GameProps = { setGame: () => void; }

const Game = ({ setGame }: GameProps) => {
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const [moneyEarned, setMoneyEarned] = useState<number>(0);
  const [failed, setFailed] = useState<boolean>(false);

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answeredQuestion, setAnsweredQuestion] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [correctAnswers, setCorrectAnswers] = useState(
    data.questions && data.questions[currentQuestion]
      ? Array(data.questions[currentQuestion].answers.length).fill('default')
      : []
  );

  const moneyList = data.questions.map(question => question.money);

  const handleAnswer = (selectedAnswerArg: string) => {
    setSelectedAnswer(selectedAnswerArg)
  };

  useEffect(() => {
    if (typeof selectedAnswer !== 'undefined' && selectedAnswer !== null && selectedAnswer !== '') {
      setAnsweredQuestion((prev: string[]) => {
        const a = [...prev, selectedAnswer!]
        return [...new Set(a)]
      });
      setSelectedAnswer('');
    }
  }, [selectedAnswer])

  useEffect(() => {
    if (data.questions[currentQuestion] && answeredQuestion.length === data.questions[currentQuestion].correctAnswers.length) {
      const currentCorrectAnswers = data.questions[currentQuestion];
      const correctAnswersSet = new Set(currentCorrectAnswers.correctAnswers);
      const newAnsweredQuestion = answeredQuestion;
      setAnsweredQuestion([]);
      setIsTimerPaused(true);

      setTimeout(() => {
        const unactiveAnswers = currentCorrectAnswers.answers.map(() => {
          return 'unactive';
        });
        setCorrectAnswers(unactiveAnswers);
      }, 200);

      setTimeout(() => {
        const newCorrectAnswers = currentCorrectAnswers.answers.map((answer) => {
          if (newAnsweredQuestion.includes(answer)) {
            return correctAnswersSet.has(answer) ? 'correct unactive' : 'wrong unactive';
          } else {
            return 'default unactive';
          }
        });

        setCorrectAnswers(newCorrectAnswers);
      }, 1300);
    }
  }, [answeredQuestion.length]);

  useEffect(() => {
    if (typeof correctAnswers !== 'undefined' && !correctAnswers.every(element => element === 'default')
      && !correctAnswers.every(element => element === 'unactive')) {
      setTimeout(() => {
        const currentQuestionData = data.questions[currentQuestion];
        let allItemsPresent = true;

        for (const item of correctAnswers) {
          if (item === 'wrong unactive') {
            allItemsPresent = false;
            break;
          }
        }

        if (allItemsPresent) {
          const nextMoneyEarned = moneyEarned + currentQuestionData.money;
          setMoneyEarned(nextMoneyEarned);
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setFailed(prev => !prev);
        }

        setIsTimerPaused(false);
        setCorrectAnswers(Array(data.questions[currentQuestion].answers.length).fill('default'));
      }, 4300);
    }
  }, [correctAnswers])

  if (currentQuestion === data.questions.length || isTimeUp || failed) {
    return <GameOver setGame={setGame} moneyEarned={moneyEarned} />;
  }

  return (
    <div className="game">
      <Burger
        moneyList={moneyList}
        currentQuestion={currentQuestion}
      />
      <Play
        isTimerPaused={isTimerPaused}
        setIsTimeUp={setIsTimeUp}
        currentQuestion={currentQuestion}
        correctAnswers={correctAnswers}
        questionData={data.questions[currentQuestion]}
        onAnswer={handleAnswer}
      />
      <div className="game__money-desktop">
        <Money
          moneyList={moneyList}
          currentQuestionIndex={currentQuestion}
        />
      </div>
    </div>
  );
};

export default Game;