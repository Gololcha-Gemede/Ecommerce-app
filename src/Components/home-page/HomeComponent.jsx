import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./HomeComponent.css"; // Optional: Styling for the component
import frame560 from "../../assets/images/Frame560.png";
import CartPage from "../../Pages/CartPage";

function HomeComponent() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [exploreProducts, setExploreProducts] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [allProductsView, setAllProductsView] = useState(false);
  const [sortOption, setSortOption] = useState("default");
  const [filterOption, setFilterOption] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch("https://fakestoreapi.com/products");
        const categoriesResponse = await fetch("https://fakestoreapi.com/products/categories");

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setProducts(productsData);
        setCategories(categoriesData);

        // Get random products for sections
        setRandomProducts(getRandomProducts(productsData, 5));
        setExploreProducts(getRandomProducts(productsData, 8));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category) {
      const filtered = products.filter((product) => product.category === category);
      setCategoryProducts(filtered);
    }
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/CartPage");
  };

  const handleAddToWishList = (product) => {
    const WishList = JSON.parse(localStorage.getItem("WishList")) || [];
    const existingProduct = WishList.find((item) => item.id === product.id);
    if (existingProduct) {
      alert("The item is already in your WishList");
    } else {
      WishList.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("WishList", JSON.stringify(WishList));
    navigate("/WishListPage");
  };

  const handleSeeDetails = (product) => {
    navigate("/ProductDetailsPage", {
      state: {
        id: product.id,
        image: product.image,
        title: product.title,
        price: product.price,
        rating: product.rating,
        description: product.description,
      },
    });
  };
  

  const handleSort = (option, productsToSort) => {
    let sortedProducts = [...productsToSort];
    switch (option) {
      case "price":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "name":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "rating":
        sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        break;
    }
    return sortedProducts;
  };

  const handleFilter = (option, productsToFilter) => {
    if (option === "all") {
      return productsToFilter;
    }
    return productsToFilter.filter((product) => product.rating.rate >= parseFloat(option));
  };

  return (
    <div className="home-container">
      <img src={frame560} alt="Banner" className="home-img"/>

      {/* Section 1: Fresh Products */}
      <section className="fresh-products">
        <h1>Fresh Products</h1>
        <div className="products-grid">
          {randomProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <h3>{product.title}</h3>
              <p>${product.price.toFixed(2)}</p>
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="add-to-wishlist"
                onClick={() => handleAddToWishList(product)}
              >
                Add to WishList
              </button>
              <button
                className="see-details-button"
                onClick={() => handleSeeDetails(product)}
              >
                See Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Browse by Category */}
      <section className="browse-category">
        <h1>Browse by Category</h1>
        <ul className="categories-list">
          {(showAllCategories ? categories : categories.slice(0, 6)).map((category, index) => (
            <li key={index} onClick={() => handleCategoryClick(category)}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
        </ul>
        {!showAllCategories && (
          <button onClick={() => setShowAllCategories(true)} className="view-all-cat">View All Categories</button>
        )}
      </section>

      {/* Section 3: Products from Selected Category */}
      {selectedCategory && (
        <section className="selected-category">
          <h1>
            Products from {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h1>

          {/* Sorting and Filtering Options */}
          <div className="sorting-filtering">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price">Price</option>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
            </select>

            <label htmlFor="filter">Filter by Rating:</label>
            <select
              id="filter"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="all">All</option>
              <option value="4">4 Stars & Up</option>
              <option value="3">3 Stars & Up</option>
              <option value="2">2 Stars & Up</option>
            </select>
          </div>

          <div className="products-grid">
            {handleFilter(filterOption, handleSort(sortOption, categoryProducts)).map(
              (product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.title} className="product-image" />
                  <h3>{product.title}</h3>
                  <p>${product.price.toFixed(2)}</p>
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>

                  <button className="add-to-wishlist" 
                  onClick={() => handleAddToWishList(product)}>
                    Add to WishList
                    </button>
                    <button
                    className="see-details-button"
                    onClick={() => handleSeeDetails(product)}
                    >
                    See Details
                 </button>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* Section 4: Explore Our Products */}
      <section className="explore-products">
        <h1>Explore Our Products</h1>
        <div className="products-grid">
          {allProductsView
            ? products.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.title} className="product-image" />
                  <h3>{product.title}</h3>
                  <p>${product.price.toFixed(2)}</p>
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button className="add-to-wishlist" 
                    onClick={() => handleAddToWishList(product)}>
                    Add to WishList
                    </button>

                    <button
                     className="see-details-button"
                    onClick={() => handleSeeDetails(product)}
                    >
                   See Details
                  </button>
                </div>
              ))
            : exploreProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.title} className="product-image" />
                  <h3>{product.title}</h3>
                  <p>${product.price.toFixed(2)}</p>
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button className="add-to-wishlist" 
                    onClick={() => handleAddToWishList(product)}>
                    Add to WishList
                    </button>

                    <button
                     className="see-details-button"
                     onClick={() => handleSeeDetails(product)}
                     >
                    See Details
                    </button>
                </div>
              ))}
        </div>
        {!allProductsView && (
          <button onClick={() => setAllProductsView(true)} className="view-all-prod">View All Products</button>
        )}
      </section>

    </div>
  );
}

export default HomeComponent;
