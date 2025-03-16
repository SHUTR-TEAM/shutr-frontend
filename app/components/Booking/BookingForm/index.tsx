"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./index.module.css";
import ClientInformation from "../ClientInformation";
import EventDetails from "../EventDetails";
// import PhotoRequirements from "../PhotoRequirements";
import PackageSelection from "../PackageSelection";
import Agreements from "../Agreements";
import ConfirmationDetails from "../ConfirmationDetails";
import { AppDispatch } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { createBooking } from "@/app/redux/features/booking";
import { Booking } from "@/app/redux/types/booking.types";

const steps = [
  "Client Info",
  "Event Details",
  // "Photography",
  "Package",
  "Agreement",
];

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<Booking>();
  const dispatch: AppDispatch = useDispatch();

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
    data.photographer_id = "67d6760dcc8251d8cc092e8f";
    data.client_id = "67d6760dcc8251d8cc092e8f";

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
