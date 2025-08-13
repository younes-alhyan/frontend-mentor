export default function Item({ item, removeFromCart }) {
    return (
        <div className="item-container">
            <div className="item-details">
                <h4>{item.name}</h4>
                <div className="price-row">
                    <p className="quantity">{item.quantity}x</p>
                    <p className="unity-price">@ ${item.price.toFixed(2)}</p>
                    <p className="product-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
            <button className="delete" onClick={() => { removeFromCart(item) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                    <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
                </svg>
            </button>
        </div>
    );
}
