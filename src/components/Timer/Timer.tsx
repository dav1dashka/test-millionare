import { useEffect, useState } from "react";

import './Timer.css';

type TimerProps = {
    isTimerPaused: boolean;
    setIsTimeUp: React.Dispatch<React.SetStateAction<boolean>>;
    currentQuestion: number;
}

const Timer = ({ isTimerPaused, setIsTimeUp, currentQuestion }: TimerProps) => {
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        if (isTimerPaused) return;

        if (timer === 0) return setIsTimeUp(true);

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, isTimerPaused]);

    useEffect(() => {
        setTimer(30);
    }, [currentQuestion]);

    return (
        <section className="timer">
            <div className="timer__cover">
                <span>{timer}</span>
            </div>
        </section>
    )
}

export default Timer;