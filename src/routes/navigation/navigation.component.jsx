import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { signOutStart } from "../../store/user/user.action";

import { selectCurrentUser } from "../../store/user/user.selector";
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
        </NavigationContainer>

        <Outlet />
      </>
    )
}

export default Navigation;