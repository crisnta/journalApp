import { collection, getDoc, getDocs } from "firebase/firestore"
import { FirebaseDB } from "../firebase/config"

export const loadNotes = async ( uid = '') => {
    if ( !uid )  throw new Error('El UID del usuario no existe')

    const collRef = collection(FirebaseDB, `${ uid }/journal/notes`)
    const docSnap = await getDocs(collRef)
    
    const notes = []
    docSnap.forEach( doc => {
        notes.push({ id: doc.id, ...doc.data() })
    })
    return notes
}