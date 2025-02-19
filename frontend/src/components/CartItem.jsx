import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const CartItem = (props) => {
    const { cartItem } = props;
    const { productId, photo, name, price, quantity, stock } = cartItem;
    return (
        <div className="cart-item">
            <img src={photo} alt={name} />

            <article>
                <Link to={`/Products/${productId}`}>{name}</Link>
                <span>{price}</span>
            </article>
            <div>
                <button>-</button>
                <p>{quantity}</p>
                <button>+</button>
            </div>
            <button>
                <FaTrash />
            </button>
        </div>
    );
};

export default CartItem;
