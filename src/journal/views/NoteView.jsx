import { DeleteOutline, SaveOutlined, SavedSearchOutlined, UploadFile, UploadFileOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef } from 'react'
import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeleteingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {
    const dispatch = useDispatch()

    const { active: note, messageSave, isSaving } = useSelector( (state) =>  state.journal)

    const { body, title, onInputChange, date, formState } = useForm( note )

    const dateString = useMemo(() => {
        const newDate = new Date ( date )
        return newDate.toUTCString()
    }, [date])

    useEffect(() => {
        dispatch( setActiveNote(formState))

    }, [formState])

    useEffect(() => {
      if ( messageSave.length > 0){
        Swal.fire('Nota actualizada', messageSave, 'success')
      }

    }, [messageSave])

    const fileInputRef = useRef()
    
    
    const onSaveNote = () => {
        dispatch( startSaveNote() )
    }

    const onFileInputChange = ({ target }) => {
        if ( target.files.length === 0) return

        console.log('subiendo archivos')
        dispatch( startUploadingFiles( target.files))
    }

    const onDelete = () => {
        dispatch( startDeleteingNote() )
    }


    return (
        <Grid container direction='row' alignItems='center' justifyContent='space-between' sx={{ mb: 1}}>
            <Grid item >
                <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
            </Grid>

            <Grid item>

                <input 
                    onChange={ onFileInputChange }
                    type='file' 
                    multiple
                    style={{ display: 'none'}}
                    ref={ fileInputRef }
                    />

                <IconButton 
                    color='primary'
                    disabled={isSaving}
                    onClick={ () => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    disabled={isSaving}
                    onClick={ onSaveNote }
                    color='primary'
                    sx={{ padding: 2}}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1}} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese un titulo'
                    label='Titulo'
                    sx={{ border: 'none', mb: 1}}
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />

                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='Que sucedio el dia dehoy?'
                    sx={{ border: 'none', mb: 1}}
                    minRows={ 5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
                
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color='error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            {/* Image gallery */}
            <ImageGallery images={ note.imageUrls } />
        </ Grid>
    )
}
