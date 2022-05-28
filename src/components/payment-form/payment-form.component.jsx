import { useState } from "react";


import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";

import { 
    FormContainer, 
    PaymentFormContainer, 
    PaymentButton 
} from "./payment-form.styles";

const PaymentForm = ({cartTotal}) => {

    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

    const currentUser = useSelector(selectCurrentUser);
    
    const stripe = useStripe();
    const elements = useElements();

    const handlePaymentFormSubmit = async (e) => {

        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        setIsPaymentProcessing(true)

        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ amount : cartTotal * 100 })
        }).then(res => res.json())

        const { paymentIntent: { client_secret } } = response;
        console.log(client_secret)

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'guest'
                }
            }
        })

        setIsPaymentProcessing(false);

        if(paymentResult.error){
            alert(paymentResult.error)
        } else {
            if(paymentResult.paymentIntent.status === "succeeded"){
                alert("Payment successful");
            }
        }
    }

    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={handlePaymentFormSubmit}>
                <CardElement />
                <PaymentButton 
                    isLoading={isPaymentProcessing}
                >
                    Pay now
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
};

export default PaymentForm;