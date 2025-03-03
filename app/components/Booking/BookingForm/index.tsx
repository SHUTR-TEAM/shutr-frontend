"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./index.module.css";
import ClientInformation from "../ClientInformation";
import EventDetails from "../EventDetails";
import PhotoRequirements from "../PhotoRequirements";
import PackageSelection from "../PackageSelection";
import Agreements from "../Agreements";
import ConfirmationDetails from "../ConfirmationDetails";

const steps = [
  "Client Info",
  "Event Details",
  "Photography",
  "Package",
  "Agreement",
];

type BookingFormData = {
  // Client Information
  fullName: string;
  contactNumber: string;
  email: string;
  address?: string;

  // Event Details
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  guestCount: number;
  eventSetting: "indoor" | "outdoor";

  // Photo Requirements
  coverageDuration: string;
  requiredShots: string[];
  specialRequests?: string;

  // Package Selection
  package: "basic" | "premium" | "luxury";
  addons: string[];

  // Agreements
  weatherPlan?: string;
  permissions: boolean;
  terms: boolean;
  cancellation: boolean;
};

interface BookingFormProps {
  selectedPackage?: {
    id: number;
    title: string;
    price: string;
    description: string;
    packageType: "basic" | "premium" | "luxury";
  };
}

export default function BookingForm({ selectedPackage }: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<BookingFormData>();


  useEffect(() => {
    if (selectedPackage) {
      methods.setValue("package", selectedPackage.packageType);
    }
  }, [selectedPackage, methods]);

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

  const onSubmit = (data: BookingFormData) => {
    console.log("Form submitted:", data);
    // Here you would typically send the data to your backend
    alert("Booking request submitted successfully!");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ClientInformation />;
      case 2:
        return <EventDetails />;
      case 3:
        return <PhotoRequirements />;
      case 4:
        return <PackageSelection />;
      case 5:
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
