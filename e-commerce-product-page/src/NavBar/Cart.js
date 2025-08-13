export default function Cart({ cart, sneaker, removeFromCart }) {
    return (<div className="cart-component" id="cart-component">
        <h1>Cart</h1>
        <CartElements cart={cart} sneaker={sneaker} removeFromCart={removeFromCart} />
    </div>)
}
function CartElements({ cart, sneaker, removeFromCart }) {
    let total = cart.inCart * sneaker.price;
    return cart.isEmpty ? (<p className="empty-cart">
        Your cart is empty
    </p>) : (<div className="cart-items">
        <div className="product-row">
            <div className="article-image">
                <img src="./images/image-product-1-thumbnail.jpg" alt=""></img>
            </div>
            <div className="article-informations">
                <p className="article-name">
                    {sneaker.name}
                </p>
                <div className="price-quantity-row">
                    ${(sneaker.price).toFixed(2)} x {cart.inCart}<p className="total-price">${total.toFixed(2)}</p>
                </div>
            </div>
            <button className="delete" onClick={removeFromCart}><svg width="14" height="16" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a" />
                </defs>
                <use fill="#C3CAD9" fillRule="nonzero" xlinkHref="#a" />
            </svg>
            </button>
        </div>
        <button className="checkout">Checkout</button>
    </div>)
}