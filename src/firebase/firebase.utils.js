import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
apiKey: "AIzaSyCPq1_X2wt6hlXuoYZrcmpNoqlsjJgzTME",
authDomain: "shopping-cart-93bff.firebaseapp.com",
databaseURL: "https://shopping-cart-93bff.firebaseio.com",
projectId: "shopping-cart-93bff",
storageBucket: "shopping-cart-93bff.appspot.com",
messagingSenderId: "125680243647",
appId: "1:125680243647:web:59e92e68a20df99b51c70a",
measurementId: "G-D1DZ9E4NLW"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('errror creating user', error.message)
        }
    }
    return userRef;
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({prompt: 'select_account'})

export const signInWihGoogle = () => auth.signInWithPopup(provider)
export default firebase
