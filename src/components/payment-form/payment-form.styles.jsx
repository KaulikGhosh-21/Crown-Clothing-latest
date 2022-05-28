import styled from "styled-components";

import Button from "../button/button.component";

export const PaymentFormContainer = styled.div`
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const FormContainer = styled.form`
    height: 100px;
    min-width: 500px; 
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
`

export const PaymentButton = styled(Button)`
    width: max-content;
    align-self: center;
`