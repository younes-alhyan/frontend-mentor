export default function Food({ item, key }) {

    return (<div className="food-container">
        <div className="food-details">
            <div className="food-image-container">
                <img src={item.image.thumbnail} alt="thumbnail"></img>
            </div>
            <div className="ordered-food">
                <p className="food-name">{item.name}</p>
                <div className="food-quantity">
                    <p className="quantity">{item.quantity}x</p>
                    <p className="unity-price">@ ${item.price.toFixed(2)}</p>
                </div>
            </div>
        </div>
        <p className="food-price">${(item.price * item.quantity).toFixed(2)}</p>
    </div>)
}