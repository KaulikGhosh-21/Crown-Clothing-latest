import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";


import { checkUserSession } from "./store/user/user.action";

import { selectCurrentUser } from "./store/user/user.selector";
import { RequireAuth } from "./components/require-auth/require-auth.component";
import Spinner from "./components/spinner/spinner.component";

const Home = lazy(() => import("./routes/home/home.component"));
const Navigation = lazy(() => import("./routes/navigation/navigation.component"));

const Authentication = lazy(() => 
import("./routes/authentication/authentication.component"));

const Shop = lazy(() => import("./routes/shop/shop.component"));

const Checkout = lazy(() => import("./routes/checkout/checkout.component"));





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

    dispatch(checkUserSession());

  }, [])


  return (
    <Suspense fallback={<Spinner />}>
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
    </Suspense>
  )
};

export default App;
