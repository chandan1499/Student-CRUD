import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MenuItem } from '@mui/material';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';


const theme = createTheme();

export default function NewStudent() {
    const history = useHistory();
    const { id } = useParams();
    const [payload, setPayload] = React.useState({
        name: "",
        age: "",
        gender: "",
        city: ""
    });

    useEffect(() => {
        if (id === undefined) {
            setPayload({
                name: "",
                age: "",
                gender: "",
                city: ""
            })
            return;
        }

        axios.get(`http://localhost:1234/students/${id}`)
            .then((res) => {
                setPayload({
                    ...payload,
                    name: res.data.student.name,
                    age: res.data.student.age,
                    gender: res.data.student.gender,
                    city: res.data.student.city
                });
            }).then(() => {
                console.log(payload);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [id])

    const handlePostStudent = () => {
        axios.post("http://localhost:1234/students", payload)
            .then((res) => {
                history.push('/students/');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handlePatchStudent = () => {
        axios.patch(`http://localhost:1234/students/${id}`, payload)
            .then((res) => {
                history.push('/students/');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayload({ ...payload, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id === undefined) {
            handlePostStudent();
        }
        else {
            handlePatchStudent();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        {(id) ? "Edit Current Student" : "CREATE NEW STUDENT"}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(e) => { handleChange(e) }}
                                    name="name"
                                    required
                                    fullWidth
                                    id="Name"
                                    label="Name"
                                    type="text"
                                    value={payload.name}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(e) => { handleChange(e) }}
                                    name="age"
                                    required
                                    fullWidth
                                    id="age"
                                    label="Age"
                                    value={payload.age}
                                    type='number'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(e) => { handleChange(e) }}
                                    required
                                    fullWidth
                                    id="gender"
                                    label="Gender"
                                    name="gender"
                                    type="text"
                                    value={payload.gender}
                                    select
                                >
                                    <MenuItem value={"Male"}>
                                        Male
                                    </MenuItem>
                                    <MenuItem value={"Female"}>
                                        Female
                                    </MenuItem>
                                    <MenuItem value={"Other"}>
                                        Other
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(e) => { handleChange(e) }}
                                    required
                                    fullWidth
                                    name="city"
                                    label="City"
                                    type="text"
                                    value={payload.city}
                                    id="city"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {(id) ? "Update" : "Create"}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}