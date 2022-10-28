import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';


import axios from 'axios';
import authHeader from "../services/auth-header";
import { useNavigate } from 'react-router-dom';
import Slide from '@mui/material/Slide';

// ----------for the transition of the form------------
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export const AddForm = (props) => {

    const details1 = props.details1;

    const navigate = useNavigate();

    const [details, setDetails] = useState([]);
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

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // ----------------initial values

    const [open2, setOpen2] = React.useState(false);

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    // const { location, address, telephone} = restaurant;
    // -----------------updating the user-----------------
    const updateUser1 = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const restaurantAbout = {
            about: data.get('about_description')
        }
        // console.log(data)

        const user = {
            "id": data.get('userid'),
            "userName": data.get('userName'),
            "password": data.get('password'),
            "accountState": data.get('accountState')
        }

        console.log(user);

        axios.put("http://localhost:8080/Test1/update", user, { headers: authHeader() })
            .then(data => {
                // console.log("Entry access sucessfull")
                window.location.reload(false);
                setOpen(false);

            })
            .catch(error => {
                // console.log(restaurantAbout)
                // console.log("There is an error")

            })
    }

     // -----------------deleting the  user-----------------
     const deleteUser1 = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const restaurantAbout = {
            about: data.get('about_description')
        }
        // console.log(data)
        const id = data.get('userid');
        const user = {
            "id": data.get('userid'),
            "userName": data.get('userName'),
            "password": data.get('password'),
            "accountState": data.get('accountState')
        }

        console.log(user);

        axios.delete(`http://localhost:8080/Test1/delete/${id}`,{ headers: authHeader() })
            .then(data => {
                // console.log("Entry access sucessfull")
                window.location.reload(false);
                setOpen(false);

            })
            .catch(error => {
                // console.log(restaurantAbout)
                // console.log("There is an error")

            })
    }

    return (

        <Box sx={{
            marginTop: 1
        }} >

            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {details1.userName}
                    </Typography>
                    <Typography>
                        This is a media card. You can use this section to describe the
                        content.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleClickOpen2}>Updae</Button>
                    <Button size="small" onClick={handleClickOpen}>Delete</Button>
                </CardActions>
            </Card>

            {/* -----------------------------update form-------------------------------- */}
            <Dialog
                open={open2}

                keepMounted
                TransitionComponent={Transition}

            >
                <DialogTitle>{"Update username"}</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={updateUser1}
                        noValidate
                        autoComplete="off">

                        <TextField label="userName" name="userName" variant="outlined" onChange={handleChange} defaultValue={details1.userName} />
                        <input name="password" type="hidden" defaultValue={details1.password} />
                        <TextField label="accountState" name="accountState" variant="outlined" onChange={handleChange} defaultValue={details1.accountState} />
                        <input name="userid" type="hidden" defaultValue={details1.id} />

                        <Box>
                            <Button type='submit'>Update</Button>
                            <Button onClick={handleClose2}> Cancel </Button>
                        </Box>

                    </Box>
                </DialogContent>
            </Dialog>

            {/* --------------------------delete form-------------------------------------------- */}
            <Dialog
                open={open}

                keepMounted
                TransitionComponent={Transition}

            >
                <DialogTitle>{"Delete user"}</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={deleteUser1}
                        noValidate
                        autoComplete="off">
                        <Typography>Delete {details1.userName} ?</Typography>
                        <input name="userid" type="hidden" defaultValue={details1.id} />

                        <Box>
                            <Button type='submit'>Delete</Button>
                            <Button onClick={handleClose}> Cancel </Button>
                        </Box>

                    </Box>
                </DialogContent>
            </Dialog>

        </Box>

    )
};