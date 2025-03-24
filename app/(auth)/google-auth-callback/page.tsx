"use client";

import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";

const GoogleAuthCallback = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const state = searchParams.get("state");
      const code = searchParams.get("code");
      const scope = searchParams.get("scope");
      const error = searchParams.get("error");

      if (error) {
        console.error("Google OAuth Error:", error);
        // Handle the error
        return;
      }

      if (state && code) {
        try {
          // Send the state and code to the backend
          const response = await axios.get(
            "http://localhost:8000/auth/google-auth-callback",
            {
              params: { state, code, scope },
              withCredentials: true,
            }
          );

          console.log("Google Calendar connected successfully:", response.data);
          // Redirect or display a success message
        } catch (err) {
          console.error("Failed to connect Google Calendar:");
        }
      }
    };

    handleGoogleCallback();
  }, [searchParams]);

  return <div>Processing Google Calendar connection...</div>;
};

export default GoogleAuthCallback;
