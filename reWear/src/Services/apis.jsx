import { BsExposure } from "react-icons/bs"

const BASE_URL = "http://localhost:4000/api/v1"



export const Authentication ={
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    SEND_OTP_API: BASE_URL + "/auth/sendOTP",
    
}

