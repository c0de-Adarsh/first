import axios from "axios";
import { getDriversFail, getDriversRequest, getDriversSuccess } from "./slices/driverSlice";
import { toast } from "react-toastify";

export const fetchAllDrivers = () => async (dispatch) => {
    try {
      dispatch(getDriversRequest());
      
      const response = await axios.get("https://canada.plotinlucknow.com/v1/api/getAllDriver");
      const { data } = response;
        console.log(response)
      dispatch(getDriversSuccess(data.data));
      toast.success("Drivers fetched successfully!");
    } catch (error) {
      dispatch(getDriversFail(error.response?.data?.message || "Failed to fetch drivers"));
      toast.error(error.response?.data?.message || "Failed to fetch drivers");
    }
  };