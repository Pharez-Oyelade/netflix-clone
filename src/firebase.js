
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBriiJZ6Zx2PIKEkIGIoCGz9i3_4NsCoN0",
  authDomain: "netflix-clone-e19af.firebaseapp.com",
  projectId: "netflix-clone-e19af",
  storageBucket: "netflix-clone-e19af.appspot.com",
  messagingSenderId: "152096355541",
  appId: "1:152096355541:web:aa308f33353eeb28adde5c",
  measurementId: "G-8V3P7LLBS5"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};