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

// export interface Booking {
//   id: string;
//   // Client Information
//   fullName: string;
//   contactNumber: string;
//   email: string;
//   address?: string;

//   // Event Details
//   eventType: string;
//   eventDate: string;
//   // startTime: string;
//   // endTime: string;
//   location: string;
//   guestCount: number;
//   eventSetting: "indoor" | "outdoor";

//   // Photo Requirements
//   coverageDuration: string;
//   requiredShots: string[];
//   specialRequests?: string;

//   // Package Selection
//   package: "basic" | "premium" | "luxury";
//   addons: string[];

//   // Agreements
//   weatherPlan?: string;
//   permissions: boolean;
//   terms: boolean;
//   cancellation: boolean;
// }

export interface Booking {
  client: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    address?: string;
    nic: string;
  };
  event: {
    // name: string;
    type: string;
    date: string; // Store as ISO string
    // duration: {
    //   start_time: string;
    //   end_time: string;
    // };
    venue: {
      address: string;
      event_setting: string;
      //   notes?: string;
    };
    guest_count: number;
  };
//   photography_details: {
//     style: string[];
//     specific_shots: string[];
//     special_instructions?: string;
//     editing_preferences?: string;
//   };
  package: {
    name: string;
    num_photographers: number;
    extra_services: string[];
    price: number;
    currency: string;
  };
  deliverables: {
    format: string[];
    expected_delivery_date: string;
  };
  payment: {
    deposit_paid: boolean;
    total_amount: number;
    amount_paid: number;
    balance_due: number;
    payment_status: "Pending" | "Paid" | "Cancelled";
  };
  status: "Confirmed" | "Pending" | "Cancelled";
  cancellation_policy_agreed: boolean;
}
