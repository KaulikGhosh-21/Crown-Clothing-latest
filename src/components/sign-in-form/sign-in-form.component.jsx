import { useState } from "react";

import { 
    signInWithGooglePopup, 
    signInUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";



const defaultFieldValues = {
    email: "",
    password: "",
}

const SignInForm = () => {

    const [fieldValues, setFieldValues] = useState(defaultFieldValues);

    const {email, password} = fieldValues;

    const resetFormFields = () => {
        setFieldValues(defaultFieldValues);
    }


    const handleChange = (event) => {
        const {name, value} = event.target;

        setFieldValues({...fieldValues, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await signInUserWithEmailAndPassword(email, password);
            console.log(response.user);

            resetFormFields();

        }catch(err){
            switch(err.code){
                case 'auth/user-not-found':
                    alert("No user found with the given credentials");
                    break;
                case 'auth/wrong-password':
                    alert("You have entered incorrect password");
                    break;
                default:
                    console.log(err);
            }
        }

    }


    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }


    return(
        <div className="sign-in-container">

            <h2>Already have an account?</h2>

            <span>Sign in with your email and password.</span>

            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    type="email" 
                    onChange={handleChange} 
                    name="email"
                    value={email}
                />

                <FormInput
                    label="Password"
                    type="password" 
                    onChange={handleChange} 
                    name="password"
                    value={password}
                />

                <div className="buttons-container">

                    <Button type="submit">Sign In</Button>
                    <Button 
                        type="button"
                        onClick={signInWithGoogle} 
                        buttonType={BUTTON_TYPE_CLASSES.google}>
                            Google Sign in
                    </Button>

                </div>

            </form>

        </div>
    )
}

export default SignInForm;