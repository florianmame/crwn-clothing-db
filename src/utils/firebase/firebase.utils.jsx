import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
            });
        } catch (error){
            console.log('error creating the user', error.message);
        }
    }
    
    return userDocRef;
}