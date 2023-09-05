import React, {useState} from 'react';
import Item from './Item';

const PackingList = ({
     items,
     handleDeleteItem,
     handleToggleItem,
     clearList,
   }) => {
     const [sortBy, setSorBy] = useState("input");
   
     let sortedItems;
   
     if (sortBy === "input") {
       sortedItems = items;
     }
   
     if (sortBy === "alphabetic") {
       sortedItems = items
         .slice()
         .sort((a, b) => a.description.localeCompare(b.description));
     }
   
     if (sortBy === "packed") {
       sortedItems = items
         .slice()
         .sort((a, b) => Number(a.packed) - Number(b.packed));
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
   
           <button onClick={() => clearList()}>Limpar lista</button>
         </div>
       </div>
     );
   };
   

export default PackingList