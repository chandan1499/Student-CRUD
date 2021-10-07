import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, MenuItem, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import styles from './StudentsTable.module.css';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function createData(name, age, gender, city, id) {
    return { name, age, gender, city, id };
}

export default function StudentTable() {
    let serachQuery = useLocation().search;
    const queryPage = Number(new URLSearchParams(serachQuery).get('page') || 1);
    const [page, setPage] = React.useState(queryPage);
    const [totalPage, setTotalPage] = React.useState(1);
    const [rows, setRows] = React.useState([]);
    const history = useHistory();
    const [filterPayload, setFilterPayload] = useState({});
    const [isFiltred, setIsFiltred] = useState(false);

    const handleChangePage = (e, page) => {
        history.push(`/students/?page=${page}`);
        setPage(page);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFilterPayload({ ...filterPayload, [name]: value });
    }

    const handleDataFetch = () => {
        axios.get(`http://localhost:1234/students?page=${page}`)
            .then((res) => {
                let students = res.data.students;
                let newRows = [];
                students.map((student) => {
                    let newStu = createData(student.name, student.age, student.gender, student.city, student._id);
                    newRows.push(newStu);
                    return student;
                })

                setRows(newRows);

                setTotalPage(res.data.totalPages);
            })
            .catch(err => {
                console.log(err);
            })
    }

    React.useEffect(() => {
        if (isFiltred) {
            handleFilter();
            return;
        }
        handleDataFetch();
    }, [page])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:1234/students/${id}`)
            .then((res) => {
                handleDataFetch();
            }).catch((err) => {
                console.log(err);
            })
    }

    const handleFilter = () => {
        const payload = filterPayload;
        for (let key in payload) {
            if (payload[key] === "") {
                delete payload[key];
            }
        }

        axios.post(`http://localhost:1234/students/filter?page=${page}`, payload).then((res) => {
            setIsFiltred(true);
            let students = res.data.students;
            let newRows = [];
            students.map((student) => {
                let newStu = createData(student.name, student.age, student.gender, student.city, student._id);
                newRows.push(newStu);
                return student;
            })

            setRows(newRows);

            setTotalPage(res.data.totalPages);
        })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <div className={styles.filterContainer}>
                <div>
                    <TextField
                        className={styles.inputBox}
                        onChange={(e) => { handleChange(e) }}
                        id="gender"
                        label="Gender"
                        name="gender"
                        type="text"
                        select
                        size="small"
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
                    <TextField
                        name="age"
                        label="Age"
                        type="number"
                        id="age"
                        size="small"
                        className={styles.inputBox}
                        onChange={(e) => { handleChange(e) }}
                    />
                    <TextField
                        name="city"
                        label="City"
                        type="text"
                        id="city"
                        size="small"
                        className={styles.inputBox}
                        onChange={(e) => { handleChange(e) }}
                    />

                    <TextField
                        className={styles.inputBox}
                        onChange={(e) => { handleChange(e) }}
                        id="sort"
                        label="Sort by age"
                        name="sort"
                        select
                        size="small"
                    >
                        <MenuItem value={1}>
                            Low to High
                        </MenuItem>
                        <MenuItem value={-1}>
                            High to Low
                        </MenuItem>
                    </TextField>

                    <Button variant="outlined" className={styles.filterBtn} onClick={handleFilter}>Apply Filter</Button>
                </div>
            </div>
            <hr />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Student ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Age</TableCell>
                            <TableCell align="center">Gender</TableCell>
                            <TableCell align="center">City</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.age}</TableCell>
                                <TableCell align="center">{row.gender}</TableCell>
                                <TableCell align="center">{row.city}</TableCell>
                                <TableCell align="center"><Button variant="outlined" onClick={() => { history.push(`/students/edit/${row.id}`) }}>Edit</Button></TableCell>
                                <TableCell align="center"><Button variant="outlined" onClick={() => { handleDelete(row.id) }}>Delete</Button></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                style={{ marginTop: "50px", marginBottom: "50px" }}
                count={totalPage} color="primary"
                page={queryPage}
                onChange={handleChangePage}
            />
        </>
    );
}
