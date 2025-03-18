// redux/bookingSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Booking {
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
  selectedBooking: Booking | null;
}

//initial state
const initialState: BookingState = {
  selectedBooking: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBooking: (state, action: PayloadAction<Booking>) => {
      state.selectedBooking = action.payload;
    },
  },
});

export const { setBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
