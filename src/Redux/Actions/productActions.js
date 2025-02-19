import axios from 'axios';
import { ADMIN_PRODUCTS_FAIL, ADMIN_PRODUCTS_REQUESTS, ADMIN_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUESTS, ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, SEARCH_PRODUCTS_FAIL, SEARCH_PRODUCTS_REQUEST, SEARCH_PRODUCTS_SUCCESS, ADMIN_DELETE_PRODUCTS_REQUESTS, ADMIN_DELETE_PRODUCTS_SUCCESS, ADMIN_DELETE_PRODUCTS_FAIL, ADMIN_CREATE_PRODUCTS_REQUESTS, ADMIN_CREATE_PRODUCTS_SUCCESS, ADMIN_CREATE_PRODUCTS_FAIL, ADMIN_UPDATE_PRODUCTS_REQUESTS, ADMIN_UPDATE_PRODUCTS_SUCCESS, ADMIN_UPDATE_PRODUCTS_FAIL, ADMIN_ALL_REVIEWS_REQUESTS, ADMIN_ALL_REVIEWS_SUCCESS, ADMIN_ALL_REVIEWS_FAIL, } from '../Constants/productConstants';
import { baseUrl } from '../../UrlHelper/baseUrl';
import { toast } from 'react-toastify';

export const getProduct = (currentPage = 1, price = [0, 50000], category, rating) => async (dispatch) => {

    try {
        dispatch({ type: ALL_PRODUCTS_REQUESTS });
        let Url = `${baseUrl}/products?&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`
        if (category) {
            Url = `${baseUrl}/products?&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`
        }
        const { data } = await axios.get(Url)

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data.products,
            productCount: data.productCount,
            productsPerPage: data.productsPerPage
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}
axios.defaults.headers.common['token'] = localStorage.getItem('token')
// For Creating New Reviews
export const createNewReview = (reviewsData) => async (dispatch) => {
    
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(`${baseUrl}/review`, reviewsData, config);

        if (data.success) {
            dispatch({
                type: NEW_REVIEW_SUCCESS,
                payload: data.success
            });
        }
        toast.success("Review Submitted Successfully")
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};



export const getProductSearch = (keyword) => async (dispatch) => {
    try {
        dispatch({ type: SEARCH_PRODUCTS_REQUEST });

        const { data } = await axios.get(`${baseUrl}/product/search/${keyword}`);

        if (data.success) {
            dispatch({
                type: SEARCH_PRODUCTS_SUCCESS,
                payload: data.result
            });
        }
    } catch (error) {
        dispatch({
            type: SEARCH_PRODUCTS_FAIL,
            payload: error.message,
        });
        console.log(error)
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}


// Getting All Products ADMIN
export const getAdminProducts = () => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUESTS });
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = 
         await axios.get(`${baseUrl}/admin/all-products`,config)

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}



// Creating New Product ADMIN
export const createNewProduct = (productData) => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_CREATE_PRODUCTS_REQUESTS });
        const { data } = await axios.post(`${baseUrl}/product/new`, productData)

        dispatch({
            type: ADMIN_CREATE_PRODUCTS_SUCCESS,
            success: data.success,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CREATE_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Updating Product ADMIN
export const updateNewProduct = (id, productData) => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_UPDATE_PRODUCTS_REQUESTS });
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.put(`${baseUrl}/admin/product/${id}`, productData, config)

        dispatch({
            type: ADMIN_UPDATE_PRODUCTS_SUCCESS,
            payload: data.updatedProduct
        })

    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete Particular Product ADMIN
export const deleteProduct = (id) => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_DELETE_PRODUCTS_REQUESTS });
        const { data } = await axios.delete(`${baseUrl}/admin/product/${id}`)

        dispatch({
            type: ADMIN_DELETE_PRODUCTS_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateReviewsAdmin = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ALL_REVIEWS_REQUESTS });
        const { data } = await axios.get(`${baseUrl}/admin/reviews?id=${id}`)

        dispatch({
            type: ADMIN_ALL_REVIEWS_SUCCESS,
            payload: data.reviews
        })
    } catch (error) {
        dispatch({
            type: ADMIN_ALL_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}