import { ADMIN_DELETE_ORDER_FAIL, ADMIN_DELETE_ORDER_REQUESTS, ADMIN_DELETE_ORDER_RESET, ADMIN_DELETE_ORDER_SUCCESS, ADMIN_ORDER_REQUEST, ADMIN_ORDER_SUCCESS, ADMIN_UPDATE_ORDER_FAIL, ADMIN_UPDATE_ORDER_REQUESTS, ADMIN_UPDATE_ORDER_RESET, ADMIN_UPDATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../Constants/orderConstants"
import { ADMIN_USER_FAIL, CLEAR_ERRORS } from "../Constants/userConstants"

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                ...state,
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

export const myOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case MY_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload
            }
        case MY_ORDER_FAIL:
            return {
                ...state,
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


export const OrderDetailsReducer = (state = { order: [] }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
export const allAdminOrderReducer = (state = { orders: [], totalAmount: 0 }, action) => {
    switch (action.type) {
        case ADMIN_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADMIN_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
                totalAmount: action.totalAmount
            }
        case ADMIN_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const updateDeleteOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_DELETE_ORDER_REQUESTS:
        case ADMIN_UPDATE_ORDER_REQUESTS:
            return {
                loading: true,
                ...state,
            };
        case ADMIN_DELETE_ORDER_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload,
            };
        case ADMIN_UPDATE_ORDER_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload,
            };
        case ADMIN_DELETE_ORDER_FAIL:
        case ADMIN_UPDATE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADMIN_DELETE_ORDER_RESET:
            return {
                loading: false,
                isDeleted: false,
            };
        case ADMIN_UPDATE_ORDER_RESET:
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