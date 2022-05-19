import { useContext } from "react";
import { Outlet } from "react-router-dom";

import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.jsx";
import { 
    LogoContainer, 
    NavigationContainer, 
    NavLink, 
    NavLinksContainer 
} from "./navigation.styles.jsx";

const Navigation = () => {

    const {currentUser} = useContext(UserContext);

    const signOutHandler = async () => {
        await signOutUser();
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