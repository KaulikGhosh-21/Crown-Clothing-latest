import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

import App from './App';


import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';


// import { UserProvider } from './contexts/user.context';
// import { CategoriesProvider } from './contexts/category.context';
// import { CartProvider } from './contexts/cart.context';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          {/* <UserProvider> */}
            {/* <CategoriesProvider> */}
              {/* <CartProvider> */}
                <App />
              {/* </CartProvider> */}
            {/* </CategoriesProvider> */}
          {/* </UserProvider> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


