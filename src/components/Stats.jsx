import React from "react";

const Stats = ({ items }) => {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Comece adicionando algum item para a viagem.</em>
      </p>
    );
  }

  const numberItems = items.length;
  const numberPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numberPacked / numberItems) * 100);

  return (
    <footer className="stats">
      {percentage === 100
        ? "Tudo preparado! Você está pronto para viajar!"
        : `💼 Você tem ${numberItems} ${
            numberItems < 2 ? "item" : "itens"
          } na sua lista, e ${numberPacked} ${
            numberPacked < 2 ? "item" : "itens"
          } já
         estão prontos (${percentage}%).`}
    </footer>
  );
};

export default Stats;
