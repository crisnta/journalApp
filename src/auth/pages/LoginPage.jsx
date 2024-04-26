import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth"

import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"

import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react"

import Alert from '@mui/material/Alert';


const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {
  const { status, errorMessage } = useSelector( (state) => state.auth)

  const dispatch = useDispatch()

  const { email, password, onInputChange} = useForm(formData)

  const onSubmit = ( event ) => {
     event.preventDefault()
     
     dispatch(startLoginWithEmailPassword({email, password}))
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
  }

  const isAuthenticating = useMemo( ( ) => status === 'checking', [status])

  return (
      <>
        <AuthLayout title="Login">

        <form 
            className='animate__animated animate__fadeIn animate__faster'
            onSubmit={onSubmit}>
          <Grid container>

            <Grid item sx={{ mt: 2}} xs={ 12 }>
              <TextField 
                label="Correo" 
                type="email"
                placeholder="Correo"
                fullWidth
                name="email"
                value={email}
                onChange={ onInputChange}
              />
            
            </Grid>

            <Grid item sx={{ mt: 2}} xs={ 12 }>
              <TextField 
                label="Contrasenhia" 
                type="password"
                placeholder="Contrasenhia"
                fullWidth
                name="password"
                value={password}
                onChange={ onInputChange}
              />
            
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid
                display={ !!errorMessage ? '': 'none'} 
                item
                xs={ 12 }>
                <Alert severity="error">{errorMessage}</Alert>  
              </Grid>


              <Grid item xs={ 12 } sm={ 6 }>
                <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth>
                  Login
                </Button>
              </Grid>

              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                disabled={isAuthenticating}
                variant="contained" 
                fullWidth
                onClick={onGoogleSignIn}>
                  <Google  />
                  <Typography sx={{ ml: 1}}> Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link 
                component={RouterLink}
                color='inherit'
                to='/auth/register'
                >
                
                Crear una cuenta

                </Link>
              
            </Grid>
          </Grid>
        </form>

        </AuthLayout>
        
      </>
  )
}
