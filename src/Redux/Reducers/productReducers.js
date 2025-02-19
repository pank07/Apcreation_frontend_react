import { ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUESTS, ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_REQUEST, SEARCH_PRODUCTS_REQUEST, SEARCH_PRODUCTS_SUCCESS, SEARCH_PRODUCTS_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_RESET, NEW_REVIEW_FAIL, ADMIN_PRODUCTS_REQUESTS, ADMIN_PRODUCTS_FAIL, ADMIN_PRODUCTS_SUCCESS, ADMIN_DELETE_PRODUCTS_REQUESTS, ADMIN_DELETE_PRODUCTS_SUCCESS, ADMIN_DELETE_PRODUCTS_FAIL, ADMIN_DELETE_PRODUCTS_RESET, ADMIN_CREATE_PRODUCTS_REQUESTS, ADMIN_CREATE_PRODUCTS_SUCCESS, ADMIN_CREATE_PRODUCTS_RESET, ADMIN_CREATE_PRODUCTS_FAIL, ADMIN_UPDATE_PRODUCTS_REQUESTS, ADMIN_UPDATE_PRODUCTS_SUCCESS, ADMIN_UPDATE_PRODUCTS_FAIL, ADMIN_UPDATE_PRODUCTS_RESET, ADMIN_ALL_REVIEWS_REQUESTS, ADMIN_ALL_REVIEWS_SUCCESS, ADMIN_ALL_REVIEWS_RESET, ADMIN_ALL_REVIEWS_FAIL } from "../Constants/productConstants";

export const productReducer = (state = { products: [], productCount: null }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUESTS:
        case ADMIN_PRODUCTS_REQUESTS:
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload,
                productCount: action.productCount,
                productsPerPage: action.productsPerPage,
            }
        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            }
        case ALL_PRODUCTS_FAIL:
        case ADMIN_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;

    }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            };
        case NEW_REVIEW_RESET:
            return {
                ...state,
                loading: false,
                success: false,
            };
        case NEW_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const searchProductReducer = (state = { searchedProduct: {} }, action) => {
    switch (action.type) {
        case SEARCH_PRODUCTS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case SEARCH_PRODUCTS_SUCCESS:
            return {
                loading: false,
                searchedProduct: action.payload,
            };
        case SEARCH_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const createProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case ADMIN_CREATE_PRODUCTS_REQUESTS:
            return {
                loading: true,
                ...state,
            };
        case ADMIN_CREATE_PRODUCTS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
                success: action.success
            };
        case ADMIN_CREATE_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADMIN_CREATE_PRODUCTS_RESET:
            return {
                ...state,
                success: false
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const updateDeleteProductReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CREATE_PRODUCTS_REQUESTS:
        case ADMIN_DELETE_PRODUCTS_REQUESTS:
        case ADMIN_UPDATE_PRODUCTS_REQUESTS:
            return {
                loading: true,
                ...state,
            };
        case ADMIN_DELETE_PRODUCTS_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload,
            };
        case ADMIN_UPDATE_PRODUCTS_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload,
            };
        case ADMIN_DELETE_PRODUCTS_FAIL:
        case ADMIN_UPDATE_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADMIN_DELETE_PRODUCTS_RESET:
            return {
                loading: false,
                isDeleted: false,
            };
        case ADMIN_UPDATE_PRODUCTS_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const adminAllReviewsReducer = (state = { review: [] }, action) => {
    switch (action.type) {
        case ADMIN_ALL_REVIEWS_REQUESTS:
            return {
                loading: true,
                ...state,
            };
        case ADMIN_ALL_REVIEWS_SUCCESS:
            return {
                loading: false,
                review: action.payload,
            };
        case ADMIN_ALL_REVIEWS_RESET:
            return {
                ...state,
                loading: false,
                review: false,
            };
        case ADMIN_ALL_REVIEWS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

