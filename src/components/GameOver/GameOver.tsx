import './GameOver.css';

type ResultsPageProps = {
    setGame: () => void
    moneyEarned: number;
}

const GameOver = ({ setGame, moneyEarned }: ResultsPageProps) => {
    return (
        <section className="menu">
            <div className="menu__container">
                <figure className="menu__img">
                    <img src="/img/hand.svg" alt="thumb up" />
                </figure>
                <div className="menu__cover">
                    <div className="menu__text">
                        <span className="menu__score">Total score:</span>
                        <h1 className="menu__title">${moneyEarned} earned</h1>
                    </div>
                    <div className="menu__button">
                        <button type="button" onClick={setGame}>Try again</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GameOver;