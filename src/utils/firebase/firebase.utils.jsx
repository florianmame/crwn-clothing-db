import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'; 
import {
    getFirestore, 
    doc, 
    getDoc, 
    setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChfGx44-R-c9xEzEfp2ln9KjCwzCPOq4Q",
    authDomain: "crwn-clothing-db-9a4be.firebaseapp.com",
    projectId: "crwn-clothing-db-9a4be",
    storageBucket: "crwn-clothing-db-9a4be.appspot.com",
    messagingSenderId: "512750858655",
    appId: "1:512750858655:web:5d33d6a1340c1279224daa"
  };

  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// googleProvider
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt:'select_account'
});

export const auth = getAuth();

//google SignIn Popup or Redirect 
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {displayName: 'Mike'} 
    ) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef)

    const userSnapshot = await getDoc (userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createAt = new Date();
        
        try {
            await setDoc (userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInformation,
            });
        } catch (error){
            console.log('error creating the user', error.message);
        }
    }
    
    return userDocRef;
}
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password ) return;
    return await createUserWithEmailAndPassword(auth,email , password)
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password ) return;
    return await signInWithEmailAndPassword(auth,email , password)
}