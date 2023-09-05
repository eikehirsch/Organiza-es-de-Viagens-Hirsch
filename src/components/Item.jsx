import React from "react";

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

export default Item;
