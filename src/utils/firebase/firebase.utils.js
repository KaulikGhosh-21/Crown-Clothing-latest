import {initializeApp} from "firebase/app";

// import { firestore } from "./firebase";

import{
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import {
    updateDoc,
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    getDocs,
    query
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

// provider - gives us the auth token from google

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

// getAuth() - keeps track of all of our authentication work
// creating auth instance

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

// creating firestore database instance
export const db = getFirestore();



export const addCollectionAndDocuments = async (collectionKey, objects) => {
    const collectionRef = collection(db, collectionKey);

    const batch = writeBatch(db);

    objects.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());

        batch.set(docRef, object);
    });

    await batch.commit();
    // console.log('done');
}

// export const addCollectionAndDocuments = async (objectsToAdd) => {
//     objectsToAdd.forEach(async object => {
//         const docRef = doc(db, 'categories', object.title.toLowerCase());
//         console.log(docRef)

//         const docSnapshot = await getDoc(docRef);
//         console.log(docSnapshot)

//         if(!docSnapshot.exists()){
//             try{
//                 await setDoc(docRef, object);
//             }catch(err){
//                 console.log("Error:", err.message);
//             }
//         }

//     })
// }

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    // console.log(collectionRef)
    const q = query(collectionRef);
    // console.log(q);
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);
    // const categoryMap = querySnapshot.docs.reduce((acc, ind) => {
    //     console.log(acc);
    //     const {title, items} = ind.data()
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {});
    // let categoryMap = {};
    // console.log(querySnapshot.docs.map(ind => ind.data()));

    return querySnapshot.docs.map(indData => indData.data());

    // querySnapshot.docs.map(ind => {
    //     const {title, items} = ind.data();
    //     categoryMap[title.toLowerCase()] = items;
    // })
    // console.log(categoryMap);
    // return categoryMap
    // const data = categoryMap.map(ind => ind.data());
    // console.log(data);
}

export const updateUserDoc = async (currentUser, data) => {
    const docRef = doc(db, 'users', currentUser.id);
    await updateDoc(docRef, data);
    const docSnapshot = await getDoc(docRef); 
    console.log(docSnapshot.data());
}

export const createUserDocumentFromAuth = async (userAuth) => {
    console.log(userAuth)
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userDocSnapshot = await getDoc(userDocRef);

    console.log(userDocSnapshot.exists());

    if(!userDocSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        const itemsInCart = [];

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                itemsInCart
            })
        }catch(err){
            console.log("Error created", err.message);
        }
    }

    const dataBack = await getDoc(userDocRef);

    return dataBack;
}


export const createUserDataWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);


export const getCurrentUser = () => {
    return new Promise((resolve,reject) => {
        const unsubscribe = onAuthStateChanged(
        auth,
        (userAuth) => {
            unsubscribe();
            resolve(userAuth);
        },
        reject
    )
    })
}