import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
    return (
        <div className="home">
            <section></section>
            <h1>
                Latest Products
                <Link to="/Search" className="findMore">
                    More
                </Link>
            </h1>
            <main>
                <ProductCard
                    productId="fhsfjssgdj"
                    photo="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1685966374/Croma%20Assets/Computers%20Peripherals/Laptop/Images/256711_umnwok.png?tr=w-640"
                    name="Macbook"
                    price="77000"
                    stock="4"
                />
            </main>
        </div>
    );
};

export default Home;
