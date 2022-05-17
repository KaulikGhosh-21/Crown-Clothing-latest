import { useState, useContext } from "react";

import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInUserWithEmailAndPassword,
    onAuthStateChangedListener
} from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";

import FormInput from "../form-input/form-input.component";

import { UserContext } from "../../contexts/user.context";

import "./sign-in-form.styles.scss";



const defaultFieldValues = {
    email: "",
    password: "",
}

const SignInForm = () => {

    const {setCurrentUser} = useContext(UserContext);

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
            // console.log(response);

            // setCurrentUser(response.user);

            // onAuthStateChangedListener(() => {
            //     console.log(user);
            // })

            resetFormFields();

            // const {user} = await createUserDataWithEmailAndPassword(email, password);
            // const objCreated = {...user, displayName};
            // // console.log(objCreated)
            // await createUserDocumentFromAuth(objCreated);
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
        const response = await signInWithGooglePopup();
        console.log(response);
        // createUserDocumentFromAuth(response.user);
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
                        buttonType="google">
                            Google Sign in
                    </Button>

                </div>

            </form>

        </div>
    )
}

export default SignInForm;