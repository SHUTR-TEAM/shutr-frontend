export interface BookingState {
  allBookings: AllBookings;
  activeBooking: ActiveBooking;
  createBooking: CreateBooking;
}

export interface AllBookings {
  isLoading: boolean;
  isSuccessful: boolean;
  serverMessage: string;
  data: Booking[] | null;
}

export interface ActiveBooking {
  isLoading: boolean;
  isSuccessful: boolean;
  serverMessage: string;
  data: Booking | null;
}

export interface CreateBooking {
  isLoading: boolean;
  isSuccessful: boolean;
  serverMessage: string;
  data: Booking | null;
}

export interface Booking {
  photographer_id: string;
  client_id: string;
  client: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    address?: string;
    nic: string;
  };
  event: {
    type: string;
    date: string; // Store as ISO string
    address: string;
    event_setting: string;
    guest_count: number;
  };
  package_id: string;
  package: {
    //TODO: change
    name: string;
    num_photographers: number;
    extra_services: string[];
    price: number;
    currency: string;
  };
  payment: {
    deposit_paid: boolean;
    total_amount: number;
    amount_paid: number;
    balance_due: number;
    payment_status: "Pending" | "Paid" | "Cancelled";
  };
  status: "Confirmed" | "Pending" | "Cancelled";
  additional_notes?: string;
  cancellation_policy_agreed: boolean;
  terms_and_conditions_agreed: boolean;
}
