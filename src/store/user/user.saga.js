import { takeLatest, call, all, put } from "redux-saga/effects";

import { 
    addItemsToCart, 
    decrementItemsQuantity, 
    removeItemFromCart
 } from "../../utils/user-cart/user-cart";

 import { decrementItemQuantityFromCartSuccess, decrementItemQuantityFromCartFailed } from "./user.action.js"

import { 
    createUserDataWithEmailAndPassword,
    createUserDocumentFromAuth, 
    getCurrentUser, 
    signInUserWithEmailAndPassword, 
    signInWithGooglePopup,
    signOutUser,
    updateUserDoc
} from "../../utils/firebase/firebase.utils";

import { 
    removeItemFromCartSuccess,
    removeItemFromCartFailed,
    addItemsToCartFailed, 
    addItemsToCartSuccess, 
    signInFailed, 
    signInSuccess, 
    signOutFailed, 
    signOutSuccess, 
    signUpFailed, 
    signUpSuccess 
} from "./user.action";

import { USER_ACTION_TYPES } from "./user.types";
import { useSelector } from "react-redux";
import { selectItemsInCart } from "./user.selector";


// To check user session

export function* getSnapshotfromUserAuth(userAuth){
    try{
        console.log(userAuth)
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth);
        console.log(userSnapshot);
        console.log(userSnapshot.data());
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
    }catch(error){
        yield put(signInFailed());
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield call(getCurrentUser);
        console.log(userAuth);
        if(!userAuth) return;

        yield call(getSnapshotfromUserAuth, userAuth);

    }catch(error){
        yield put(signInFailed());
    }
}

export function* onCheckUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}



// To handle google sign-in

export function* googleSignIn(){
    try{
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotfromUserAuth, user);
    }catch(error){
        yield put(signInFailed(error));
    }
}


export function* onGoogleSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, googleSignIn)
} 



// To handle email sign-in

export function* emailSignIn({ payload : { email, password } }){
    try{
        const { user } = yield call(signInUserWithEmailAndPassword, email, password);
        console.log(user);
        yield call(getSnapshotfromUserAuth, user);
    }catch(err){
        yield put(signInFailed(err));
    }
}

export function* onEmailSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailSignIn)
}



// To handle sign-up

export function* signUp({payload: { email, password, displayName, ...additionalData }}){
    try{
        const { user } = yield call(createUserDataWithEmailAndPassword, email, password);
        yield call(createUserDocumentFromAuth, { ...user, displayName });
        yield put(signUpSuccess(user));
    }catch(err){
        yield put(signUpFailed(err));
    }
}

export function* onSignUpStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}



// To handle sign-Out

export function* signOut(){
    try{
        yield call(signOutUser);
        yield put(signOutSuccess());
    }catch(err){
        yield put(signOutFailed(err))
    }
}

export function* onSignOutStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}


// To handle adding items to cart

export function* addItemsToCartOfUser({ 
        payload: { currentUser, cartItemsOfUser, product } 
    }){
        console.log("Add to items was called")
    try{
        console.log(cartItemsOfUser, product);
        const userUpdatedCartItems = addItemsToCart(cartItemsOfUser, product);
        yield call(updateUserDoc, currentUser, {itemsInCart: userUpdatedCartItems})
        yield put(addItemsToCartSuccess(userUpdatedCartItems));
    } catch(err) {
        yield put(addItemsToCartFailed(err));
    }
}

export function* onAddItemsToCartStart(){
    yield takeLatest(USER_ACTION_TYPES.ADD_ITEMS_TO_CART_START, addItemsToCartOfUser)
}




export function* decrementItemQuantity({
        payload: { currentUser, cartItemsOfUser, product } 
    }){
        try{
            const userUpdatedCartItems = decrementItemsQuantity(cartItemsOfUser, product);
            yield call(updateUserDoc, currentUser, {itemsInCart: userUpdatedCartItems})
            product.quantity === 1 ? 
            yield put(removeItemFromCartSuccess(userUpdatedCartItems)) : 
            yield put(decrementItemQuantityFromCartSuccess(userUpdatedCartItems));
        } catch(err){
            yield put(decrementItemQuantityFromCartFailed(err))
        }
    }

export function* onDecrementItemQuantityFromCartStart(){
    yield takeLatest(USER_ACTION_TYPES.DECREMENT_ITEM_QUANTITY_FROM_CART_START, 
        decrementItemQuantity)
}

export function* removeItemFromCartFunc({
    payload: { currentUser, cartItemsOfUser, product } 
}){
    console.log("Hello");
    try{
        const userUpdatedCartItems = removeItemFromCart(cartItemsOfUser, product);
        yield call(updateUserDoc, currentUser, {itemsInCart: userUpdatedCartItems})
        yield put(removeItemFromCartSuccess(userUpdatedCartItems));
    } catch(err){
        yield put(removeItemFromCartFailed(err))
    }
}

export function* onRemoveItemFromCartStart(){
yield takeLatest(USER_ACTION_TYPES.REMOVE_ITEM_FROM_CART_START, 
    removeItemFromCartFunc)
}


export function* userSaga(){
    yield all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignOutStart),
        call(onAddItemsToCartStart),
        call(onDecrementItemQuantityFromCartStart),
        call(onRemoveItemFromCartStart)
    ])
}