import { async } from '@firebase/util';
import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAJ-tHWp4D75lI_BSVvfb5F0YeExfC7SvM",
    authDomain: "crwn-clothing-db1-5673b.firebaseapp.com",
    projectId: "crwn-clothing-db1-5673b",
    storageBucket: "crwn-clothing-db1-5673b.appspot.com",
    messagingSenderId: "487071731389",
    appId: "1:487071731389:web:1ae7c59bc7a7a6e7d671d4",
    measurementId: "G-T8T4D9X9RC"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider);
  export const db = getFirestore();
  
  export const createUserDocumentFromAuth = async (userAuth,
    additionalInformation = {}) => {

      const userDocRef = doc(db,'users',userAuth.uid);
      console.log(userDocRef);

      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot);
      console.log(userSnapshot.exists());
   
      if (!userSnapshot.exists()) {
          const {displayName,email} = userAuth;
          const createdAt = new Date();

          try {
              await setDoc(userDocRef, {
                  displayName,
                  email,
                  createdAt,
                  ...additionalInformation,
              });
          } catch (error) {
              console.log('error creating the user',error.message);
          }
      }
      return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email,password) => {

        if (!email || !password) return;

         return await createUserWithEmailAndPassword(auth,email,password);

}