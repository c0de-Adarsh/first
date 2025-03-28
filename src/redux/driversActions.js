import axios from "axios";
import { deleteDriverSuccess, getDriverDetailsFail, getDriverDetailsRequest, getDriverDetailsSuccess, getDriversFail, getDriversRequest, getDriversSuccess, updateDriverStatusInStore } from "./slices/driverSlice";
import { toast } from "react-toastify";

// export const fetchAllDrivers = () => async (dispatch) => {
//     try {
//       dispatch(getDriversRequest());
      
//       const response = await axios.get("https://canada.plotinlucknow.com/v1/api/getAllDriver");
//       const { data } = response;
       
//      console.log(response)
//       dispatch(getDriversSuccess(data.data));
      
//     } catch (error) {
//       dispatch(getDriversFail(error.response?.data?.message || "Failed to fetch drivers"));
//       toast.error(error.response?.data?.message || "Failed to fetch drivers");
//     }
//   };



export const fetchAllDrivers = () => async (dispatch) => {
  try {
    dispatch(getDriversRequest());
    
    const response = await axios.get("https://canada.plotinlucknow.com/v1/api/getAllDriver");
    const { data } = response;
     
    console.log('Fetched Drivers Raw Response:', response);
    console.log('Drivers Data:', data.data);

    // Ensure each driver has a status
    const processedDrivers = (data.data || []).map(driver => ({
      ...driver,
      status: driver.status || 'PENDING', // Default to PENDING if no status
      id: driver.id || driver._id, // Ensure consistent ID
    }));

    console.log('Processed Drivers:', processedDrivers);
    
    dispatch(getDriversSuccess(processedDrivers));
    
  } catch (error) {
    console.error('Fetch Drivers Error:', error.response?.data);
    
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


export const updateDriverStatus = (id, action) => async (dispatch) => {
  try {
      dispatch(getDriversRequest());
      
      const response = await axios.post(`https://canada.plotinlucknow.com/v1/api/verifydriver/${id}`, {
          verified: action === 'verify' ? 'VERIFIED' : 'SUSPENDED'
      });
      
      const { data } = response;
      console.log('Update Driver Status Response:', data);
      
      // Use the status from the backend response
      const newStatus = data.status || (action === 'verify' ? 'VERIFIED' : 'SUSPENDED');
      
      dispatch(updateDriverStatusInStore({
          id,
          status: newStatus
      }));
      
      // Refetch to ensure complete data consistency
      dispatch(fetchAllDrivers());
      
      if (action === 'verify') {
          toast.success('Driver verified successfully');
      } else if (action === 'suspend') {
          toast.warning('Driver suspended');
      }
      
      return response;
  } catch (error) {
      console.error('Update Driver Status Error:', error.response?.data);
      
      dispatch(getDriversFail(error.response?.data?.message || `Failed to ${action} driver`));
      toast.error(error.response?.data?.message || `Failed to ${action} driver`);
      throw error;
  }
};



export const deleteDriverProfile = (id) => async (dispatch) => {
  try {
    dispatch(getDriversRequest());
    
    const response = await axios.delete(`https://canada.plotinlucknow.com/v1/api/deleteProfile/${id}`);
    
    
    dispatch(deleteDriverSuccess(id));
    
    toast.success('Driver profile deleted successfully');
    
    return response.data;
  } catch (error) {
    console.error('Delete Driver Profile Error:', error.response?.data);
    
    dispatch(getDriversFail(error.response?.data?.message || "Failed to delete driver profile"));
    toast.error(error.response?.data?.message || "Failed to delete driver profile");
    
    throw error;
  }
};