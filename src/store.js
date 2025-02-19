import { combineReducers, applyMiddleware, legacy_createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { adminAllReviewsReducer, createProductReducer, productDetailsReducer, productReducer, reviewReducer, searchProductReducer, updateDeleteProductReducer } from './Redux/Reducers/productReducers';
import { allUserAdminReducer, profileReducer, userReducer, updateDeleteUserReducer, singleUserAdminReducer } from './Redux/Reducers/userReducers';
import { addToCartReducer } from './Redux/Reducers/cartReducers';
import { OrderDetailsReducer, allAdminOrderReducer, myOrderReducer, orderReducer, updateDeleteOrderReducer } from './Redux/Reducers/orderReducers';
import Searchslice from './Redux/Searchslice';


const rootReducer = combineReducers({
    products: productReducer,
    productDetail: productDetailsReducer,
    userData: userReducer,
    profile: profileReducer,
    cartData: addToCartReducer,
    searches: searchProductReducer,
    newOrder: orderReducer,
    myOrder: myOrderReducer,
    orderDetails: OrderDetailsReducer,
    newReview: reviewReducer,
    allUsers: allUserAdminReducer,
    allOrders: allAdminOrderReducer,
    createNewProduct: createProductReducer,
    updateProduct: updateDeleteProductReducer,
    updateOrder: updateDeleteOrderReducer,
    updateUser: updateDeleteUserReducer,
    singleUserDetail: singleUserAdminReducer,
    allReviews: adminAllReviewsReducer,
    search:Searchslice

})

let initialState = {
    cartData: {
        
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    }
};

const middleware = [thunk];

const store = legacy_createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;