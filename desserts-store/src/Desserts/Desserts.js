// Desserts.js
import React from 'react';
import Card from './Card';

export default function Desserts({ items, addToCart, cart }) {
    if (!Array.isArray(items)) {
        return <p>Invalid data format</p>;
    }
    return (
        <div className="desserts">
            <h1>Desserts</h1>
            <div className="desserts-container">
                {items.map((item, index) => (
                    <Card
                        key={index}
                        image={item.image}
                        category={item.category}
                        name={item.name}
                        price={item.price}
                        addToCart={addToCart}
                        cart={cart}
                    />
                ))}
            </div>
        </div>
    );
}
