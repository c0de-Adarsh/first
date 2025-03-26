import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie"; 
import { loginFail, loginRequest, loginSuccess } from "./slices/userSlice";

export const loginUser = (userData) => async (dispatch) => {
    try {
      dispatch(loginRequest());
  
      
      const response = await axios.post("https://canada.plotinlucknow.com/v1/api/login", userData);
      const { data } = response;  
  
      console.log("Token:", data.data.token); 
  
      dispatch(loginSuccess(data.data));
      
      Cookies.set("accesstoken", data.data.token, { 
        expires: 7, 
        secure: true, 
        sameSite: "Strict" 
      });
  
      toast.success("Login Successfully!");
    } catch (error) {
      console.log(error.response?.data?.message);
      dispatch(loginFail(error.response?.data?.message));
      toast.error(error.response?.data?.message);
    }
  };
