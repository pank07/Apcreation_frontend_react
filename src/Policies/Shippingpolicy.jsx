import React from "react";
import "../Styling/Shippingpolicy.css"; // Updated CSS
import Aboutbuy from "../assets/cart.png";
import Aboutregister from "../assets/register.jpg";
import Aboutpay from "../assets/pay.png";
import Aboutdeli from "../assets/delivery.png";
import { TbBackground } from "react-icons/tb";

const About = () => {
  return (
    <>
      {/* Section 1: AP Creation Introduction */}
      <div className="about-container">
        <div className="about-image">
          <img src={Aboutbuy} alt="AP Creation Logo" />
        </div>
        <div className="about-text">
          <h1>
          Step 1: Add products to your Cart.<span>!</span>
          </h1>
          <p>
          You can add the products in the cart by clicking on the add to cart button below the products, to increase the quantity of the product you can add custom number and click on + button to add the product in the cart.
          </p>
          <p>
          Use the search bar in the menu to easily find the products you are looking for.
          </p>
          <p>
          The products added in the cart can be seen on the top right corner of the menu in the cart icon with a bill total. Click on the cart icon to proceed to the cart page.
          </p>
        </div>
      </div>

      {/* Section 2: Our Journey */}
      <div className="about-container reverse">
        <div className="about-image">
          <img src={Aboutregister} alt="Our Journey Image" />
        </div>
        <div className="about-text">
          <h1>
          Step 2: Register with us.<span>!</span>
          </h1>
          <p>
          Once you have added the products in the cart, we have a quick registration form where you can create your profile with AP Creation.
          </p>
          <p>
          In this profile you can see your order history, your billing details and address for delivery.

          </p>
          <p>
          We advise you to create the profile with us to get the latest drop on the offers we are providing.

          </p>
        </div>
        
      </div>
      <div className="about-container reverse">
        <div className="about-text">
          <h1>
          Step 3: Checkout and Pay.<span>!</span>
          </h1>
          <p>
          Once you have created the profile proceed to the checkout page for adding the billing details and making the payment via our secure payment gateway.

          </p>
        </div>
        <div className="about-image">
          <img src={Aboutpay} alt="Our Journey Image" />
        </div>
      </div>
      
      <div className="about-container reverse">
      <div className="about-image">
          <img  src={Aboutdeli} alt="Our Journey Image" />
        </div>
        <div className="about-text">
          
          <p>
          Once we have received the payment and the order details our dispatch team shall work on your order to ensure you get the best quality products at your doorstep.
          </p>
          <p>
          We thank you again for choosing AP Creations.
          </p>
        </div>
        
      </div>

    </>
  );
};

export default About;
