import './GameStart.css'

type GameStartProps = { onStartGame: () => void; }

const GameStart = ({ onStartGame }: GameStartProps) => {
  return (
    <section className="menu">
      <div className="menu__container">
        <figure className="menu__img">
          <img src="/img/hand.svg" alt="thumb up" />
        </figure>
        <div className="menu__cover">
          <h1 className="menu__title">Who wants to be a millionaire?</h1>
          <div className="menu__button">
            <button type="button" onClick={onStartGame}>Start</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameStart;
