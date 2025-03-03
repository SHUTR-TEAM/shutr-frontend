import { PortfolioState } from "./../../types/portfolio.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
//import build from "next/dist/build";

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
      data:  null,
      
    },
    
    activeGallery: {
      isLoading: false,
      isSuccessful: false,
      serverPortfolio: "",
      data: null,
    },

    activeReview: {
      isLoading: false,
      isSuccessful: false,
      serverPortfolio: "",
      data: null,
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
      console.log(config);  // should delete
  
      try {
       // return await axios.get("http://127.0.0.1:8000/api/headers").then((res) => res.data);
       return await axios.get("http://127.0.0.1:8000/api/headers").then((res) => res.data);
      } catch (error) {
        const e = error as AxiosError;
        return rejectWithValue(e.message);
      }
    }
  }
);

export const getByIdportfolio = createAsyncThunk(
  "portfolio/get-by-id",
    async ({ participantId }: { participantId: string }, { rejectWithValue }) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          participantId,
        },
      };
      console.log(config);  // should delete
      try {

       return await axios.get("http://127.0.0.1:8000/api/headers/67ab65b24cb48a7c886d0dfa").then((res) => res.data);

      //  const [portfolioResponse, galleryResponse] = await Promise.all([
      //   axios.get("http://127.0.0.1:8000/api/headers/67ab65b24cb48a7c886d0dfa"),
      //   axios.get("http://127.0.0.1:8000/api/galleries/67aecc532071993d23e91175"),
      //  ])
    } catch (error) {
      const e = error as AxiosError;
      return rejectWithValue(e.message);
    }
  );



  // export const updateByIdportfolio = createAsyncThunk(
  //   "portfolio/update-by-id",
  //   async ({ participantId }: { participantId: string }, { rejectWithValue }) => {
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       params: {
  //         participantId,
  //       },
  //     };
  //     console.log(config);  // should delete
  //     try {
         
  //        return  await axios.get("http://127.0.0.1:8000/api/headers/67ab65b24cb48a7c886d0dfa/update").then((res) => res.data);
  //     } catch (error) {
  //         const e = error as AxiosError;
  //         return rejectWithValue(e.message);
  //     }
          
  //   }
        
  // );


  export const updateByIdportfolio = createAsyncThunk(
    "portfolio/update-by-id",
    async ({ /*participantId,*/ formData }: { /*participantId: "67ab65b24cb48a7c886d0dfa ";*/ formData: FormData }, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          // `http://127.0.0.1:8000/api/headers/${participantId}/update/`, 
          `http://127.0.0.1:8000/api/headers/67ab65b24cb48a7c886d0dfa/update`,
          
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response.data;
      } catch (error) {
        const e = error as AxiosError;
        return rejectWithValue(e.message);
      }
    }
  );
  


  






  export const getByIdgallery = createAsyncThunk(
    "gallery/get-by-id",
      async ({ participantId }: { participantId: string }, { rejectWithValue }) => {
        const config = {
          galleries: {
            "Content-Type": "application/json",
          },
          params: {
            participantId,
          },
        };
        console.log(config);  // should delete
    
        try {
  
         return await axios.get("http://127.0.0.1:8000/api/galleries/67bb771b7ca1638d20e4023f").then((res) => res.data);
  
        //  const [portfolioResponse, galleryResponse] = await Promise.all([
        //   axios.get("http://127.0.0.1:8000/api/headers/67ab65b24cb48a7c886d0dfa"),
        //   axios.get("http://127.0.0.1:8000/api/galleries/67aecc532071993d23e91175"),
        //  ])
  
  
        
        } catch (error) {
          const e = error as AxiosError;
          return rejectWithValue(e.message);
        }
      }
  );

  
  export const getByIdreview = createAsyncThunk(
   "review/get-by-id",
     async ({ participantId }: { participantId: string }, { rejectWithValue }) => {       
      const config = {
        reviews: {
          "Content-Type": "application/json",
        },
        params: {
          participantId,
        },
      };
      console.log(config);   // should delete

      try {
        return await axios.get("http://127.0.0.1:8000/api/reviews/67bb3b00d0d8e5f2985929ba").then((res) => res.data);

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
        // Get all portfolio
        // Pending
        builder.addCase(getAllportfolio.pending, (state) => {
        state.allPortfolio = {
            isLoading: true,
            isSuccessful: false,
            serverPortfolio: "",
            data: null,
        };
        });

        // Get by id  portfolio
        // Pending
        builder.addCase(getByIdportfolio.pending, (state) => {
          state.activePortfolio = {
              isLoading: true,
              isSuccessful: false,
              serverPortfolio: "",
              //data : null;
              data: null,
          };
          });

          //Update by id portfolio
        builder.addCase(updateByIdportfolio.pending,(state) => {
          state.activePortfolio = {
            isLoading: true,
            isSuccessful: false,
            serverPortfolio: "",
            data: null,
          }
        });

          
        
        // Get by id  gallery
        // Pending
        builder.addCase(getByIdgallery.pending, (state) => {
          state.activeGallery = {
              isLoading: true,
              isSuccessful: false,
              serverPortfolio: "",
              //data : null;
              data: null,
          };
        });  


        //Get by id review
        //Pending
        builder.addCase(getByIdreview.pending, (state) => {
          state.activeReview = {
            isLoading: true,
            isSuccessful: false,
            serverPortfolio:"",
            data : null,
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


            // Fulfilled
            builder.addCase(getByIdportfolio.fulfilled, (state, action) => {
              state.activePortfolio = {
                isLoading: false,
                isSuccessful: true,
                serverPortfolio: "",
                data: action.payload,
              };
            });

            //fulfilled
            // builder.addCase(updateByIdportfolio.fulfilled, (state, action) => {
            //   state.activePortfolio = {
            //     isLoading: false,
            //     isSuccessful: true,
            //     serverPortfolio: "",
            //     data: action.payload,
            //   };
            // });

            // builder.addCase(updateByIdportfolio.fulfilled, (state, action) => {
            //   state.activePortfolio = {
            //     ...state.activePortfolio,
            //     data: action.payload, // Update state with new portfolio data
            //   };
            // });

            builder.addCase(updateByIdportfolio.fulfilled, (state, action) => {
              state.activePortfolio = {
                ...state.activePortfolio,
                data: {
                  ...state.activePortfolio.data, // Keep existing data
                  ...action.payload, // Merge new updated fields
                },
              };
            });
            
            



            // Fulfilled
            builder.addCase(getByIdgallery.fulfilled, (state, action) => {
              state.activeGallery = {
                isLoading: false,
                isSuccessful: true,
                serverPortfolio: "",
                data: action.payload,
              };
            });


            // Fulfilled
            builder.addCase(getByIdreview.fulfilled, (state, action) => {
              state.activeReview = {
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

            // Rejected
            builder.addCase(getByIdportfolio.rejected, (state, action) => {
              state.activePortfolio = {
                isLoading: false,
                isSuccessful: false,
                serverPortfolio: action.payload as string,
                data:  null,
              };
            });

            // Rejected
            builder.addCase(updateByIdportfolio.rejected, (state, action) => {
              state.activePortfolio = {
                isLoading: false,
                isSuccessful: false,
                serverPortfolio: action.payload as string,
                data:  null,
              };
            });
            


            // Rejected
            builder.addCase(getByIdgallery.rejected, (state, action) => {
              state.activeGallery = {
                isLoading: false,
                isSuccessful: false,
                serverPortfolio: action.payload as string,
                data:  null,
              };
            });

            // Rejected
            builder.addCase(getByIdreview.rejected, (state, action) => {
              state.activeReview = {
                isLoading: false,
                isSuccessful: false,
                serverPortfolio: action.payload as string,
                data:  null,
              }
            })


        
    },
  });

export default portfolioSlice.reducer;
