import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { FirebaseAuth } from './config'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        // const credentials = GoogleAuthProvider.credentialFromResult( result )
        // console.log(credentials)
        const { displayName, email, photoURL, uid } = result.user
        
        return {
            ok: true,

            displayName, email, photoURL, uid
        }

    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        return {
            ok: false,
            errorCode,
            errorMessage,
            credential
        }
    }
} 

export const registerUserWithEmailPassword = async ({ email, password, displayName}) => {
    
    try {
        
        const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = res.user
        
        //TODO: Actualizar el displayName en Firebase
        await updateProfile( FirebaseAuth.currentUser, {
            displayName
        })

        return {
            ok: true,
            uid, photoURL, email, displayName
        }


    } catch (error) {
        return { ok: false, errorMessage: error.message}
    }

}

export const loginWithEmailPassword = async ({ email, password }) => {
    //! signInWithEmailAndPassword
    try {
        const res = await signInWithEmailAndPassword( FirebaseAuth, email, password)
        const { uid,
            displayName,
            photoURL,
            } = res.user
        
            return {
                ok: true,
                uid, photoURL, email, displayName
            }


    } catch (error) {
        return {
            ok:false,
            errorMessage: error.message
        }
    }
    
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut()
}