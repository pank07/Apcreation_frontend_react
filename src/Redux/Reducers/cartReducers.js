import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_DETAILS ,CLEAR_CART} from "../Constants/cartConstants";

export const addToCartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            // Check if the item already exists in the cart
            const isItemExist = state.cartItems.find((data) => data.productId === item.productId);

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((data) =>
                        data.productId === item.productId ? item : data)
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                };
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.productId !== action.payload)
            }

        case SAVE_SHIPPING_DETAILS:
            return {
                ...state,
                shippingInfo: action.payload
            }
            case CLEAR_CART:
                return {
                  ...state,
                  cartItems: [], // Clear the cart
                };
        default:
            return state; // Add 'return' here to return the default state
    }
};