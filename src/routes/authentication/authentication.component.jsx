
// import { getRedirectResult } from "firebase/auth";
// import { useEffect } from "react";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
// import { 
//     auth,
//     signInWithGooglePopup, 
//     signInWithGoogleRedirect,
//     createUserDocumentFromAuth
// } from "../../utils/firebase/firebase.utils";


import "./authentication.styles.scss";


const Authentication = () => {

    // For Sign in with Redirect

    // useEffect(() => {
    //     const getRedirectResultFunc = async () => {
    //         const response = await getRedirectResult(auth);
    //         console.log(response);
    //         if(response){
    //             const userDocRef = createUserDocumentFromAuth(response.user);
    //         }
                
    //     }

    //     getRedirectResultFunc();
        
    // }, [])

    

    // const getUserFromRedirect = async () => {
    //     const response = await signInWithGoogleRedirect();
    //     console.log(response.user);
    // }

    return(
        <div className="authentication-container">
            {/* <h1>Hey, This is the Sign-in Page</h1>
            <button onClick={getUser}>
                Sign In With Google
            </button> */}
            {/* <button onClick={getUserFromRedirect}>
                Sign In With Google Redirect
            </button> */}

            <SignInForm />

            <SignUpForm />
        </div>
    )
};

export default Authentication;