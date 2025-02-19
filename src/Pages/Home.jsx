import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Features from "../components/Features";
import NewsLetter from "../components/NewsLetter";
import TempShop from "../layouts/TempShop";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../Redux/Actions/productActions";
import Trending from "../components/Trending";
// import Timeline from "../components/Timeline";
import Loader from "../components/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  //search
  const { Searchdata} = useSelector((state) => state. search);
  // console.log(Searchdata)
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Banner />
          {/* <div className="container">
            <h2 style={{color:"black"}}>Featured Products</h2>
            {loading ? (
              <Loader />
            ) : (
              <div id="productID">
                {products && products.filter((product) => {
            if (Searchdata.length === 0) {
              return product;
            } else  {
              return product.name.toLowerCase().includes(Searchdata.toLowerCase());
            }
          })
            .map((product) => (
                    <TempShop key={product._id} products={product} />
                  ))}
              </div>
            )}
          </div> */}
         
          <Features />
          <NewsLetter/>
        </>
      )}
    </>
  );
};

export default Home;
