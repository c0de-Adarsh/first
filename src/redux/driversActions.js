import axios from "axios";
import { getDriversFail, getDriversRequest, getDriversSuccess } from "./slices/driverSlice";
import { toast } from "react-toastify";

export const fetchAllDrivers = () => async (dispatch) => {
    try {
      dispatch(getDriversRequest());
      
      const response = await axios.get("https://canada.plotinlucknow.com/v1/api/getAllDriver");
      const { data } = response;
       
      dispatch(getDriversSuccess(data.data));
      
    } catch (error) {
      dispatch(getDriversFail(error.response?.data?.message || "Failed to fetch drivers"));
      toast.error(error.response?.data?.message || "Failed to fetch drivers");
    }
  };



  export const verifyDriver = (id) => async (dispatch) => {
    try {
      dispatch(getDriversRequest()); 
  
      const response = await axios.post(`https://canada.plotinlucknow.com/v1/api/verifydriver/${id}`);
      const { data } = response; 
  
      console.log('verify driver',response); 
  
      dispatch(getDriversSuccess(data.data)); 
      
      return response
      
    } catch (error) {
      console.log(error.response.data.message)
      dispatch(getDriversFail(error.response?.data?.message || "Failed to verify driver"));
      toast.error(error.response?.data?.message || "Failed to verify driver");
    }
  }