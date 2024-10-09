import axios from "axios";
import Cookies from "js-cookie";
const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, formData);
      const { token, role } = response.data;

      Cookies.set("token", token);
      Cookies.set("role", role);
  
      return response.data;
    } catch (error) {
      console.log("Login error", error.message);
      throw error;
    }
  };

export const addUsers = async (formData) => {
  try {
    const responseContact = await axios.post(`${API_URL}/api/auth/register`,formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(responseContact.data, "responseContact");
    return responseContact.data;
  } catch (error) {
    console.log("Contact error", error.message);
    throw error;
  }
};

export const sendSMS = async (file, campaignName, text, sender) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("campaignName", campaignName);
  formData.append("text", text);
  formData.append("sender", sender);

  try {
    const response = await axios.post(`${API_URL}/api/send-sms`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error sending SMS", error.message);
    throw error;
  }
};


export const getUsersByAdmin = async () => {
    const role = Cookies.get("role"); 
    const token = Cookies.get("token");

    if (role !== 'admin') {
      throw new Error("Access denied: insufficient permissions.");
    }
  
    try {
      const response = await axios.get(`${API_URL}/api/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Profile update error", error.message);
      throw error; // Throw the error for further handling if needed
    }
  };