//purpos - State Management, Fetching Search Data from the API, Handling Search Actions
//search functionality with API requests using axios and manages search results in the Redux store.
//createSlice: Helps create a Redux slice     / createAsyncThunk: Used to handle asynchronous API calls in Redux  
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface FilterState {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: string;
}

//loading: Indicates if the data is loading (true/false).
//why ? - TypeScript enforces strict type checking,
interface SearchState {
  searchTerm: string;
  filters: {
    style: string;
    minPrice: string;
    maxPrice: string;
    availability: string;
    experienceLevel: string;
  };
  results: Item[]; // Array of search results
  defaultResults: Item[]; // Default data when no search query
  loading: boolean;
  error: string | null;
 
}

//Defining the Item Interface
interface Item {
  id?: number;
  images: string[];
  name: string;
  price: number;
  description: string;
  tags: string[];
  location: string;
  reviews: number;
  rating: number;
}

// Initial state
//default values of the state when the application starts or when the Redux store is first created. 
const initialState: SearchState = {
  searchTerm: "",
  filters: {
    style: "",
    minPrice: "",
    maxPrice: "",
    availability: "",
    experienceLevel: "",
  },
  results: [],
  defaultResults: [],
  loading: false,
  error: null,
  
};



export const fetchFilteredResults = createAsyncThunk(
  "search/fetchFilteredResults",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { search: SearchState };
      const { filters } = state.search;

      const response = await axios.get("http://127.0.0.1:8000/api/users", {
        params: filters,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch filtered results");
    }
  }
);


//This function is triggered when the user performs a search.
// Async thunk to fetch search results
export const fetchSearchResults = createAsyncThunk(
    // unique name for this action in Redux.
  "search/fetchResults",
  async (query: string, { rejectWithValue }) => {
    //send the data to the api endpoint
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/users`, {
        params: { q: query },                                                       //query??  fetchSearchResults(searchTerm))  searchTerm=query
      });
      return response.data; // Returns fetched data as payload (action)
    } catch (error) {
      return rejectWithValue("Failed to fetch search results");
    }
  }
);

// Async thunk to fetch default results
export const fetchDefaultResults = createAsyncThunk(
  "search/fetchDefaultResults",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users");
      return response.data;    // Returns fetched data as payload (action)
    } catch (error) {
      return rejectWithValue("Failed to fetch default results");
    }
  }
);

// Redux slice
/*createSlice() automatically creates a reducer function inside searchSlice.
It combines both the reducers (synchronous actions) and extraReducers (async actions).
It does this without requiring a function named searchReducer.*/
const searchSlice = createSlice({
  name: "search",  //alos act like a prefix
  //This ensures the Redux store starts with default values.
  initialState,

  reducers: {
    //Updates searchTerm with the user's input.  /  action.payload contains the new search query.
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    //Resets results to an empty array.
    clearSearchResults: (state) => {
      state.results = [];
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },

  //It listens for actions created by createAsyncThunk (like fetchSearchResults and fetchDefaultResults).
  extraReducers: (builder) => {
    builder
      //For search results 
      //When a search starts (pending state)
      //builder - It is used to define how the state should be updated when handling asynchronous actions (pending,fulfilled,rejected)
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //When search results are successfully fetched (fulfilled state)
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      //If the search request fails (rejected state):
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //For Default results 
      .addCase(fetchDefaultResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDefaultResults.fulfilled, (state, action) => {
        state.loading = false;
        state.defaultResults = action.payload;
      })
      .addCase(fetchDefaultResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFilteredResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilteredResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchFilteredResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
      
  },
});

// Export actions and reducer
// exports actions and the reducer from the searchSlice so that they can be used in other parts of the application.
//These functions are action creators that will be used to update the Redux state.
export const { setSearchTerm, clearSearchResults,setFilters ,clearFilters } = searchSlice.actions;
//Exports the reducer so that it can be added to the Redux store.
export default searchSlice.reducer;  //searchSlice.reducer=searchReducer


/*
 {
  "type": "search/fetchResults/fulfilled",
  "payload": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 1200,
      "rating": 4.5
    },
    {
      "id": 2,
      "name": "Mouse",
      "price": 25,
      "rating": 4.8
    }
  ]
}
*/
