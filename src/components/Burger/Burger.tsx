import { useState } from 'react';

import Money from '../Money/Money';

import './Burger.css';

type BurgerProps = {
    moneyList: number[];
    currentQuestion: number;
}

const Burger = ({ moneyList, currentQuestion }: BurgerProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => { setIsOpen(prev => !prev) };

    return (
        <div className={`burger ${isOpen ? " open" : ""}`}>
            <button className="burger__button" onClick={toggleMenu} type="button" title="Open money piramyd"></button>
            <div className="burger__content">
                <Money
                    moneyList={moneyList}
                    currentQuestionIndex={currentQuestion}
                />
            </div>
        </div>
    );
};

export default Burger;
