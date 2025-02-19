// import { toast } from "react-toastify"
// import { baseUrl } from "../../UrlHelper/baseUrl"
// import { ADMIN_DELETE_USER_FAIL, ADMIN_DELETE_USER_REQUESTS, ADMIN_DELETE_USER_SUCCESS, ADMIN_UPDATE_USER_FAIL, ADMIN_UPDATE_USER_REQUESTS, ADMIN_UPDATE_USER_SUCCESS, ADMIN_USER_FAIL, ADMIN_USER_REQUESTS, ADMIN_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUESTS, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUESTS, LOGIN_SUCCESS, LOGOUT_FAIL, REGISTER_FAIL, REGISTER_REQUESTS, REGISTER_SUCCESS, SINGLE_USER_FAIL, SINGLE_USER_REQUESTS, SINGLE_USER_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUESTS, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUESTS, UPDATE_PROFILE_SUCCESS, LOGOUT_SUCCESS } from "../Constants/userConstants"
// import axios from 'axios'


// export const userLogin = (email, password) => async (dispatch) => {
//     try {
//         dispatch({
//             type: LOGIN_REQUESTS,
//         })
//         const config = { headers: { 'Content-Type': 'application/json' } };

//         const { data } = await axios.post(`${baseUrl}/login`, { email, password }, config)
//               console.log(data)
//         if (data.success === true) {
         
//             dispatch({
//                 type: LOGIN_SUCCESS,
//                 payload: data.user
//             })
//             dispatch(LoadUser());
//             toast.success("Login Successfully!! 🪄");
//         }

//     } catch (error) {
//         dispatch({
//             type: LOGIN_FAIL,
//             payload: error.response.data.message
//         })
//         toast.error(error.message);
//     }
// }

// export const userRegister = (registerData) => async (dispatch) => {
//     try {
//         dispatch({
//             type: REGISTER_REQUESTS,
//         })
//         const config = { headers: { 'Content-Type': 'multipart/form-data' } };

//         const { data } = await axios.post(`${baseUrl}/register`, registerData, config)

//         if (data.success === true) {
//             dispatch({
//                 type: REGISTER_SUCCESS,
//                 payload: data.user
//             })
//             dispatch(LoadUser());
//             toast.success("Congratulations!! Account Created Successfully 🕺");
//         }

//     } catch (error) {
//         dispatch({
//             type: REGISTER_FAIL,
//             payload: error.response.data.message
//         })
//         toast.error("Account Already Exists!! 🤷‍♂️");
//     }
// }

// export const LoadUser = () => async (dispatch) => {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`${baseUrl}/me`
//             , {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             dispatch(LoadUser());
//             console.log('User data:', response.data);
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//     }
// }

// export const LogOutUser = () => async (dispatch) => {
//     try {
//         dispatch({
//             type: LOAD_USER_REQUESTS,
//         });

//         await axios.get(`${baseUrl}/logout`);

//         localStorage.removeItem('token');

//         dispatch({
//             type: LOGOUT_SUCCESS,
//         });

//         toast.success("Logged Out Successfully 🥲");

//     } catch (error) {
//         dispatch({
//             type: LOGOUT_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : "Logout failed",
//         });
//         toast.error(error.response && error.response.data.message ? error.response.data.message : "Logout failed");
//     }
// };

// export const updateUserProfile = (registerData) => async (dispatch) => {
//     try {
//         dispatch({
//             type: UPDATE_PROFILE_REQUESTS,
//         })
//         const config = { headers: { 'Content-Type': 'multipart/form-data' } };

//         const { data } = await axios.put(`${baseUrl}/me/update`, registerData, config)

//         if (data.success === true) {
//             dispatch({
//                 type: UPDATE_PROFILE_SUCCESS,
//                 payload: data.success
//             })
//             dispatch(LoadUser());
//             toast.success("Congratulations!! Your Profile Updated Successfully 🕺");
//         }

//     } catch (error) {
//         dispatch({
//             type: UPDATE_PROFILE_FAIL,
//             payload: error.response.data.message
//         })
//         toast.error(error.response.data.message);
//     }
// }

// export const updatePassword = (passwords) => async (dispatch) => {
//     try {
//         dispatch({
//             type: UPDATE_PASSWORD_REQUESTS,
//         })
//         const config = { headers: { 'Content-Type': 'application/json' } };

//         const { data } = await axios.put(`${baseUrl}/password/update`, passwords, config)
//         if (data.success === true) {
//             dispatch({
//                 type: UPDATE_PASSWORD_SUCCESS,
//                 payload: data.success
//             })
//             dispatch(LoadUser());
//             toast.success("Congratulations!! Your Password Updated Successfully 🕺");
//         }

//     } catch (error) {
//         dispatch({
//             type: UPDATE_PASSWORD_FAIL,
//             payload: error.response.data.message
//         })
//         toast.error(error.response.data.message);
//     }
// }

// export const getAdminAllUsers = () => async (dispatch) => {
//     try {
//         dispatch({
//             type: ADMIN_USER_REQUESTS,
//         })

//         const { data } = await axios.get(`${baseUrl}/admin/user`)
//         if (data.success) {
//             dispatch({
//                 type: ADMIN_USER_SUCCESS,
//                 payload: data.getUser
//             })
//         }
//     } catch (error) {
//         dispatch({
//             type: ADMIN_USER_FAIL,
//             payload: error.response.data.message
//         })
//         toast.error(error.response.data.message);
//     }
// }

// export const singleUserDetails = (id) => async (dispatch) => {

//     try {
//         dispatch({ type: SINGLE_USER_REQUESTS });
//         const { data } = await axios.get(`${baseUrl}/admin/user/${id}`)

//         dispatch({
//             type: SINGLE_USER_SUCCESS,
//             payload: data.getUser,
//         })
//     } catch (error) {
//         dispatch({
//             type: SINGLE_USER_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }


// export const updateUser = (id, userData) => async (dispatch) => {

//     try {
//         dispatch({ type: ADMIN_UPDATE_USER_REQUESTS });
//         const { data } = await axios.put(`${baseUrl}/admin/user/${id}`, userData)

//         dispatch({
//             type: ADMIN_UPDATE_USER_SUCCESS,
//             payload: data.success,
//         })
//         dispatch(LoadUser());
//     } catch (error) {
//         dispatch({
//             type: ADMIN_UPDATE_USER_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }


// export const deleteUser = (id) => async (dispatch) => {

//     try {
//         dispatch({ type: ADMIN_DELETE_USER_REQUESTS });
//         const { data } = await axios.delete(`${baseUrl}/admin/user/${id}`)

//         dispatch({
//             type: ADMIN_DELETE_USER_SUCCESS,
//             payload: data.success,
//         })
//     } catch (error) {
//         dispatch({
//             type: ADMIN_DELETE_USER_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }



// mera_code

import { toast } from "react-toastify"
import { baseUrl } from "../../UrlHelper/baseUrl"
import { ADMIN_DELETE_USER_FAIL, ADMIN_DELETE_USER_REQUESTS, ADMIN_DELETE_USER_SUCCESS, ADMIN_UPDATE_USER_FAIL,LOGOUT_SUCCESS, ADMIN_UPDATE_USER_REQUESTS, ADMIN_UPDATE_USER_SUCCESS, ADMIN_USER_FAIL, ADMIN_USER_REQUESTS, ADMIN_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUESTS, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUESTS, LOGIN_SUCCESS, LOGOUT_FAIL, REGISTER_FAIL, REGISTER_REQUESTS, REGISTER_SUCCESS, SINGLE_USER_FAIL, SINGLE_USER_REQUESTS, SINGLE_USER_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUESTS, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUESTS, UPDATE_PROFILE_SUCCESS } from "../Constants/userConstants"
import axios from 'axios'
import { Await, useNavigate } from "react-router-dom"





export const userLogin = (email, password,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUESTS,
        })
        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post(`${baseUrl}/login`, { email, password }, config)
        
         
        if (data.success === true) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data.ourUser
            })
            localStorage.setItem('token', data?.token)
            dispatch(LoadUser());
            if (data.ourUser.role === "admin") {


               await navigate("/");
                window.location.reload();

               await  navigate("/admin/dashboard");

               
            } else {
                navigate(""); // Redirect non-admin users to a user dashboard or another page
            }
            toast.success("Login Successfully!! 🪄");
            await navigate("/");
            // window.location.reload();
        }


    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
        toast.error(error.message);
    }
}

export const userRegister = (registerData,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_REQUESTS,
        })
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        const { data } = await axios.post(`${baseUrl}/register`, registerData, config)

        if (data.success === true) {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: data.user
            })
            dispatch(LoadUser());
            navigate("/login")
            toast.success("Congratulations!! Account Created Successfully 🕺");
        }

    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message
        })
        toast.error("Account Already Exists!! 🤷‍♂️");
    }
}


export const LoadUser = () => async (dispatch) => {

   

    try {
        const token = localStorage.getItem('token');
        dispatch({
            type: LOAD_USER_REQUESTS,
        });
       

        const { data } = await axios.post(`${baseUrl}/me`, {}, {
            headers: { 
                Authorization: `Bearer ${token}`  
            }
        });


        if (data.success) {
         
           

            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: data.profileUser
            });
        }
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        });
        toast.error(error.response.data.message);
    }
};


export const LogOutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_USER_REQUESTS,
        })

        await axios.get(`${baseUrl}/logout`)
        localStorage.clear()
        dispatch({
            type: LOGOUT_SUCCESS,
        })
        window.location.reload();
        dispatch(LoadUser());
        toast.success("Log Out Successfully 🥲");
    } catch (error) { 
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
        toast.error(error.response.data.message);
    }
}

export const updateUserProfile = (registerData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PROFILE_REQUESTS,
        })
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        const { data } = await axios.put(`${baseUrl}/me/update`, registerData, config)

        if (data.success === true) {
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: data.success
            })
            dispatch(LoadUser());
            toast.success("Congratulations!! Your Profile Updated Successfully 🕺");
        }

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
        toast.error(error.response.data.message);
    }
}

export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PASSWORD_REQUESTS,
        })
        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.put(`${baseUrl}/password/update`, passwords, config)
        if (data.success === true) {
            dispatch({
                type: UPDATE_PASSWORD_SUCCESS,
                payload: data.success
            })
            dispatch(LoadUser());
            toast.success("Congratulations!! Your Password Updated Successfully 🕺");
        }

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
        toast.error(error.response.data.message);
    }
}
export const ForgetPassword = (passwords,navigate) => async (dispatch) => {
    // const navigate = useNavigate();
    try {
   
        // dispatch({
        //     type: UPDATE_PASSWORD_REQUESTS,
        // })
        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.put(`${baseUrl}/password/reset`, passwords, config)
        

        console.log("data",data);
        
        if (data.success === true) {
            console.log("jay shree ram ");
            
            dispatch(LoadUser());
            navigate("/login")
            console.log("jay");
            toast.success("Congratulations!! Your Password Updated Successfully 🕺");
        }

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error
        })
        toast.error(error);
    }
}

export const getAdminAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_USER_REQUESTS,
        })
        const token = localStorage.getItem('token');
        const config = { headers:{
            'Content-Type': 'application/json'},  };
        const { data } = await axios.get(`${baseUrl}/admin/user`,config)
      
        
        if (data.success) {
            dispatch({
                type: ADMIN_USER_SUCCESS,
                payload: data.getUser
            })
        }
    } catch (error) {
        dispatch({
            type: ADMIN_USER_FAIL,
            payload: error.response.data.message
        })
        toast.error(error.response.data.message);
    }
}

export const singleUserDetails = (id) => async (dispatch) => {

    try {
        dispatch({ type: SINGLE_USER_REQUESTS });
        const { data } = await axios.get(`${baseUrl}/admin/user/${id}`)

        dispatch({
            type: SINGLE_USER_SUCCESS,
            payload: data.getUser,
        })
    } catch (error) {
        dispatch({
            type: SINGLE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateUser = (id, userData) => async (dispatch) => {
console.log("user data ",userData);

    try {
        const config = { headers:{
            'Content-Type': 'application/json'},  };
        dispatch({ type: ADMIN_UPDATE_USER_REQUESTS });
        const { data } = await axios.put(`${baseUrl}/admin/user/${id}`, userData,config)

        dispatch({
            type: ADMIN_UPDATE_USER_SUCCESS,
            payload: data.success,
        })
        dispatch(LoadUser());
    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {
console.log("ui se ID",id);

    try {
        
        dispatch({ type: ADMIN_DELETE_USER_REQUESTS });
        const { data } = await axios.delete(`${baseUrl}/admin/user/${id}`)

        dispatch({
            type: ADMIN_DELETE_USER_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}