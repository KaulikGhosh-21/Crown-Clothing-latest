import { useSelector } from "react-redux";
import { selectIsSignupDone } from "../../store/user/user.selector";

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
import { useState } from "react";
import Button from "../../components/button/button.component";


const Authentication = () => {

    const isSignupDone = useSelector(selectIsSignupDone);

    console.log(isSignupDone);

    let [whichFormUserWants, setWhichFormUserWants] = useState("");


    let className = "";

    if(whichFormUserWants === "signup" && !isSignupDone){
        className = "signup-wanted-signup-not-done";
    }else if(whichFormUserWants === "signin" && !isSignupDone){
        className = "signin-wanted-signup-not-done";
    }

    console.log(className);


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
        <div className="auth-container">
            <div className={`${isSignupDone && 'signup-done'} authentication-container`}>


                {
                    className === "signup-wanted-signup-not-done" && !isSignupDone ? (
                    <SignUpForm 
                        className={className}
                    />
                    ) : (
                        <SignInForm 
                            className={className}
                        />
                    )
                }

            </div>
            {
                !isSignupDone && (
                    <div className="auth-buttons">
                        {
                            whichFormUserWants === "signup" && !isSignupDone ? (
                                <>
                                <h3>Already got an account.</h3>
                                <span 
                                    onClick={() => setWhichFormUserWants("signin")}>
                                        Signin
                                </span> 
                            </>
                            ) : (
                                <>
                                    <h3>Don't have an account ?</h3>
                                    <span
                                        onClick={() => setWhichFormUserWants("signup")}>
                                            Signup
                                    </span>
                                </>
                            )
                        }
                    </div>
                ) 
            }
            
        </div>
    )
};

export default Authentication;