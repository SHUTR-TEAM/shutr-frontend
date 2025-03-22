import { PortfolioState, SocialLinks } from './../../types/portfolio.types';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

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

    activeSocialLinks: {
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
      console.log(config);
  
      try {
       return await axios.get("http://127.0.0.1:8000/api/headers").then((res) => res.data);
      } catch (error) {
        const e = error as AxiosError;
        return rejectWithValue(e.message);
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
      console.log(config);
      try {
       return await axios.get("http://127.0.0.1:8000/api/headers/67ab65b24cb48a7c886d0dfa").then((res) => res.data);
      } catch (error) {
        const e = error as AxiosError;
        return rejectWithValue(e.message);
      }
    }
  );


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
      try {
        // Use the participantId dynamically in the URL like in review
        console.log("came to get method");
        const response = await axios.get(
          
          `http://127.0.0.1:8000/api/galleries/photographer/${participantId}`
        );
        return response.data; // Return the data from the response
      } catch (error) {
        const e = error as AxiosError;
        return rejectWithValue(e.message); // Reject with error message if request fails
      }
    }
  );



  export const postGallery = createAsyncThunk(
    "gallery/post",
    async (
      {
        formData, // formData is passed containing images and other gallery details
      }: { formData: FormData },
      { rejectWithValue }
    ) => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/galleries/create", // Backend endpoint for gallery creation
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Handle file uploads
            },
          }
        );
  
        return response.data; // Return the response data (the created gallery)
      } catch (error) {
        const e = error as AxiosError;
        return rejectWithValue(e.message); // Handle errors and return the error message
      }
    }
  );

  export const updateByIdgallery = createAsyncThunk(
    "gallery/update-by-id",
    async ({ /*participantId,*/ formData }: { /*participantId: "67ab65b24cb48a7c886d0dfa ";*/ formData: FormData }, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/galleries/67bb771b7ca1638d20e4023f/update`,
          
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


  

  // Updated deleteImage function to use participantId
  export const deleteImage = createAsyncThunk(
    "gallery/delete-image",
    async (
      { participantId, imageUrl }: { participantId: string; imageUrl: string },
      { rejectWithValue }
    ) => {
      try {
        const response = await axios.post(
          // `http://127.0.0.1:8000/api/gallery/delete-photo/${participantId}/`,
          `http://127.0.0.1:8000/api/galleries/${participantId}/delete_photo`,
          { image_url: imageUrl }, // Send the image URL in the request body
          {
            headers: {
              "Content-Type": "application/json",
              // Add Authorization here if required:
              // Authorization: `Bearer ${yourAuthToken}`
            },
          }
        );

        return response.data; // Assuming backend returns success message or updated gallery info
      } catch (error) {
        const e = error as AxiosError;
        return rejectWithValue(e.message);
      }
    }
  );


  /* Review */

  export const postReview = createAsyncThunk(
    "review/post",
    async (
      { userID, photographerID, rating, reviewText }: { 
        userID: string; 
        photographerID: string; 
        rating: number; 
        reviewText: string; 
      }, 
      { rejectWithValue }
    ) => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/reviews/create", {
          userID,
          photographerID,
          rating,
          reviewText
        });
  
        return response.data;
      } catch (error) {
        const e = error as AxiosError;
        return rejectWithValue(e.message);
      }
    }
  );


  export const getByIdreview = createAsyncThunk(
    "review/get-by-id",
    async ({ participantId }: { participantId: string }, { rejectWithValue }) => {
      try {
        // Use the participantId dynamically in the URL
        const response = await axios.get(
          `http://127.0.0.1:8000/api/reviews/photographer/${participantId}`
        );
        return response.data; // Return the data from the response
      } catch (error) {
        const e = error as AxiosError;
        return rejectWithValue(e.message); // Reject with error message if request fails
      }
    }
  );


  export const deleteReview = createAsyncThunk(
    "reviews/delete",
    async (reviewId: string, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/reviews/delete/${reviewId}`
        );
        return response.data; // Return success message
      } catch (error) {
        const e = error as AxiosError;
        return rejectWithValue(e.response?.data || e.message); // Handle error response
      }
    }
  );
  



  /* Social links  */

  export const createSocialLinks = createAsyncThunk(
    "socialLinks/create",
    async (
      {userID,facebook,instagram,twitter,linkedin,
      }: {
        userID: string;
        facebook?: string;
        instagram?: string;
        twitter?: string;
        linkedin?: string;
      },
      { rejectWithValue }
    ) => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/SocialLinks/create", {
          userID,facebook,instagram,twitter,linkedin,
        });
  
        return response.data; // Return response data on success
      } catch (error) {
        const e = error as AxiosError;
        return rejectWithValue(e.response?.data || e.message); // Reject with API error message
      }
    }
  );
  


  export const getSocialLinksByPhotographer = createAsyncThunk(
    "socialLinks/get-by-photographer",
    async ({ photographerId }: { photographerId: string }, { rejectWithValue }) => {
      try {
        // Use the photographerId dynamically in the API endpoint
        const response = await axios.get(
          `http://127.0.0.1:8000/api/SocialLinks/photographer/${photographerId}`
        );
        return response.data; // Return the data from the response
      } catch (error) {
        const e = error as AxiosError;
        return rejectWithValue(e.message); // Reject with error message if request fails
      }
    }
  );



  export const updateSocialLinks = createAsyncThunk(
    "socialLinks/update",
    async ({ photographerId, socialLinks }: { photographerId: string, socialLinks: SocialLinks }, { rejectWithValue }) => {
      try {
        // Send the updated social links to the backend
        const response = await axios.post(
          `http://127.0.0.1:8000/api/SocialLinks/photographer/update/${photographerId}`,
          socialLinks
        );
        return response.data; // Return the response data (you can modify this if needed)
      } catch (error) {
        const e = error as AxiosError;
        return rejectWithValue(e.message); // Reject with error message if request fails
      }
    }
  );


  export const deleteSocialLinks = createAsyncThunk(
    "socialLinks/delete",
    async (photographerId: string, { rejectWithValue }) => {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/SocialLinks/delete/${photographerId}`
        );
        return response.data; // Return success message
      } catch (error) {
        const e = error as AxiosError;
        return rejectWithValue(e.response?.data || e.message); // Reject with error message
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

        //Get by id SocialLinks
        //Pending
        builder.addCase(getSocialLinksByPhotographer.pending, (state) => {
          state.activeSocialLinks = {
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

            // Fulfilled
            builder.addCase(getSocialLinksByPhotographer.fulfilled, (state, action) => {
              state.activeSocialLinks = {
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

            // Rejected
            builder.addCase(getSocialLinksByPhotographer.rejected, (state, action) => {
              state.activeSocialLinks = {
                isLoading: false,
                isSuccessful: false,
                serverPortfolio: action.payload as string,
                data:  null,
              }
            })
    },
  });

  export default portfolioSlice.reducer;