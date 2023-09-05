import React, { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

const App = () => {
  const [items, setItems] = useState([]);

  const clearList = () => {
    const confirmed = window.confirm("Você realmente quer limpar a lista?");
    if (confirmed) {
      setItems([]);
    }
  };

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
        clearList={clearList}
      />
      <Stats items={items} />
    </div>
  );
};

export default App;
