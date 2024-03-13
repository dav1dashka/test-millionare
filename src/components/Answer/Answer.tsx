import { useEffect, useState } from 'react';

import './Answer.css';

type AnswerProps = {
    type: string;
    letter: string;
    answer: string,
    onAnswer: (selectedAnswer: string) => void
}

const Answer = ({ type, letter, answer, onAnswer }: AnswerProps) => {
    const [selected, setSelected] = useState<boolean>(false);
    const [answerClass, setAnswerClass] = useState<string>("answer");
    const check = type !== 'unactive' && type !== 'correct unactive' &&
        type !== 'wrong unactive' && type !== 'default unactive';

    const handleClick = () => {
        onAnswer(answer);
        setSelected(true);
    };
    useEffect(() => { setAnswerClass(`answer ${type}`); }, [type]);

    useEffect(() => { setAnswerClass(`answer ${selected ? 'select' : ''}`); }, [selected]);

    return (
        <li className={answerClass} onClick={check ? handleClick : undefined}>
            <svg className="answer__svg" width="850" height="160" viewBox="6 21 410 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M405 36L422 36" stroke="#D0D0D8" />
                <path d="M0 36L17 36" stroke="#D0D0D8" />
                <path d="M49.0722 0.5H372.928C376.541 0.5 379.945 2.19863 382.118 5.08639L405.374 36L382.118 66.9136C379.945 69.8014 376.541 71.5 372.928 71.5H49.0722C45.4585 71.5 42.055 69.8014 39.8825 66.9136L16.6257 36L39.8825 5.08639C42.055 2.19863 45.4585 0.5 49.0722 0.5Z" fill="white" stroke="#D0D0D8" />
                <text className="answer__letter" x="50" y="43" fill="#3891b1">{letter}</text>
                <text className="answer__text" x="78" y="43" fill="#1C1C21">{answer}</text>
            </svg>
        </li>
    );
};

export default Answer;
