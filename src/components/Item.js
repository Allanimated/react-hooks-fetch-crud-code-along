import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {

  function addToCart(item) { 
    fetch(`http://localhost:4000/items/${item.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...item,
        isInCart: !item.isInCart
      })
    })
    .then(resp => resp.json())
    .then(updatedItem => {
      onUpdateItem(updatedItem)
    })
    
  }
  function handleDeleteItem(itemId) {
    fetch(`http://localhost:4000/items/${itemId}`, {
      method: "DELETE"
    })
    .then(r => r.json()).then(() => onDeleteItem(itemId))
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={() => addToCart(item)}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={()=> handleDeleteItem(item.id)}>Delete</button>
    </li>
  );
}

export default Item;
