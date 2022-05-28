import { takeLatest, call, all, put } from "redux-saga/effects";


import { 
    createUserDataWithEmailAndPassword,
    createUserDocumentFromAuth, 
    getCurrentUser, 
    signInUserWithEmailAndPassword, 
    signInWithGooglePopup,
    signOutUser
} from "../../utils/firebase/firebase.utils";

import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess } from "./user.action";

import { USER_ACTION_TYPES } from "./user.types";


// To check user session

export function* getSnapshotfromUserAuth(userAuth){
    try{
        // console.log(userAuth)
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth);
        // console.log(userSnapshot);
        // console.log(userSnapshot.data());
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
    }catch(error){
        yield put(signInFailed());
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield call(getCurrentUser);
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


export function* userSaga(){
    yield all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignOutStart)
    ])
}