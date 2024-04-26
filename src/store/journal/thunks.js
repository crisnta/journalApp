import { collection, deleteDoc, doc, setDoc } from "firebase/firestore"
import { FirebaseDB } from "../../firebase/config"
import { addNewEmptyNote, creatingNewNote, deleteNoteById, setActiveNote, setImagesToActiveNote, setNotes, setSaving, updateNote } from "./journalSlice"
import { loadNotes } from "../../helpers/loadNotes"
import { fileUpload } from "../../helpers/fileUpload"

export const startNewNote = () => {
    return async (dispatch, getState) => {
        //TODO: dispatch de creando nueva nota
        dispatch(creatingNewNote())

        //uid
        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            imageUrls : [],
            date: new Date().getTime()
        }

        const newDoc = doc( collection( FirebaseDB , `${uid}/journal/notes`) )
        await setDoc( newDoc, newNote)
        
        //Asigna el id generada por firestore a la nueva nota
        newNote.id = newDoc.id

        //!Dispatches
        dispatch( addNewEmptyNote(newNote))
        dispatch( setActiveNote(newNote))

    }
}

export const startLoadingNotes = ( ) => {
    return async (dispatch, getState) =>{
        const { uid } = getState().auth
        //!Dispatch
        const notes = await loadNotes( uid)
        dispatch( setNotes(notes))
    }
}

export const startSaveNote = () => {
    return async ( dispatch, getState ) => {

        dispatch( setSaving())

        const { uid } = getState().auth

        const { active : note } = getState().journal

        const noteToFireStore = { ...note }
        delete noteToFireStore.id

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`)
        await setDoc( docRef, noteToFireStore, { merge: true })

        dispatch( updateNote( note ))
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async (dispatch) =>{
        dispatch( setSaving() )

        //Promise All
        const fileUploadPromises = []

        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ))
        }

        const imagesUrls = await Promise.all( fileUploadPromises )

        dispatch(setImagesToActiveNote( imagesUrls ))

    }
}

export const startDeleteingNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth
        const { active : activeNote } = getState().journal

        const docRef = doc(FirebaseDB, `/${ uid }/journal/notes/${ activeNote.id}`)
        await deleteDoc( docRef )

        dispatch( deleteNoteById( activeNote.id ))
    }
}