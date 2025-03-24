"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./index.module.css";
import ClientInformation from "../ClientInformation";
import EventDetails from "../EventDetails";
// import PhotoRequirements from "../PhotoRequirements";
import PackageSelection from "../PackageSelection";
import Agreements from "../Agreements";
import ConfirmationDetails from "../ConfirmationDetails";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "@/app/redux/features/booking";
import { Booking } from "@/app/redux/types/booking.types";
import { useSearchParams } from "next/navigation";

const steps = [
  "Client Info",
  "Event Details",
  // "Photography",
  "Package",
  "Agreement",
];

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();
  const photographerId = searchParams.get("photographerId");

  const user = useSelector((state: RootState) => state.auth.user);

  const methods = useForm<Booking>({
    defaultValues: {
      client: {
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        address: "",
        nic: "",
      },
    },
  });

  const { reset } = methods;

  // Update default values once the user is loaded
  useEffect(() => {
    if (user) {
      reset({
        client: {
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          phone: user.phone_num || "",
          email: user.email || "",
          address: user.address || "",
          nic: user.nic || "",
        },
      });
    }
  }, [user, reset]);

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: Booking) => {
    if (photographerId) {
      data.photographer_id = photographerId;
    }

    if (user?.id) {
      data.client_id = user?.id;
    }

    console.log("Form submitted:", data);
    dispatch(createBooking(data));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ClientInformation />;
      case 2:
        return <EventDetails />;
      case 3:
        return <PackageSelection />;
      // case 3:
      //   return <PhotoRequirements />;
      case 4:
        return <Agreements />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={styles.formContainer}
      >
        <h2 className={styles.formTitle}>Book Your Photography Session</h2>
        <p className={styles.formSubtitle}>
          Fill in the details below to schedule your perfect shoot
        </p>

        {/* <ProgressSteps steps={steps} currentStep={currentStep} /> */}
        <div className={styles.formWrapper}>
          <div>
            <div className={styles.formContent}>{renderStep()}</div>

            <div className={styles.formActions}>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className={styles.prevBtn}
                >
                  Previous
                </button>
                // <Button type="button" variant="outline" onClick={handlePrevious}>
                //   Previous
                // </Button>
              )}
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className={styles.nextBtn}
                >
                  Next
                </button>
              ) : (
                // <Button type="button" onClick={handleNext}>Next</Button>
                <button type="submit" className={styles.submitBtn}>
                  Submit Booking Request
                </button>
                // <Button type="submit">
                //   Submit Booking Request
                // </Button>
              )}
            </div>
          </div>

          <ConfirmationDetails />
        </div>
      </form>
    </FormProvider>
  );
}
