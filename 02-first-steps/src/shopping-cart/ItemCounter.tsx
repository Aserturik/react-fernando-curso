export interface Props {
  name: string;
  quantity: number;
}

export const ItemCounter = ({ name, quantity }: Props) => {
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
      <button>
        +1
      </button>
      <span>{quantity}</span>
      <button>
        -1
      </button>
    </section>
  );
};
