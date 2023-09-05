import React, {useState} from 'react'

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

export default Form