import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
    const [couponCode, setCouponCode] = useState(""),
        [isCouponValid, setIsCouponValid] = useState(false),
        subtotal = 4000,
        shippingCharges = 200,
        tax = Math.round(subtotal * 0.18),
        discount = 400,
        total = subtotal + shippingCharges + tax,
        cartItemData = [
            {
                productId: "dfshjgfjdfshj",
                photo: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1685966374/Croma%20Assets/Computers%20Peripherals/Laptop/Images/256711_umnwok.png?tr=w-640",
                name: "Macbook",
                price: "77000",
                quantity: "40",
                stock: "10",
            },
        ];

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (Math.random() > 0.5) setIsCouponValid(true);
        }, 1000);
        return () => {
            clearTimeout(timeOutId);
            setIsCouponValid(false);
        };
    }, [couponCode]);

    return (
        <div className="cart">
            <main>{cartItemData.length > 0 ? cartItemData.map((elem, idx) => <CartItem key={idx} cartItem={elem} />) : <h1>No items added</h1>}</main>
            <aside>
                <p>Subtotal: ₹{subtotal}</p>
                <p>Shipping Charges: ₹{shippingCharges}</p>
                <p>Tax: ₹{tax}</p>
                <p>
                    Discount: ₹<em className="red">{discount}</em>
                </p>
                <p>
                    <b>Total: ₹{total}</b>
                </p>
                <input placeholder="Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)}></input>
                {couponCode &&
                    (isCouponValid ? (
                        <span className="green">
                            ₹{discount} off using <code>{couponCode}</code>
                        </span>
                    ) : (
                        <span className="red">
                            Invalid Coupon <VscError />
                        </span>
                    ))}
                {cartItemData.length > 0 && <Link to="/Shipping">Checkout</Link>}
            </aside>
        </div>
    );
};

export default Cart;
