import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

interface SearchState {
  searchTerm: string;
  filters: {
    style: string;
    minPrice: string;
    maxPrice: string;
    availability: string;
    experienceLevel: string;
  };
  results: Item[];           // Filtered results
  defaultResults: Item[];    // Default homepage results
  loading: boolean;
  error: string | null;
  sortBy: string;
  page: number;
  limit: number;
  total: number;
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
  page: 1,
  limit: 10,
  total: 0,
};

//Fetch filtered results search, filters, sort, pagination
export const fetchFilteredResults = createAsyncThunk(
  "search/fetchFilteredResults",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { search: SearchState };
      const { searchTerm, filters, sortBy, page, limit } = state.search;

      const response = await axios.get("http://127.0.0.1:8000/api/users", {
        params: {
          q: searchTerm,
          ...filters,
          sortBy,
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch filtered results");
    }
  }
);

// Async thunk to fetch default results
export const fetchDefaultResults = createAsyncThunk(
  "search/fetchDefaultResults",
  async ({ sortBy, limit }: { sortBy: string; limit: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users", {
        params: { sortBy, page: 1, limit },
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
    // Update the search term with the user's input
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.page = 1;    // Reset to page 1
    },
    //Resets results to an empty array.
    clearSearchResults: (state) => {
      state.results = [];
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.page = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },

   // Handle state updates based on async thunk actions
  extraReducers: (builder) => {
    builder

    //Filtered Results
    .addCase(fetchFilteredResults.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchFilteredResults.fulfilled, (state, action) => {
      state.loading = false;
      state.results = action.payload.results;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
    })
    .addCase(fetchFilteredResults.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    // Default Results
    .addCase(fetchDefaultResults.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchDefaultResults.fulfilled, (state, action) => {
      state.loading = false;
      state.defaultResults = action.payload.results;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
    })
    .addCase(fetchDefaultResults.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });    
  },
});

export const {
  setSearchTerm,
  clearSearchResults,
  setFilters,
  clearFilters,
  setSortBy,
  setPage,
  setLimit,
} = searchSlice.actions;

export default searchSlice.reducer;  //searchSlice.reducer=searchReducer