import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface FilterState {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: string;
}
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
  sortBy: string;
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
  sortBy: "relevant", 
  
};

// Async thunk to fetch results based on search term + filters + sort
export const fetchFilteredResults = createAsyncThunk(
  "search/fetchFilteredResults",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { search: SearchState };
      const { searchTerm, filters, sortBy } = state.search;

      const response = await axios.get("http://127.0.0.1:8000/api/users", {
        params: { q: searchTerm, ...filters, sortBy },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch filtered results");
    }
  }
);

// Async thunk to fetch search results
export const fetchSearchResults = createAsyncThunk(
  "search/fetchResults",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { search: SearchState };
      const { searchTerm, filters, sortBy } = state.search;

      const response = await axios.get("http://127.0.0.1:8000/api/users", {
        params: { q: searchTerm, ...filters, sortBy },
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue("Failed to fetch search results");
    }
  }
);

// Async thunk to fetch default results
export const fetchDefaultResults = createAsyncThunk(
  "search/fetchDefaultResults",
  async (sortBy: string, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users", {
        params: { sortBy },
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue("Failed to fetch default results");
    }
  }
);


const searchSlice = createSlice({
  name: "search",  
  //This ensures the Redux store starts with default values.
  initialState,

  reducers: {
    //Updates searchTerm with the user's input. /  action.payload contains the new search query.
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
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },

   // Handle state updates based on async thunk actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }) 
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

export const { setSearchTerm, clearSearchResults,setFilters ,clearFilters ,setSortBy} = searchSlice.actions;

export default searchSlice.reducer;  //searchSlice.reducer=searchReducer