import React, { useState } from "react";


const App = () => {
  const [items, setItems] = useState([]);

  const handleAddItem = (itemId) => {
    setItems((currentItems) => [...currentItems, itemId]);
  };

  const handleDeleteItem = (deleteItem) => {
    const newItemsArray = items.filter((item) => item.id !== deleteItem.id);
    setItems(newItemsArray);
  };

  const handleToggleItem = (updateItem) => {
    const newItemsArray = items.map((item) =>
      item.id === updateItem.id ? { ...item, packed: !item.packed } : item
    );
    setItems(newItemsArray);
  };

  return (
    <div>
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
};

const Logo = () => {
  return <h1>🏝️ Organização de Viagens Hirsch 🧳</h1>;
};

const Form = ({ handleAddItem }) => {
  const [description, setNewDescription] = useState("");
  const [quantity, setNewQuantity] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !quantity) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    handleAddItem(newItem);

    setNewDescription("");
    setNewQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h3>O que você precisa para a sua viagem?</h3>
      <select
        value={quantity}
        onChange={(e) => setNewQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

const PackingList = ({ items, handleDeleteItem, handleToggleItem }) => {

  const [sortBy, setSorBy] = useState("input");

  let sortedItems;

  if (sortBy === 'input') {
    sortedItems = items;
  }

  if (sortBy === 'alphabetic') {
    sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description));
  }

  if (sortBy === 'packed') {
    sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems !== undefined &&
          sortedItems.length > 0 &&
          sortedItems.map((initialItem) => (
            <Item
              key={initialItem.id}
              item={initialItem}
              handleDeleteItem={handleDeleteItem}
              handleToggleItem={handleToggleItem}
            />
          ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSorBy(e.target.value)}>
          <option value="input">Ordenar por ordem de criação</option>
          <option value="alphabetic">Ordenar por ordem alfabética</option>
          <option value="packed">Ordenar por ordem de status</option>
        </select>
      </div>
    </div>
  );
};

const Item = ({ item, handleDeleteItem, handleToggleItem }) => {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() => handleToggleItem(item)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItem(item)}>❌</button>
    </li>
  );
};

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
        : `💼 Você tem ${numberItems} itens na sua lista, e ${numberPacked} itens já
      estão prontos (${percentage}%).`}
    </footer>
  );
};

export default App;
