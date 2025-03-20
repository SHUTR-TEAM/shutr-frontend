// Importing Dependencies
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Fetch all bookings from the API
export const fetchAllBookings = createAsyncThunk(
    "booking/fetchAllBookings",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/booking/");
            if (!response.ok) {
                throw new Error("Failed to fetch bookings");
            }
            const data = await response.json();

            return data.map((booking: any) => {
                let bookingId = booking.id || booking._id;
                
                // Handle MongoDB ObjectId
                if (typeof bookingId === "object" && "$oid" in bookingId) {
                    bookingId = bookingId.$oid;
                }

                if (!bookingId) {
                    console.error("Missing ID in booking:", booking);
                }

                return {
                    id: bookingId || "N/A",
                    status: booking.status || "Unknown",
                    client: {
                        first_name: booking.client?.first_name || "N/A",
                        last_name: booking.client?.last_name || "N/A",
                        email: booking.client?.email || "N/A",
                        phone: booking.client?.phone || "N/A"
                    },
                    event: {
                        type: booking.event?.type || "Unknown",
                        date: booking.event?.date || "N/A",
                        address: booking.event?.address || "Unknown Location"
                    },
                    payment: {
                        total_amount: booking.payment?.total_amount || 0,
                        amount_paid: booking.payment?.amount_paid || 0,
                        balance_due: booking.payment?.balance_due || 0,
                        payment_status: booking.payment?.payment_status || "Unknown"
                    },
                    additional_notes: booking.additional_notes || "",
                    cancellation_policy_agreed: booking.cancellation_policy_agreed ?? false,
                    terms_and_conditions_agreed: booking.terms_and_conditions_agreed ?? false
                };
            });
        } catch (error) {
            console.error("Error fetching bookings:", error);
            return rejectWithValue("Failed to load bookings");
        }
    }
);



// Fetch single booking by ID
export const fetchBookingDetails = createAsyncThunk(
    "booking/fetchBookingDetails",
    async (bookingId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/booking/${bookingId}/`);

            if (!response.ok) {
                throw new Error("Failed to fetch booking details");
            }

            const data = await response.json();

            // Ensure correct handling of ObjectId
            let bookingIdFormatted = data._id;
            if (typeof bookingIdFormatted === "object" && "$oid" in bookingIdFormatted) {
                bookingIdFormatted = bookingIdFormatted.$oid;
            }

            return {
                id: bookingIdFormatted || "N/A",
                photographer_id: data.photographer_id || "N/A",
                client_id: data.client_id || "N/A",
                client: data.client || {},
                event: data.event || {},
                payment: data.payment || {},
                status: data.status || "Unknown",
                additional_notes: data.additional_notes || "",
                cancellation_policy_agreed: data.cancellation_policy_agreed ?? false,
                terms_and_conditions_agreed: data.terms_and_conditions_agreed ?? false,
            };
        } catch (error) {
            console.error("Error fetching booking details:", error);
            return rejectWithValue("Failed to load booking details");
        }
    }
);


// Updated Booking Interface
interface Booking {
    id: string;
    status: string;
    client: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
    };
    event: {
        type: string;
        date: string;
        address: string;
    };
    payment: {
        total_amount: number;
        amount_paid: number;
        balance_due: number;
        payment_status: string;
    };
    additional_notes?: string;
    cancellation_policy_agreed: boolean;
    terms_and_conditions_agreed: boolean;
}

// Booking State Interface
interface BookingState {
    bookings: Booking[];
    selectedBooking: Booking | null;
    loading: boolean;
    error: string | null;
}

// Initial State
const initialState: BookingState = {
    bookings: [],
    selectedBooking: null,
    loading: false,
    error: null
};

// Create Booking Slice
const bookingSlice = createSlice({
    name: "booking",
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
            .addCase(fetchBookingDetails.fulfilled, (state, action: PayloadAction<any>) => {
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
