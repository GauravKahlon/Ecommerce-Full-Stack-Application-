import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Search = lazy(() => import("./pages/Search"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));
const Products = lazy(() => import("./pages/Products"));

const App = () => {
    return (
        <>
            <Router>
                <Header />
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Search" element={<Search />} />
                        <Route path="/Cart" element={<Cart />} />
                        <Route path="/Products" element={<Products />} />

                        {/* Not Logged In Route */}
                        <Route path="/Login" element={<Login />} />

                        {/* Logged In User Routes */}
                        <Route>
                            <Route path="/Shipping" element={<Shipping />} />
                            <Route path="/Orders" element={<Orders />} />
                        </Route>
                    </Routes>
                </Suspense>
            </Router>
        </>
    );
};

export default App;
