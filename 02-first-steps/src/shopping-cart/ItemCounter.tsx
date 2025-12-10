import { useState } from "react";
import "./ItemCounter.css";

export interface Props {
  name: string;
  quantity?: number;
}

export const ItemCounter = ({ name, quantity = 1 }: Props) => {
  const [count, setCount] = useState(quantity);
  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleSubstract = () => {
    if (count === 1) return;

    setCount(count - 1);
  };
  return (
    <section className="item">
      <p
        className="item-text"
        style={{
          color: count === 1 ? "red" : "blue",
        }}
      >
        {name}
      </p>
      <button onClick={handleSubstract}>-1</button>
      <span>{count}</span>
      <button onClick={handleAdd}>+1</button>
    </section>
  );
};
