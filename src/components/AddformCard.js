import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';


import axios from 'axios';
import authHeader from "../services/auth-header";
// import { useNavigate } from 'react-router-dom';
import Slide from '@mui/material/Slide';

// ----------for the transition of the form------------
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export const AddForm = (props) => {

    const details1 = props.details1;

    console.log(details1);

    // const navigate = useNavigate();

  // -------------initial states for fields---------------------------
  const initialValues = { itemName: "", price: "", userId: "" };

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

    const userId = JSON.parse(localStorage.getItem('USERID'));

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
        // console.log(data)

        const item = {
            "itemId": details1.itemId,
            "itemName": data.get('itemName'),
            "price": data.get('price'),
            "seller": userId
        }

        console.log(data.get('itemId'));

        axios.put("http://localhost:5070/textile-valley/seller/update", item, { headers: authHeader() })
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
        // console.log(data)
        const id = data.get('userid');
        // const item = {
        //     "itemId": details1.itemId,
        //     "itemName": data.get('itemName'),
        //     "price": data.get('price'),
        //     "seller": userId
        // }

        // console.log(user);

        axios.delete(`http://localhost:5070/textile-valley/seller/delete/${details1.itemId}`,{ headers: authHeader() })
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
                        {details1.itemName}
                    </Typography>
                    <Typography>
                    Rs.{details1.price}
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

                        <TextField label="itemName" name="itemName" variant="outlined" onChange={handleChange} defaultValue={details1.itemName} />
                        <input name="id" type="hidden" defaultValue={details1.itemId} />
                        <TextField label="price" name="price" variant="outlined" onChange={handleChange} defaultValue={details1.price} />
                        <input name="seller" type="hidden" defaultValue={details1.seller} />

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
                        <Typography>Delete {details1.itemName} ?</Typography>
                        <input name="userid" type="hidden" defaultValue={details1.itemId} />

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