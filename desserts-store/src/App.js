import React, { useState, useEffect } from 'react';
import './App.css';
import Desserts from './Desserts/Desserts';
import Cart from './Cart/Cart';
import Order from './Cart/confirmed-order/Order';

function App() {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const basePath = process.env.NODE_ENV === 'development' ? '' : 'https://itachi-555.github.io/desserts-store';
        const res = await fetch(`${basePath}/data.json`); // Adjust the path if necessary
        if (!res.ok) throw new Error('Network response was not ok');
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const updateCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(i => i.name === item.name);
      if (existingItemIndex !== -1) {
        if (item.quantity === 0) {
          return prevItems.filter(i => i.name !== item.name);
        }
        // Update existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = item;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, item];
      }
    });
  };

  const removeItem = (item) => {
    setCartItems((prevItems) => {
      // Filter out the item to be removed
      return prevItems.filter(i => i.name !== item.name);
    });
  };

  const clearCart = () => {
    cartItems.forEach((item) => {
      removeItem(item);
    });
  };

  return (
    <div className='App'>
      <div className='container'>
        <Desserts items={data} addToCart={updateCart} cart={cartItems} />
        <Cart items={cartItems} addToCart={updateCart} removeFromCart={removeItem} togglePopup={togglePopup} />
      </div>
      <Order cart={cartItems} show={showPopup} togglePopup={togglePopup} clearCart={clearCart} />
    </div>
  );
}

export default App;
