import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import authHeader from "../services/auth-header";
import { AddForm } from '../components/AddformCard';
import { Dialog, DialogContent, DialogTitle, Slide, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
      Textile Valley
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

// ----------for the transition of the form------------
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// ----------------------dashboard paege view------------------------------
export default function Album() {

  const [details, setDetails] = useState([]);

  // ----------------for the form---------------------------------------
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // ------------------------------------------------------------------

  // -------------initial states for fields---------------------------
  const initialValues = { userName: "", password: "", accountState: "" };

  // ----------create state name form values--------
  const [formValues, setFormValues] = React.useState(initialValues);

  // -------function to handle changes in the input fields and set it to formvalues----------
  const handleChange = (e) => {

    // destructuring inputfield
    const { name, value } = e.target;
    // get the relavant name as key and assign value to it
    setFormValues({ ...formValues, [name]: value });

  }

  // ------------------------call user details-------------------
  const callData = () => {
    axios.get("http://localhost:8080/Test1/users", { headers: authHeader() })
      .then(data => {
        console.log(data)
        setDetails(data.data)

      }).catch(err => {
        console.log(err)
      });
  }

  useEffect(() => {

    callData();

    // console.log("hello")

  }, []);

  const navigate = useNavigate();
  // ---------------logout-------------------------------
  const logout = () => {

    localStorage.removeItem("TOKEN");
    navigate("/");

  };

  // -----------------------adding new user--------------------------
  const addUser1 = (event) => {

    event.preventDefault();

    const user = {
      "userName": formValues.userName,
      "password": formValues.password,
      "accountState": formValues.accountState
    }

    console.log(user);

    axios.post("http://localhost:8080/Test1/Register/Signupuser", user, { headers: authHeader() })
      .then(data => {
        // console.log("Entry access sucessfull")
        callData();
        setOpen(false);

      })
      .catch(error => {
        // console.log(restaurantAbout)
        // console.log("There is an error")

      })
  }




  console.log(details);
  const data = details;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* ----------------------dashboard nav bar------------------- */}
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      {/* ------------------------------------------------------------------- */}

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Textile Valley Seller Dashboard
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="outlined" onClick={handleClickOpen}>Add Users</Button>
              <Button variant="outlined" onClick={logout}>Logout</Button>
            </Stack>
          </Container>

          {/* ---------------------------form1------------------------- */}
          <Dialog
            open={open}

            keepMounted
            TransitionComponent={Transition}

          >
            <DialogTitle>{"Add a user"}</DialogTitle>
            <DialogContent>
              <Box component="form"
                noValidate
                autoComplete="off">

                <TextField label="userName" name="userName" variant="outlined" onChange={handleChange} />
                <TextField label="password" name="password" variant="outlined" onChange={handleChange} />
                <TextField label="accountState" name="accountState" variant="outlined" onChange={handleChange} />

                <Box>
                  <Button onClick={addUser1}>Add new</Button>
                  <Button onClick={handleClose}> Cancel </Button>
                </Box>

              </Box>
            </DialogContent>
          </Dialog>
          {/* --------------------------end of the form1----------------------------- */}
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map((details1) => (
              console.log(details1),
              

              <Grid item key={details1} xs={12} sm={6} md={4}>

                <AddForm details1={details1}/>

              </Grid>

            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}