import axios from 'axios';
import Cookies from 'js-cookie';
const API_URL = import.meta.env.VITE_API_URL;



export const loginUser = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, formData);
        const token = response.data.token;
        Cookies.set('token', token);
        return response.data;

    } catch (error) {
        console.log("Login error", error.message);
        throw error;
    }
};

export const sendSMS = async (file, campaignName, text, sender) => {

    // Constructing form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('campaignName', campaignName);
    formData.append('text', text);
    formData.append('sender', sender);

    try {
        const response = await axios.post(`${API_URL}/api/send-sms`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // You can handle the response here if needed
        return response.data;

    } catch (error) {
        console.log("Error sending SMS", error.message);
        throw error;
    }
};