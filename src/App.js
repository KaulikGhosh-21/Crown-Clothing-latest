import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

// import { onAuthStateChangedListener, createUserDocumentFromAuth, getCurrentUser } 
//   from "./utils/firebase/firebase.utils";

import { checkUserSession } from "./store/user/user.action";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";

import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { selectCurrentUser } from "./store/user/user.selector";
import { RequireAuth } from "./components/require-auth/require-auth.component";


const App = () => {

  const location = useLocation();

  console.log(location);

  const redirectToPath = location.state ? location.state.path : location.pathname;

  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);

  console.log(currentUser)

  const navigate = useNavigate();


  useEffect(() => {
    if(currentUser){
        console.log("Use effect inside navigation called")
        navigate(redirectToPath, { replace: true });
    }else{
        console.log("Use effect else inside navigation called")
        navigate("/auth");
    }
  }, [currentUser])


  useEffect(() => {
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //     if(user) createUserDocumentFromAuth(user);
    //     dispatch(setCurrentUser(user));
    // })

    // return unsubscribe;
    // getCurrentUser().then((user) => console.log(user));

    dispatch(checkUserSession());


  }, [])


  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={
          <RequireAuth>
            <Shop />
          </RequireAuth>
          } 
        />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
};

export default App;
