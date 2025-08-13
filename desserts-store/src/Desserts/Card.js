import React, { useState, useEffect } from 'react';
import CartButton from './CartButton';
import InCart from './InCart';

export default function Card({ image, category, name, price, addToCart, cart }) {
    const [product, setProduct] = useState({
        isInCart: false,
        quantity: 0,
    });

    useEffect(() => {
        // Check if the item is in the cart
        const inCartItem = cart.find(item => item.name === name);
        if (inCartItem) {
            setProduct({ isInCart: true, quantity: inCartItem.quantity });
        } else {
            setProduct({ isInCart: false, quantity: 0 });
        }
    }, [cart, name]);

    const handleAddToCart = () => {
        if (product.isInCart) {
            addToCart({ image, category, name, price, quantity: product.quantity + 1 });
        } else {
            addToCart({ image, category, name, price, quantity: 1 });
            setProduct({ ...product, isInCart: true, quantity: 1 });
        }
    };

    const increase = () => {
        setProduct((prevProduct) => {
            const newQuantity = prevProduct.quantity + 1;
            addToCart({ image, category, name, price, quantity: newQuantity });
            return { ...prevProduct, quantity: newQuantity };
        });
    };

    const decrease = () => {
        setProduct((prevProduct) => {
            const newQuantity = prevProduct.quantity > 1 ? prevProduct.quantity - 1 : 0;
            if (newQuantity === 0) {
                setProduct({ ...prevProduct, isInCart: false });
            }
            addToCart({ image, category, name, price, quantity: newQuantity });
            return { ...prevProduct, quantity: newQuantity };
        });
    };
    let isOrdered = product.quantity !==0;
    return (
        <div className="card">
            <div className={`image-container ${isOrdered ? 'border' : ''}`}>
                <img src={image.desktop} alt={name} className='product-image' />
                {isOrdered ? (
                    <InCart product={product} increase={increase} decrease={decrease} />
                ) : (
                    <CartButton addToCart={handleAddToCart} />
                )}
            </div>
            <p className='product-category'>{category}</p>
            <h4 className='product-name'>{name}</h4>
            <h4 className="price">${price.toFixed(2)}</h4>
        </div>
    );
}
