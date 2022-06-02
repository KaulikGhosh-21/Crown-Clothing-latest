import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { signOutStart, authSuccessfullyDone } from "../../store/user/user.action";

import { selectAuthDone, selectCurrentUser } from "../../store/user/user.selector";

import { SuccessPrompt } from "../../components/success-prompt/success-prompt.component";
// import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.jsx";
import { 
    LogoContainer, 
    NavigationContainer, 
    NavLink, 
    NavLinksContainer 
} from "./navigation.styles.jsx";

const Navigation = () => {

    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);

    console.log(currentUser);

    const isAuthDone = useSelector(selectAuthDone)

    if(isAuthDone){
        const timeoutRet = setTimeout(() => {
            dispatch(authSuccessfullyDone());
            clearTimeout(timeoutRet);
        }, 1000)
    }


    // currentUser === null && navigate("/auth");

    // console.log(currentUser);

    const signOutHandler = () => {
       dispatch(signOutStart());
    }

    return(
      <>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrwnLogo className="logo"/>
            </LogoContainer>
            <NavLinksContainer>
                <NavLink to="/shop">
                    SHOP
                </NavLink>
                {
                    currentUser ? (
                        <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to="/auth">
                            SIGN-IN
                        </NavLink>
                   )
                }
                <CartIcon />
            </NavLinksContainer>

            <CartDropdown />


            {
                (isAuthDone && !currentUser) && 
                    <SuccessPrompt>You have successfully logged out</SuccessPrompt>
            }

            {
                (isAuthDone && currentUser) &&
                    <SuccessPrompt>You have successfully signed in</SuccessPrompt>
            }

        </NavigationContainer>

        <Outlet />
      </>
    )
}

export default Navigation;