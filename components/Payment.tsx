import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { Alert } from "react-native";
import { fetchAPI } from "@/lib/fetch";
import { PaymentProps } from "@/types/type";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [publishableKey, setPublishableKey] = useState("");

  const initializePaymentSheet = async () => {
    // const { paymentIntent, ephemeralKey, customer } =
    //   await fetchPaymentSheetParams();

    // const { error } = await initPaymentSheet({
    //   merchantDisplayName: "Example, Inc.",
    //   customerId: customer,
    //   customerEphemeralKeySecret: ephemeralKey,
    //   paymentIntentClientSecret: paymentIntent,
    //   // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
    //   //methods that complete payment after a delay, like SEPA Debit and Sofort.
    //   allowsDelayedPaymentMethods: true,
    //   defaultBillingDetails: {
    //     name: "Jane Doe",
    //   },
    // });
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: "USD",
        },
        confirmHandler: comfirmHandler,
      },
    });
    if (error) {
      // setLoading(true);
      // handle error
    }
  };

  const comfirmHandler = async (
    paymentMethod,
    shouldSavePaymentMethod,
    intentCreationCallback,
  ) => {
    const { paymentIntent, customer } = await fetchAPI(
      "/(api)/(stripe)/create",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: fullName || email.split("@")[0],
          email: email,
          amount: amount,
          paymentMethodId: paymentMethod.id,
        }),
      },
    );

    if (paymentIntent.client_secret) {
      const { result } = await fetchAPI("/(api)/(stipe)/pay", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          payment_intent_id: paymentIntent.id,
          customer_id: customer,
        }),
      });

      if (result.client_secret) {
        //create a  ride
      }
    }

    // const myServerResponse = await fetch(...);
    // const { clientSecret, error } = await myServerResponse.json();
    // if (clientSecret) {
    //   intentCreationCallback({ clientSecret });
    // } else {
    //   intentCreationCallback({ error });
    // }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  // const fetchPaymentSheetParams = async () => {
  //   const response = await fetch(`${API_URL}/payment-sheet`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const { paymentIntent, ephemeralKey, customer } = await response.json();
  //
  //   return {
  //     paymentIntent,
  //     ephemeralKey,
  //     customer,
  //   };
  // };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code === PaymentSheetError.Canceled) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      }
    } else {
      setSuccess(true);
      // Alert.alert("Success", "Your order is confirmed!");
    }
  };

  return (
    <>
      <CustomButton
        title="Comfirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />
    </>
  );
};
export default Payment;
