//Importing Dependencies
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Fetch all bookings from the API
export const fetchAllBookings = createAsyncThunk(
    'booking/fetchAllBookings',
    async (_, { rejectWithValue }) => {
        try {
            //API request to retrieve all bookings.
            const response = await fetch('http://localhost:8000/bookings');
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching bookings:', error);
            return rejectWithValue('Failed to load bookings');
        }
    }
);

// Fetch single booking by ID
export const fetchBookingDetails = createAsyncThunk(
    'booking/fetchBookingDetails',
    async (bookingId: string, { rejectWithValue }) => {
        try {
            //Fetches details of a specific booking using its ID.
            const response = await fetch(`http://localhost:8000/bookings/${bookingId}/`);
            if (!response.ok) {
                throw new Error('Failed to fetch booking details');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching booking details:', error);
            return rejectWithValue('Failed to load booking details');
        }
    }
);

//structure the Booking data
interface Booking {
    id: string;
    picture: string;
    name: string;
    status: string;
    time: string;
    event: string;
    location: string;
    client: { name: string; email: string; phone: string };
    details: {
        eventType: string;
        dateTime: string;
        duration: string;
        location: string;
        packageType: string;
        price: string;
    };
}

interface BookingState {
    bookings: Booking[];
    selectedBooking: Booking | null;
    loading: boolean;
    error: string | null;
}

const initialState: BookingState = {
    bookings: [],
    selectedBooking: null,
    loading: false,
    error: null,
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
                state.bookings = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllBookings.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(fetchBookingDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookingDetails.fulfilled, (state, action: PayloadAction<Booking>) => {
                state.selectedBooking = action.payload;
                state.loading = false;
            })
            .addCase(fetchBookingDetails.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    }
});

export default bookingSlice.reducer;
