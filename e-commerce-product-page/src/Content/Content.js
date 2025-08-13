import './Content.css'
import Shoes from './Shoes'
import StoreSection from './StoreSection'
export default function Content({ addToCart, sneaker }) {
    return (<div className="content">
        <Shoes />
        <StoreSection addToCart={addToCart} sneaker={sneaker}/>
    </div>)
}