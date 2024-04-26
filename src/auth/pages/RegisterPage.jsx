import { useMemo, useState } from "react"

import { useDispatch, useSelector } from "react-redux";

import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import Alert from '@mui/material/Alert';

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value)=> value.includes('@'), 'El correo debe tener un @'],
  password: [ (value) => value.length >= 6, 'El password debe tener mas de 6 caracteres'],
  displayName:  [ (value)=> value.length >= 1, 'El nombre es obligatorio']
}


export const RegisterPage = () => {

  const { status, errorMessage } = useSelector( (state) => state.auth)
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status])
  
  const dispatch = useDispatch()

  const [formSubmitted, setFormSubmitted] = useState(false)

  const { formState, displayName, email, password, onInputChange,
          isFormValid, displayNameValid, emailValid, passwordValid
        } = useForm(formData, formValidations)

  const onSubmit = ( event ) => {
    event.preventDefault()
    setFormSubmitted(true)

    if ( !isFormValid ) return

    dispatch(startCreatingUserWithEmailPassword(formState))

  }


  return (
      <>
        <AuthLayout title="Register">
        <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'
>
          <Grid container>

            <Grid item sx={{ mt: 2}} xs={ 12 }>
              <TextField 
                label="Nombre Completo" 
                type="text"
                placeholder="Tu nombre"
                fullWidth
                name="displayName"
                value={ displayName}
                onChange={ onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid}
              />
            
            </Grid>

            <Grid item sx={{ mt: 2}} xs={ 12 }>
              <TextField 
                label="Correo" 
                type="email"
                placeholder="correo@correo.cl"
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}
              />
            
            </Grid>

            <Grid item sx={{ mt: 2}} xs={ 12 }>
              <TextField 
                label="Contrasenhia" 
                type="password"
                placeholder="Contrasenhia"
                fullWidth
                name="password"
                value={ password}
                onChange={ onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
              />
            
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid
                display={ !!errorMessage ? '': 'none'} 
                item
                xs={ 12 }>
                <Alert severity="error">{errorMessage}</Alert>  
              </Grid>

              <Grid item xs={ 12 }>
                <Button
                  disabled={isCheckingAuthentication}
                  type="submit"
                  variant="contained" 
                  fullWidth>
                  Crear Cuenta
                </Button>
              </Grid>

            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
              <Link 
                component={RouterLink}
                color='inherit'
                to='/auth/login'
                >
                
                Ingresar

                </Link>
              
            </Grid>
          </Grid>
        </form>

        </AuthLayout>
        
      </>
  )
}
