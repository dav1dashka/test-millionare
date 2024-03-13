import Answer from '../Answer/Answer';
import Timer from '../Timer/Timer';

import data from '../../config.json';

import './Play.css';

type PlayProps = {
    isTimerPaused: boolean;
    setIsTimeUp: React.Dispatch<React.SetStateAction<boolean>>;
    currentQuestion: number;
    questionData: {
        question: string;
        answers: string[];
        correctAnswers: string[];
        money: number;
    };
    correctAnswers: string[];
    onAnswer: (selectedAnswer: string) => void;
}

const Play = ({
    isTimerPaused,
    setIsTimeUp,
    currentQuestion,
    questionData,
    correctAnswers,
    onAnswer
}: PlayProps) => {
    const { question, answers } = questionData;

    return (
        <section className="play">
            <div className="play__container">
                <Timer
                    isTimerPaused={isTimerPaused}
                    setIsTimeUp={setIsTimeUp}
                    currentQuestion={currentQuestion}
                />
                <div className="play__question">
                    <h1>{question}</h1>
                </div>
                <div className="play__answers answers">
                    <ul className="answers__list">
                        {answers.map((answer, index) =>
                            <Answer
                                key={`answer-${answer}-${index}`}
                                type={correctAnswers[index]}
                                letter={data.capitalLetters[index]}
                                answer={answer}
                                onAnswer={onAnswer}
                            />
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Play;
