// src/Services/operations/authApi.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiConnector } from "../apiconnector";
import { Authentication } from "../apis";
import { toast } from "react-hot-toast";

const { LOGIN_API, SIGNUP_API, SEND_OTP_API } = Authentication;

// SEND OTP
export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async (email, { rejectWithValue }) => {
    try {
      toast.loading("Sending OTP...");
      const response = await apiConnector("POST", SEND_OTP_API, {
        email,
        checkUserPresent: true,
      });
      toast.dismiss();
      toast.success("OTP sent successfully");
      return response.data;
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to send OTP");
      return rejectWithValue(error.response?.data?.message || "OTP error");
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate }, thunkAPI) => {
    try {
      toast.loading("Logging in...");
      const response = await apiConnector("POST", LOGIN_API, { email, password });
      toast.dismiss();

      const token = response.data.token;
      const user = response.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful");
      navigate("/dashboard/my-profile");
      return { token, user };
    } catch (error) {
      toast.dismiss();
      toast.error("Login failed");
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login error");
    }
  }
);

// SIGNUP
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { accountType, firstName, lastName, email, password, confirmPassword, otp, navigate },
    thunkAPI
  ) => {
    try {
      toast.loading("Signing up...");
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });
      toast.dismiss();

      toast.success("Signup successful");
      navigate("/login");
      return response.data;
    } catch (error) {
      toast.dismiss();
      toast.error("Signup failed");
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Signup error");
    }
  }
);
