import { useState } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
    const data = [
            {
                id: "hfjsgfjs",
                quantity: 1,
                discount: 0,
                amount: 10000,
                status: <span className="red"> Processing</span>,
                action: <Link to={`/Order/hfjsgfjs`}>View</Link>,
            },
            {
                id: "vbsbvjshbv",
                quantity: 2,
                discount: 100,
                amount: 1000,
                status: <span className="red"> Processing</span>,
                action: <Link to={`/Order/vbsbvjshbv`}>View</Link>,
            },
            {
                id: "vbsbvjdfgdfgshbv",
                quantity: 2,
                discount: 100,
                amount: 1000,
                status: <span className="red"> Processing</span>,
                action: <Link to={`/Order/vbsbvjshbv`}>View</Link>,
            },
            {
                id: "vbsbvjdfgshbv",
                quantity: 2,
                discount: 100,
                amount: 1000,
                status: <span className="red"> Processing</span>,
                action: <Link to={`/Order/vbsbvjshbv`}>View</Link>,
            },
            {
                id: "vbsbvjsgdshbv",
                quantity: 2,
                discount: 100,
                amount: 1000,
                status: <span className="red"> Processing</span>,
                action: <Link to={`/Order/vbsbvjshbv`}>View</Link>,
            },
        ],
        [currentPage, setCurrentPage] = useState(1),
        ordersPerPage = 3,
        lastIndex = currentPage * ordersPerPage,
        firstIndex = lastIndex - ordersPerPage,
        ordersList = data.slice(firstIndex, lastIndex),
        totalPages = Math.ceil(data.length / ordersPerPage);

    return (
        <div className="container">
            <h1>My Orders</h1>
            <h2>Orders</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Quantity</th>
                        <th>Discount</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersList.map((elem, idx) => (
                        <tr key={idx}>
                            <td>{elem.id}</td>
                            <td>{elem.quantity}</td>
                            <td>{elem.discount}</td>
                            <td>{elem.amount}</td>
                            <td>{elem.status}</td>
                            <td>{elem.action}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <article>
                <button disabled={currentPage < 2} onClick={() => setCurrentPage((prev) => prev - 1)}>
                    Prev
                </button>
                <span>
                    {currentPage} of {totalPages}
                </span>
                <button disabled={currentPage > totalPages - 1} onClick={() => setCurrentPage((prev) => prev + 1)}>
                    Next
                </button>
            </article>
        </div>
    );
};

export default Orders;
