import { useState } from "react";

interface Props {
  name: string;
  quantity: number;
}

export const NewItemCounter = ({ name, quantity }: Props) => {
  const [count, setCount] = useState(quantity);

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleSubstract = () => {
    setCount(count - 1);
  };
  return (
    <div>
      <button onClick={handleAdd}>+1</button>
      <p>{name}</p>
      <p>{count}</p>
      <button onClick={handleSubstract}>-1</button>
    </div>
  );
};
