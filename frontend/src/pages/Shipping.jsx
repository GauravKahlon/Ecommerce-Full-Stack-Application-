import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
    const navigate = useNavigate(),
        [shippingInfo, setShippingInfo] = useState({
            address: "",
            city: "",
            state: "",
            country: "",
            pinCode: "",
        }),
        changeHandler = (e) => {
            setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        };
    return (
        <div className="shipping">
            <button className="back-btn" onClick={() => navigate("/Cart")}>
                <BiArrowBack />
            </button>
            <form>
                <h1>Shipping Address</h1>

                <input type="text" required name="address" value={shippingInfo.address} placeholder="Adress" onChange={changeHandler} />
                <input type="text" required name="city" value={shippingInfo.city} placeholder="City" onChange={changeHandler} />
                <input type="text" required name="state" value={shippingInfo.state} placeholder="State" onChange={changeHandler} />
                <select name="country" required value={shippingInfo.country} onChange={changeHandler}>
                    <option value="">Choose your country</option>
                    <option value="india">India</option>
                </select>
                <input type="number" required name="pinCode" value={shippingInfo.pinCode} placeholder="Pin Code" onChange={changeHandler} />
                <button type="submit">Pay now</button>
            </form>
        </div>
    );
};

export default Shipping;
