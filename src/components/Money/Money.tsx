import MoneyItem from '../MoneyItem/MoneyItem';

import './Money.css';

type MoneyMenuProps = {
  moneyList: number[],
  currentQuestionIndex: number
}

const Money = ({ moneyList, currentQuestionIndex }: MoneyMenuProps) => {
  const moneyItems = moneyList.map((money, index) => {
    const type =
      currentQuestionIndex === index ? 'active' :
        currentQuestionIndex < index ? 'inactive' : 'disabled';

    return (
      <MoneyItem
        key={`money-item-${money}-${index}`}
        money={money}
        type={type}
      />
    )
  }).reverse();

  return (
    <section className="money">
      <ul className="money__list">
        {moneyItems}
      </ul>
    </section>
  );
};

export default Money;