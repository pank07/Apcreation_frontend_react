import axios from 'axios';
import { ADMIN_DELETE_ORDER_FAIL, ADMIN_DELETE_ORDER_REQUESTS, ADMIN_DELETE_ORDER_SUCCESS, ADMIN_ORDER_FAIL, ADMIN_ORDER_REQUEST, ADMIN_ORDER_SUCCESS, ADMIN_UPDATE_ORDER_FAIL, ADMIN_UPDATE_ORDER_REQUESTS, ADMIN_UPDATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from '../Constants/orderConstants'
import { baseUrl } from '../../UrlHelper/baseUrl';

// Ordering New Orders
export const createNewOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(`${baseUrl}/order/new`, order, config);
        if (data.status === 200) {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                payload: data.order
            });
        }
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Getting All Order Details
export const MyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: MY_ORDER_REQUEST });

        const { data } = await axios.get(`${baseUrl}/orders/me`);
        if (data.success === true) {
            dispatch({
                type: MY_ORDER_SUCCESS,
                payload: data.orders
            });
        }
    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Getting Single Order Details
// export const singleOrderDetails = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: ORDER_DETAILS_REQUEST });

//         const { data } = await axios.get(${baseUrl}/order/${id})
//         if (data.success) {
//             dispatch({
//                 type: ORDER_DETAILS_SUCCESS,
//                 payload: data.order
//             });
//         }
//     } catch (error) {
//         dispatch({
//             type: ORDER_DETAILS_FAIL,
//             payload: error.response.data.message,
//         });
//         console.log(error)
//     }
// };

export const singleOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`${baseUrl}/order/${id}`); // API call to get order data
        
        if (data.success) {
            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: { order: data.order } // Only send order data
            });
        }
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

  
  


export const getAllAdminOrders = () => async (dispatch) => {
    try {
        // const token = localStorage.getItem('token');
        dispatch({ type: ADMIN_ORDER_REQUEST });
        const config = { headers:{
             'Content-Type': 'application/json'},  };

        const { data } = await axios.get(`${baseUrl}/admin/orders`,config);
        if (data.success === true) {
            dispatch({
                type: ADMIN_ORDER_SUCCESS,
                payload: data.orders,
                totalAmount: data.totalAmount
            });
        }
    } catch (error) {
        dispatch({
            type: ADMIN_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};
// export const updateOrderStatus = (selectedOrders, bulkStatus) => async (dispatch) => {

//     try {
//         console.log("User Action IDs:", selectedOrders);
//         console.log("User Action Status:", bulkStatus);

//         // Ensure selectedOrders is an array before mapping
//         if (!Array.isArray(selectedOrders) || selectedOrders.length === 0) {
//             console.error("updateOrderStatus: selectedOrders is not a valid array", selectedOrders);
//             return;
//         }

//         // Extracting IDs from the array
//         const orderIds = selectedOrders.map(item => item.id);
//         const status = bulkStatus;

//         dispatch({ type: ADMIN_ORDER_REQUEST});

//         const config = { headers: { 'Content-Type': 'application/json' } };

//         // Sending the array of IDs and bulk status as the request payload
//         const { data } = await axios.put(`${baseUrl}/admin/orders/update`, 
//             { orderIds, status }, // Request body
//             config
//         );

//         console.log("Order status updated successfully.",data);

//         if (data.success === true) {
//             dispatch({
//                 type: ADMIN_ORDER_SUCCESS,
//                 payload: data.updatedOrders,
//                 // totalAmount: data.totalAmount
//             });
           
//         }
//     } catch (error) {
//         dispatch({
//             type: ADMIN_ORDER_FAIL,
//             payload: error.response?.data?.message || "Something went wrong",
//         });
//     }
// };


export const updateOrderStatus = (payload) => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_ORDER_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if required
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      };
  
      // Send the request with the payload (orderIds and status)
      const { data } = await axios.put(
        `${baseUrl}/admin/orders/update`,
        payload, // Pass the payload (orderIds and status)
        config
      );
  
      // Optionally handle success if you have any response data to work with
      // if (data.success) {
      //   dispatch({
      //     type: ADMIN_ORDER_SUCCESS,
      //     payload: data.orders,
      //     totalAmount: data.totalAmount,
      //   });
      // }
  
    } catch (error) {
      dispatch({
        type: ADMIN_ORDER_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
// Update Order ADMIN
export const updateOrder = (id, orderData) => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_UPDATE_ORDER_REQUESTS });
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.put(`${baseUrl}/admin/orders/${id}`, orderData, config)

        dispatch({
            type: ADMIN_UPDATE_ORDER_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Remove Particular Order ADMIN
export const deleteOrder = (id) => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_DELETE_ORDER_REQUESTS });
        const { data } = await axios.delete(`${baseUrl}/admin/orders/${id}`)

        dispatch({
            type: ADMIN_DELETE_ORDER_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Add this action if you need a separate endpoint for invoices.
export const getInvoiceDetails = (orderId) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
  
      const { data } = await axios.get(`${baseUrl}/order/invoice/${orderId}`); // Assuming this is the endpoint for invoice data
  
      if (data.success) {
        dispatch({
          type: ORDER_DETAILS_SUCCESS,
          payload: data.invoice, // Or whichever key contains the invoice data
        });
      }
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
      console.log(error);
    }
  };