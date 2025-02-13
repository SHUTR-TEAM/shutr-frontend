import { PortfolioState } from './../../types/portfolio.types';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import build from "next/dist/build";

//const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ;
//const ROUTE_URL = `${BACKEND_BASE_URL}/portfolio/....`



const initialState: PortfolioState = {
    allPortfolio: {
      isLoading: false,
      isSuccessful: false,
      serverPortfolio: "",
      data: null,
    },
    activePortfolio: {
      isLoading: false,
      isSuccessful: false,
      serverPortfolio: "",
      data: {
        portfolio: null,
      },
    },
    createPortfolio: {
      isLoading: false,
      isSuccessful: false,
      serverPortfolio: "",
      data: null,
    },
  };
  





export const getAllportfolio = createAsyncThunk(
    "portfolio/get-all",
    async ({ participantId }: { participantId: string }, { rejectWithValue }) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          participantId,
        },
      };
  
      try {
        return await axios.get("http://127.0.0.1:8000/api/headers").then((res) => res.data);
      } catch (error) {
        const e = error as AxiosError;
        return rejectWithValue(e.message);
      }
    }
  );


  const portfolioSlice = createSlice({
    name : "portfolio",
    initialState,
    reducers : {

    },
    extraReducers: (builder) => {
        // Get all chats
        // Pending
        builder.addCase(getAllportfolio.pending, (state) => {
        state.allPortfolio = {
            isLoading: true,
            isSuccessful: false,
            serverPortfolio: "",
            data: null,
        };
        });

        // Fulfilled
            builder.addCase(getAllportfolio.fulfilled, (state, action) => {
              state.allPortfolio = {
                isLoading: false,
                isSuccessful: true,
                serverPortfolio: "",
                data: action.payload,
              };
            });
        
            // Rejected
            builder.addCase(getAllportfolio.rejected, (state, action) => {
              state.allPortfolio = {
                isLoading: false,
                isSuccessful: false,
                serverPortfolio: action.payload as string,
                data: null,
              };
            });
        
    },
  });

  export default portfolioSlice.reducer;