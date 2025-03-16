import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Booking, BookingState } from "../../types/booking.types";
import axios, { AxiosError } from "axios";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const ROUTE_URL = `${BACKEND_BASE_URL}/booking`;

const initialState: BookingState = {
  allBookings: {
    isLoading: false,
    isSuccessful: false,
    serverMessage: "",
    data: null,
  },
  activeBooking: {
    isLoading: false,
    isSuccessful: false,
    serverMessage: "",
    data: null,
  },
  createBooking: {
    isLoading: false,
    isSuccessful: false,
    serverMessage: "",
    data: null,
  },
};

export const createBooking = createAsyncThunk(
  "booking/create",
  async (booking: Booking, { rejectWithValue }) => {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },

    // };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ``,
      },
      withCredentials: true,
    };

    const body = JSON.stringify({
      ...booking,
    });

    try {
      return await axios
        .post(`${ROUTE_URL}/create`, body, config)
        .then((res) => res.data);
    } catch (error) {
      const e = error as AxiosError;
      return rejectWithValue(e.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all chats
    // Pending
    builder.addCase(createBooking.pending, (state) => {
      state.createBooking = {
        isLoading: true,
        isSuccessful: false,
        serverMessage: "",
        data: null,
      };
    });

    // Fulfilled
    builder.addCase(createBooking.fulfilled, (state, action) => {
      state.createBooking = {
        isLoading: false,
        isSuccessful: true,
        serverMessage: "",
        data: action.payload,
      };
    });

    // Rejected
    builder.addCase(createBooking.rejected, (state, action) => {
      state.createBooking = {
        isLoading: false,
        isSuccessful: false,
        serverMessage: action.payload as string,
        data: null,
      };
    });
  },
});

export default bookingSlice.reducer;
