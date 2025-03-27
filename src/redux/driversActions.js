import axios from "axios";
import { getDriverDetailsFail, getDriverDetailsRequest, getDriverDetailsSuccess, getDriversFail, getDriversRequest, getDriversSuccess } from "./slices/driverSlice";
import { toast } from "react-toastify";

export const fetchAllDrivers = () => async (dispatch) => {
    try {
      dispatch(getDriversRequest());
      
      const response = await axios.get("https://canada.plotinlucknow.com/v1/api/getAllDriver");
      const { data } = response;
       
      console.log(response)
      dispatch(getDriversSuccess(data.data));
      
    } catch (error) {
      dispatch(getDriversFail(error.response?.data?.message || "Failed to fetch drivers"));
      toast.error(error.response?.data?.message || "Failed to fetch drivers");
    }
  };

export const verifyDriver = (driverId) => async (dispatch) => {
  try {
      dispatch(getDriversRequest()); 
      
      const response = await axios.post(`https://canada.plotinlucknow.com/v1/api/verifyDriver/${driverId}`);
      
      
      const driversResponse = await axios.get("https://canada.plotinlucknow.com/v1/api/getAllDriver");
      
      dispatch(getDriversSuccess(driversResponse.data.data));
      
      
      
      return response.data;
  } catch (error) {
      dispatch(getDriversFail(error.response?.data?.message || "Failed to verify driver"));
      toast.error(error.response?.data?.message || "Failed to verify driver");
      throw error;
  }
};

  export const fetchDriverDetails = (id) => async (dispatch) => {
    try {
        dispatch(getDriverDetailsRequest());

        const response = await axios.get(`https://canada.plotinlucknow.com/v1/api/driverdetails/${id}`);
        const { data } = response;

      

        dispatch(getDriverDetailsSuccess(data.data));
        
        return response;
        
    } catch (error) {
        console.log(error.response.data.message)
        dispatch(getDriverDetailsFail(error.response?.data?.message || "Failed to fetch driver details"));
        toast.error(error.response?.data?.message || "Failed to fetch driver details");
    }
};



  // export const verifyDriver = (id) => async (dispatch) => {
  //   try {
  //     dispatch(getDriversRequest()); 
  
  //     const response = await axios.post(`https://canada.plotinlucknow.com/v1/api/verifydriver/${id}`);
  //     const { data } = response; 
  
  //     console.log('verify driver',response); 
  
  //     dispatch(getDriversSuccess(data.data)); 
      
  //     return response
      
  //   } catch (error) {
  //     console.log(error.response.data.message)
  //     dispatch(getDriversFail(error.response?.data?.message || "Failed to verify driver"));
  //     toast.error(error.response?.data?.message || "Failed to verify driver");
  //   }
  // }