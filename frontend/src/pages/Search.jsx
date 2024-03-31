import { useState } from "react";
import ProductCard from "../components/ProductCard";

const Search = () => {
    const addToCartHandler = () => {},
        [search, setSearch] = useState(""),
        [sort, setSort] = useState(""),
        [maxPrice, setMaxPrize] = useState(""),
        [category, setCategory] = useState(""),
        [page, setPage] = useState(1),
        // isPrevPage = page > 1,
        isPrevPage = page < 2,
        // isNextPage = page < 4;
        isNextPage = page > 3;
    return (
        <div className="product-search-page">
            <aside>
                <h2>Filters</h2>
                <div>
                    <h4>Sort</h4>
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="">Default</option>
                        <option value="asc">Price (Low to High)</option>
                        <option value="dsc">Price (High to Low)</option>
                    </select>
                </div>
                <div>
                    <h4>Max Price: {maxPrice || ""}</h4>
                    <input type="range" min={100} max={100000} value={maxPrice} onChange={(e) => setMaxPrize(e.target.value)} />
                </div>
                <div>
                    <h4>Category</h4>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All</option>
                        <option value="">Sample 1</option>
                        <option value="">Sample 2</option>
                    </select>
                </div>
            </aside>
            <main>
                <h1>Products</h1>
                <input type="text" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className="search-product-list">
                    <ProductCard
                        productId="fhsfjssgdj"
                        photo="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1685966374/Croma%20Assets/Computers%20Peripherals/Laptop/Images/256711_umnwok.png?tr=w-640"
                        name="Macbook"
                        price="77000"
                        stock="4"
                        handler={addToCartHandler}
                    />
                </div>
                <article>
                    <button disabled={isPrevPage} onClick={() => setPage((prev) => prev - 1)}>
                        Prev
                    </button>
                    <span>{page} of 4</span>
                    <button disabled={isNextPage} onClick={() => setPage((prev) => prev + 1)}>
                        Next
                    </button>
                </article>
            </main>
        </div>
    );
};

export default Search;
