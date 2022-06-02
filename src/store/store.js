import { createStore, compose, applyMiddleware } from "redux";

import { logger } from "redux-logger";
import { rootReducer } from "./root-reducer";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import thunk from "redux-thunk";
import { rootSaga } from "./root-saga";
import createSagaMiddleware from "redux-saga";

// const reduxMiddleware = (store) => (next) => (action) => {
//     console.log("type: ", action.type);
//     console.log("payload: ", action.payload);
//     console.log("current state: ", store.getState());
    
//     next(action);
    
//     console.log("updated state: ", store.getState());


// }


const sagaMiddleware = createSagaMiddleware();


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


const middleWares = [
    process.env.NODE_ENV === "development" && logger, sagaMiddleware
].filter(Boolean);
// const middleWares = [reduxMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);


sagaMiddleware.run(rootSaga);


export const persistor = persistStore(store);