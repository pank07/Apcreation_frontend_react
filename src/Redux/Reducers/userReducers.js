import { CLEAR_ERRORS, LOGIN_REQUESTS, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_REQUESTS, REGISTER_SUCCESS, REGISTER_FAIL, LOAD_USER_REQUESTS, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, UPDATE_PROFILE_REQUESTS, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET, UPDATE_PASSWORD_REQUESTS, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_RESET, ADMIN_USER_REQUESTS, ADMIN_USER_SUCCESS, ADMIN_USER_FAIL, ADMIN_DELETE_USER_REQUESTS, ADMIN_DELETE_USER_SUCCESS, ADMIN_DELETE_USER_FAIL, ADMIN_DELETE_USER_RESET, ADMIN_UPDATE_USER_REQUESTS, ADMIN_UPDATE_USER_SUCCESS, ADMIN_UPDATE_USER_RESET, ADMIN_UPDATE_USER_FAIL, SINGLE_USER_REQUESTS, SINGLE_USER_SUCCESS, SINGLE_USER_FAIL } from "../Constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUESTS:
        case REGISTER_REQUESTS:
        case LOAD_USER_REQUESTS:
            return {
                loading: true,
                isAuthenticated: false,
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOAD_USER_FAIL:
            return {
                loading: true,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOGOUT_FAIL:
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


export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUESTS:
        case UPDATE_PASSWORD_REQUESTS:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false
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

export const allUserAdminReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ADMIN_USER_REQUESTS:
            return {
                ...state,
                loading: true,
            }
        case ADMIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case ADMIN_USER_FAIL:
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

export const singleUserAdminReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case SINGLE_USER_REQUESTS:
            return {
                ...state,
                loading: true,
            }
        case SINGLE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case SINGLE_USER_FAIL:
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


export const updateDeleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_DELETE_USER_REQUESTS:
        case ADMIN_UPDATE_USER_REQUESTS:
            return {
                loading: true,
                ...state,
            };
        case ADMIN_DELETE_USER_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload,
            };
        case ADMIN_UPDATE_USER_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload,
            };
        case ADMIN_DELETE_USER_FAIL:
        case ADMIN_UPDATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ADMIN_DELETE_USER_RESET:
            return {
                loading: false,
                isDeleted: false,
            };
        case ADMIN_UPDATE_USER_RESET:
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
