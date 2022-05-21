import { createContext, useState, useEffect, useReducer } from "react";
import { 
    createUserDocumentFromAuth, 
    onAuthStateChangedListener 
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}


const userReducer = (state, action) => {
    console.log("dispatched");
    console.log(action);
    switch(action.type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: action.payload
            }
        default:
            throw new Error(`Unhandled type ${action.type} error`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({children}) => {


    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const {currentUser} = state;
    console.log(state);

    console.log(currentUser);

    const setCurrentUser = (user) => dispatch({
        type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) createUserDocumentFromAuth(user);
            setCurrentUser(user);
        })

        return unsubscribe;
    }, [])

    // const [currentUser, setCurrentUser] = useState(null);

    const value = {currentUser, setCurrentUser};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}