import { Link } from "react-router-dom";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
    const user = { id: "hjfgs", role: "admin" },
        [diaIsOpen, setDiaIsOpen] = useState(false),
        logOutHandler = () => {
            setDiaIsOpen(false);
        };
    return (
        <nav className="header">
            <Link onClick={() => setDiaIsOpen(false)} to="/">
                Home
            </Link>
            <Link onClick={() => setDiaIsOpen(false)} to="/Search">
                <FaSearch />
            </Link>
            <Link onClick={() => setDiaIsOpen(false)} to="/Cart">
                <FaShoppingBag />
            </Link>
            {user?.id ? (
                <>
                    <button onClick={() => setDiaIsOpen((prev) => !prev)}>
                        <FaUser />
                    </button>
                    <dialog open={diaIsOpen}>
                        <div>
                            {user.role === "admin" && (
                                <Link onClick={() => setDiaIsOpen(false)} to="/Admin/Dashboard">
                                    Admin
                                </Link>
                            )}
                        </div>
                        <Link onClick={() => setDiaIsOpen(false)} to="/Orders">
                            Orders
                        </Link>
                        <button onClick={logOutHandler}>
                            <FaSignOutAlt />
                        </button>
                    </dialog>
                </>
            ) : (
                <Link to="/Login">
                    <FaSignInAlt />
                </Link>
            )}
        </nav>
    );
};

export default Header;
