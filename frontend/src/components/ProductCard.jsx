import { FaPlus } from "react-icons/fa";

const ProductCard = (props) => {
    const { productId, photo, name, price, stock, handler } = props;

    return (
        <div className="product-card">
            <img src={photo} alt="ProductName" />
            <p>{name}</p>
            <span>{price}</span>
            <div>
                <button onClick={() => handler()}>
                    <FaPlus />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
