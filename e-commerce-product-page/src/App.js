import './App.css';
import React, { useState } from 'react';
import NavBar from './NavBar/NavBar';
import Content from './Content/Content';
function App() {
  const [Cart, setCart] = useState({
    isEmpty: true,
    inCart: 0,
  });
  const [sneaker] = useState({
    name: "Fall Limited Edition Sneakers",
    price: 125
  })
  const addToCart = (quantity) => {
    const newQuantity = Cart.inCart + quantity;
    const updatedCart = {
      isEmpty: newQuantity === 0,
      inCart: newQuantity
    };
    setCart(updatedCart);
  }

  const removeFromCart = () => {
    const emptyCart = {
      isEmpty: true,
      inCart: 0
    }
    setCart(emptyCart);
  }
  return (
    <div className="App">
      <NavBar cart={Cart} removeFromCart={removeFromCart} sneaker={sneaker} />
      <Content addToCart={addToCart} sneaker={sneaker} />
    </div>
  );
}

export default App;
