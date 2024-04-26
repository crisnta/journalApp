import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: ' journal',
    initialState: {
        isSaving: false,
        messageSave: '',
        notes: [],
        active: null,
    },
    reducers: {
        creatingNewNote: (state) => {
            state.isSaving = true
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload)
            state.isSaving = false
            
        },
        setActiveNote: (state, action) => {
            state.active = action.payload
            state.messageSave = ''
            
        },
        setNotes: (state, action) => {
            state.notes = action.payload
            
        },
        setSaving: (state) => {
            state.isSaving = true
            // TODO: mensaje de error...
            state.messageSave = ''
        },
        updateNote: (state, action) => {
            // TODO: Actualizar referencia local de la Nota...
            state.isSaving = false
            state.notes = state.notes.map( note => {

                if ( note.id === action.payload.id) {
                    return action.payload
                }

                return note 
            })
            //TODO: Mostrar mensaje de actualizacion
            state.messageSave = `${ action.payload.title }, actualizada correctamente`

            
        },
        setImagesToActiveNote: (state, action ) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
            state.isSaving = false
        },
        clearNotesLogout: (state) => {
            state.isSaving = false
            state.messageSave = ''
            state.notes = []
            state.active = null
        },

        deleteNoteById: (state, action) => {
            state.active = null
            state.notes = state.notes.filter( note => note.id != action.payload)
            state.messageSave = 'Nota eliminada correctamente'
            
        },
    }
});
export const { addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    creatingNewNote,
    setImagesToActiveNote,
    clearNotesLogout
 } = journalSlice.actions;