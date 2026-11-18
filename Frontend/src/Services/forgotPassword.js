import api from "./api";

// Forgot Password

export const sendVerificationCode = async (email) => {
    const response = await api.post("/api/sendVerificationCode", { email });
    return response.data;
}

export const verifyOtp = async (email, otp) => {
    const response = await api.post("/api/verifyOtp", { email, otp });
    return response.data;
}

export const setNewPassword = async (email, newPassword) => {
    const response = await api.post("/api/setNewPassword", { email, newPassword });
    return response.data;
}