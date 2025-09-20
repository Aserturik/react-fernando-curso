import { useState } from "react";

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
    <section
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <p>{name}</p>
      <button
        onClick={handleSubstract}
      >
        -1
      </button>
      <span>{count}</span>
      <button onClick={handleAdd}>
        +1
      </button>
    </section>
  );
};
