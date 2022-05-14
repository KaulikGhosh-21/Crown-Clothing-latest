import {initializeApp} from "firebase/app";

import{
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAoue6nAI17RNHFuxezofnzaZBm4D2AbzE",
    authDomain: "crwn-clothing-db-884e7.firebaseapp.com",
    projectId: "crwn-clothing-db-884e7",
    storageBucket: "crwn-clothing-db-884e7.appspot.com",
    messagingSenderId: "126258287179",
    appId: "1:126258287179:web:832b0ee2be57719b31b3ce"
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    console.log(userAuth)
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userDocSnapshot = await getDoc(userDocRef);

    console.log(userDocSnapshot.exists());

    if(!userDocSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }catch(err){
            console.log("Error created", err.message);
        }
    }

    return userDocRef;
}


export const createUserDataWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);
}
