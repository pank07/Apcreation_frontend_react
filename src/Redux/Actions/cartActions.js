import axios from "axios";
import { baseUrl } from "../../UrlHelper/baseUrl";
import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_DETAILS,CLEAR_CART } from "../Constants/cartConstants";
import { toast } from "react-toastify";


// ADD TO CART 
export const AddToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`${baseUrl}/product/${id}`)
    console.log("API Response:", JSON.stringify(data));
    dispatch({
        type: ADD_TO_CART,
        payload: {
            productId: data.getProduct._id,
            name: data.getProduct.name,
            price: data.getProduct.price,
            stock: data.getProduct.Stock,
            weight: data.getProduct.weight,
            images: data.getProduct.images[0],
            category: data.getProduct.category,
            quantity
        }
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cartData.cartItems))
}
export const AddToCartforphoto = (id, name, size, price, quantity) => async (dispatch, getState) => {
    try {
    
        const { data } = await axios.get(`${baseUrl}/product/${id.id}`);
      

        dispatch({
            type: ADD_TO_CART,
            payload: {
                productId: data.getProduct._id,
                name: data.getProduct.name,
                size: id.size, // Include selected size
                price: id.price, // Use selected price
                stock: data.getProduct.Stock,
                images: data.getProduct.images[0],
                category: data.getProduct.category,
                quantity: id.quantity
            }
        });

        // Save updated cart to localStorage
        localStorage.setItem("cartItems", JSON.stringify(getState().cartData.cartItems));

    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};

// REMOVE FROM CART 
export const RemoveFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id
    })
    toast.success("Product Removed Successfully!!");
    localStorage.setItem("cartItems", JSON.stringify(getState().cartData.cartItems))
}

// SAVING SHIPPING DETAILS 
export const SaveShippingInfo = (data) => async (dispatch, getState) => {
    dispatch({
        type: SAVE_SHIPPING_DETAILS,
        payload: data
    })
    toast.success("Shipping Details Saved Successfully!!");
    localStorage.setItem("shippingInfo", JSON.stringify(data))

}
export const clearCart = () => async (dispatch,getState) => {
    dispatch({
        type: "CLEAR_CART",
    });
    localStorage.removeItem("cartItems",JSON.stringify(getState().cartData.cartItems)); // Optional: Clear from localStorage as well
    toast.success("Cart has been cleared.");
};